"use client";
import SvgConvertTool from "./SvgConvertTool";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
export default function SvgToPngTool({ variant }: { variant: ConvertImageVariant }) {
  return <SvgConvertTool variant={variant} />;
}
