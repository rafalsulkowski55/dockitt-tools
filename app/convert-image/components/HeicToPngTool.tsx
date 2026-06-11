"use client";
import HeicConvertTool from "./HeicConvertTool";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
export default function HeicToPngTool({ variant }: { variant: ConvertImageVariant }) {
  return <HeicConvertTool variant={variant} />;
}
