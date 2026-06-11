"use client";
import ImageConvertTool from "./ImageConvertTool";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
export default function GifToJpgTool({ variant }: { variant: ConvertImageVariant }) {
  return <ImageConvertTool variant={variant} />;
}
