"use client";
import ImageConvertTool from "./ImageConvertTool";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
export default function GifToWebpTool({ variant }: { variant: ConvertImageVariant }) {
  return <ImageConvertTool variant={variant} />;
}
