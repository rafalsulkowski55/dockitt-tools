"use client";
import TiffConvertTool from "./TiffConvertTool";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
export default function TiffToPngTool({ variant }: { variant: ConvertImageVariant }) {
  return <TiffConvertTool variant={variant} />;
}
