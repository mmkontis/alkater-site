import fs from "fs";
import path from "path";
import VRGallery from "./components/VRGallery";

function getVRImages(): string[] {
  const vrDir = path.join(process.cwd(), "public", "Photos", "enhanced", "vr");
  try {
    const files = fs.readdirSync(vrDir);
    return files
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map((f) => `/Photos/enhanced/vr/${f}`)
      .sort();
  } catch {
    return [];
  }
}

export const metadata = {
  title: "ΑΛΚΑΤΕΡ | 360° Περιηγήσεις Έργων",
  description: "Εξερευνήστε τα έργα μας με 360° πανοραμική προβολή.",
};

export default function VRPage() {
  const images = getVRImages();
  return <VRGallery images={images} />;
}
