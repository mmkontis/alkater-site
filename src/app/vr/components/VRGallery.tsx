"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

// ─── WebGL 360 viewer ────────────────────────────────────────────────────────

const VS = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){
  v_uv = a_pos;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FS = `
precision highp float;
uniform sampler2D u_tex;
uniform float u_yaw;
uniform float u_pitch;
uniform float u_fov;
uniform float u_aspect;
varying vec2 v_uv;
const float PI = 3.14159265358979;

void main(){
  float fovRad = u_fov * PI / 180.0;
  float tanHalf = tan(fovRad / 2.0);

  // Ray in camera space — correct for canvas aspect ratio
  vec3 rd = normalize(vec3(v_uv.x * tanHalf * u_aspect, v_uv.y * tanHalf, -1.0));

  // Rotate around Y (yaw)
  float cy = cos(u_yaw), sy = sin(u_yaw);
  rd = vec3(cy*rd.x + sy*rd.z, rd.y, -sy*rd.x + cy*rd.z);

  // Rotate around X (pitch)
  float cp = cos(u_pitch), sp = sin(u_pitch);
  rd = vec3(rd.x, cp*rd.y - sp*rd.z, sp*rd.y + cp*rd.z);

  float lon = atan(rd.x, -rd.z);
  float lat = asin(clamp(rd.y, -1.0, 1.0));

  float u = (lon / (2.0*PI)) + 0.5;
  float v = 1.0 - ((lat / PI) + 0.5);

  gl_FragColor = texture2D(u_tex, vec2(u, v));
}`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

function buildProgram(gl: WebGLRenderingContext) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  return prog;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function VRGallery({ images }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const texRef = useRef<WebGLTexture | null>(null);
  const rafRef = useRef<number>(0);

  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const fovRef = useRef(90);
  const dragRef = useRef<{ active: boolean; x: number; y: number }>({ active: false, x: 0, y: 0 });
  const autoRef = useRef(true);

  // ── init GL ──
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl", { antialias: true });
    if (!gl) return;
    glRef.current = gl;

    const prog = buildProgram(gl);
    progRef.current = prog;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // load texture
    const tex = gl.createTexture()!;
    texRef.current = tex;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,255]));

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = active;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.generateMipmap(gl.TEXTURE_2D);
      const ext = gl.getExtension("EXT_texture_filter_anisotropic") ||
                  gl.getExtension("MOZ_EXT_texture_filter_anisotropic") ||
                  gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
      if (ext) {
        const max = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        gl.texParameterf(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
      }
    };

    yawRef.current = 0;
    pitchRef.current = 0;
    fovRef.current = 90;
    autoRef.current = true;

    // render loop
    const render = () => {
      const w = canvas.clientWidth * window.devicePixelRatio;
      const h = canvas.clientHeight * window.devicePixelRatio;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      if (autoRef.current) yawRef.current += 0.002;

      gl.uniform1f(gl.getUniformLocation(prog, "u_yaw"), yawRef.current);
      gl.uniform1f(gl.getUniformLocation(prog, "u_pitch"), pitchRef.current);
      gl.uniform1f(gl.getUniformLocation(prog, "u_fov"), fovRef.current);
      gl.uniform1f(gl.getUniformLocation(prog, "u_aspect"), canvas.width / canvas.height);
      gl.uniform1i(gl.getUniformLocation(prog, "u_tex"), 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      gl.deleteTexture(tex);
      gl.deleteProgram(prog);
    };
  }, [active]);

  // ── pointer / touch drag ──
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragRef.current = { active: true, x: e.clientX, y: e.clientY };
    autoRef.current = false;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    yawRef.current -= dx * 0.005;
    pitchRef.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitchRef.current + dy * 0.005));
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current.active = false;
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    fovRef.current = Math.max(30, Math.min(120, fovRef.current + e.deltaY * 0.05));
  }, []);

  const close = useCallback(() => setActive(null), []);

  // ── label helper ──
  function labelFor(src: string) {
    const name = src.split("/").pop() ?? "";
    const m = name.match(/project-(\d+)/i);
    if (m) return `Έργο ${m[1]}`;
    return `Πανοραμική`;
  }

  return (
    <div className="min-h-screen bg-[#111] text-[#F5F3EE]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap');`}</style>

      {/* Header */}
      <header className="px-6 py-8 border-b border-white/10 flex items-center gap-4">
        <a href="/" className="text-[#E63B2E] text-sm font-bold tracking-widest hover:opacity-70 transition-opacity">← ΠΙΣΩ</a>
        <span className="text-white/20">|</span>
        <h1 className="text-xl font-bold tracking-tight">
          ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span> 360° ΕΡΓΑ
        </h1>
      </header>

      {/* Grid */}
      <main className="px-4 py-10 max-w-7xl mx-auto">
        <p className="text-white/40 text-sm mb-8 tracking-widest uppercase">
          {images.length} πανοραμικές — κλικ για προβολή
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((src) => (
            <button
              key={src}
              onClick={() => setActive(src)}
              className="group relative aspect-video overflow-hidden rounded-sm border border-white/10 hover:border-[#E63B2E] transition-all duration-200 focus:outline-none focus:border-[#E63B2E]"
            >
              <Image
                src={src}
                alt={labelFor(src)}
                fill
                sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* 360 badge */}
              <span className="absolute top-2 left-2 bg-black/60 text-[#E63B2E] text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest">
                360°
              </span>
              {/* label */}
              <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-2 text-[11px] font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                {labelFor(src)}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Modal 360 viewer */}
      {active && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black">
          {/* Controls bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/80 backdrop-blur-sm border-b border-white/10 flex-shrink-0">
            <span className="text-sm font-bold tracking-wider text-white/80">
              <span className="text-[#E63B2E]">360°</span> {labelFor(active)}
            </span>
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-white/30 text-xs">Σύρε για περιστροφή · Scroll για ζουμ</span>
              <button
                onClick={close}
                className="text-white/60 hover:text-white text-2xl leading-none transition-colors px-2"
                aria-label="Κλείσιμο"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="flex-1 w-full cursor-grab active:cursor-grabbing touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
          />

          {/* Thumbnail strip */}
          <div className="flex-shrink-0 h-20 bg-black/90 border-t border-white/10 flex items-center gap-2 px-4 overflow-x-auto">
            {images.map((src) => (
              <button
                key={src}
                onClick={() => setActive(src)}
                className={`relative flex-shrink-0 h-14 w-24 rounded overflow-hidden border-2 transition-all ${
                  src === active ? "border-[#E63B2E]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={src} alt={labelFor(src)} fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
