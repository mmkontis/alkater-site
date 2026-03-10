"use client";

import { useCallback, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const MAX_DIMENSION = 2048;
const WEBP_QUALITY = 0.92;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string | null) => void;
  folder?: string;
  maxSizeMb?: number;
  maxDimension?: number;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function compressImage(
  file: File,
  maxDim: number
): Promise<{ blob: Blob; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas not supported"));

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Compression failed"));
          resolve({ blob, width, height });
        },
        "image/webp",
        WEBP_QUALITY
      );
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

export default function ImageUpload({
  value,
  onChange,
  folder = "general",
  maxSizeMb = MAX_FILE_SIZE_MB,
  maxDimension = MAX_DIMENSION,
}: ImageUploadProps) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);
  const [stats, setStats] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploading(true);
      setProgress(null);
      setStats(null);

      try {
        const maxBytes = maxSizeMb * 1024 * 1024;
        if (file.size > maxBytes) {
          alert(
            `Το αρχείο είναι ${formatBytes(file.size)}. Μέγιστο επιτρεπτό: ${maxSizeMb} MB.`
          );
          return;
        }

        const originalSize = file.size;
        setProgress("Συμπίεση εικόνας...");

        const { blob, width, height } = await compressImage(file, maxDimension);

        const savedPercent = Math.round(
          ((originalSize - blob.size) / originalSize) * 100
        );
        setStats(
          `${formatBytes(originalSize)} → ${formatBytes(blob.size)} (${savedPercent > 0 ? `-${savedPercent}%` : "ίδιο"}) · ${width}×${height}px`
        );

        setProgress("Μεταφόρτωση...");
        const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

        const { error } = await supabase.storage
          .from("media")
          .upload(name, blob, {
            upsert: false,
            contentType: "image/webp",
          });

        if (error) throw error;

        const {
          data: { publicUrl },
        } = supabase.storage.from("media").getPublicUrl(name);

        onChange(publicUrl);
        setProgress(null);
      } catch (err) {
        console.error("Upload failed:", err);
        alert("Αποτυχία μεταφόρτωσης. Δοκιμάστε ξανά.");
        setStats(null);
      } finally {
        setUploading(false);
        setProgress(null);
      }
    },
    [supabase, folder, onChange, maxSizeMb, maxDimension]
  );

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert("Μόνο JPG, PNG, WebP και GIF επιτρέπονται.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert(
        `Το αρχείο είναι ${formatBytes(file.size)}. Μέγιστο: ${MAX_FILE_SIZE_MB} MB.`
      );
      return;
    }
    upload(file);
  }

  return (
    <div className="flex flex-col gap-2">
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-48 rounded-lg border border-zinc-200 object-cover"
          />
          <button
            type="button"
            onClick={() => {
              onChange(null);
              setStats(null);
            }}
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow hover:bg-red-600"
            title="Αφαίρεση"
          >
            &times;
          </button>
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
          uploading
            ? "cursor-wait border-zinc-300 bg-zinc-50"
            : dragOver
              ? "border-[#1B7A7A] bg-[#1B7A7A]/5"
              : "border-zinc-300 bg-zinc-50 hover:border-zinc-400"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-300 border-t-[#1B7A7A]" />
            <p className="text-sm text-zinc-500">{progress}</p>
          </div>
        ) : (
          <>
            <svg
              className="mb-2 h-8 w-8 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            <p className="text-sm text-zinc-500">
              Σύρετε εικόνα ή κάντε κλικ
            </p>
            <p className="text-xs text-zinc-400">
              JPG, PNG, WebP, GIF · Max {maxSizeMb} MB · Auto WebP
            </p>
          </>
        )}
      </div>

      {stats && (
        <p className="flex items-center gap-1.5 text-xs text-zinc-500">
          <svg
            className="h-3.5 w-3.5 text-emerald-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
          {stats}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />
    </div>
  );
}
