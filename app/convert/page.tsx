import type { Metadata } from "next";
import { getAllConvertVariants } from "@/data/convert/variants";
import ConvertHub from "./ConvertHub";

export const metadata: Metadata = {
  title: "Convert Files Online — PDF & Image Converter | Dockitt",
  description: "Free online file converter. Convert PDF to JPG, PNG, and more. All conversions run in your browser — no upload, no account needed.",
  openGraph: {
    title: "Convert Files Online — PDF & Image Converter | Dockitt",
    description: "Free online file converter. Convert PDF to JPG, PNG, and more. All conversions run in your browser — no upload, no account needed.",
    url: "https://www.dockitt.com/convert",
    siteName: "Dockitt",
    locale: "en_US",
    type: "website",
  },
};

export default function ConvertPage() {
  const variants = getAllConvertVariants();
  return <ConvertHub variants={variants} />;
}
