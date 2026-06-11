"use client";
import SvgConvertTool from "./SvgConvertTool";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
export default function SvgToJpgTool({ variant }: { variant: ConvertImageVariant }) {
  return <SvgConvertTool variant={variant} />;
}
