"use client";
import type { ConvertImageVariant } from "@/data/convert-image/variants";
import ImageConvertTool from "./ImageConvertTool";
type Props = { variant: ConvertImageVariant };
export default function JpgToIcoTool({ variant }: Props) { return <ImageConvertTool variant={variant} />; }
