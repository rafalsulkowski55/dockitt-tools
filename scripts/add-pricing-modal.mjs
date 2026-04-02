import { readFileSync, writeFileSync } from "fs";

const SERVER_SIDE_FILES = [
  "app/tools/[slug]/RepairUpload.tsx",
  "app/tools/[slug]/OcrUpload.tsx",
  "app/tools/[slug]/ProtectUpload.tsx",
  "app/tools/[slug]/UnlockUpload.tsx",
];

const BROWSER_SIDE_FILES = [
  "app/tools/[slug]/CropUpload.tsx",
  "app/tools/[slug]/DeletePagesUpload.tsx",
  "app/tools/[slug]/ExtractPagesUpload.tsx",
  "app/tools/[slug]/ReorderUpload.tsx",
  "app/tools/[slug]/RotateUpload.tsx",
  "app/tools/[slug]/SignUpload.tsx",
  "app/tools/[slug]/SplitUpload.tsx",
  "app/tools/[slug]/WatermarkUpload.tsx",
];

function processFile(filepath, isServerSide) {
  let content = readFileSync(filepath, "utf8");

  // Dodaj importy jeśli nie ma
  if (!content.includes("useConversionLimit")) {
    content = content.replace(
      `import { ToolTracking } from "@/lib/analytics";`,
      `import { ToolTracking } from "@/lib/analytics";
import { useConversionLimit } from "@/lib/use-conversion-limit";
import PricingModal from "@/app/components/PricingModal";`
    );
  }

  // Dodaj hook po pierwszym useState
  if (!content.includes("useConversionLimit()")) {
    // Znajdź pierwsze wystąpienie useState i dodaj hook po całym bloku stanów
    content = content.replace(
      /( {2}const inputRef = useRef[^\n]+\n)/,
      `$1\n  const { showPricingModal, setShowPricingModal, checkLimit, onConversionSuccess } = useConversionLimit();\n`
    );
  }

  // Dodaj sprawdzenie limitu przed przetwarzaniem (server-side)
  if (isServerSide && !content.includes("checkLimit()")) {
    content = content.replace(
      /( {4}if \(!file\) return;\n)( {4}setStatus\("validating"\);)/,
      `$1    if (!checkLimit()) return;\n$2`
    );
  }

  // Dodaj sprawdzenie limitu przed przetwarzaniem (browser-side)
  if (!isServerSide && !content.includes("checkLimit()")) {
    content = content.replace(
      /(ToolTracking\.processStarted\(TOOL_NAME, PROCESSING_TYPE\);)/,
      `if (!checkLimit()) return;\n\n    $1`
    );
  }

  // Dodaj LIMIT_REACHED handler dla server-side
  if (isServerSide && !content.includes("LIMIT_REACHED")) {
    content = content.replace(
      `      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error ?? "Failed to create upload URL");
      }`,
      `      if (!createRes.ok) {
        const err = await createRes.json();
        if (err.error === "LIMIT_REACHED") {
          setShowPricingModal(true);
          setStatus("idle");
          return;
        }
        throw new Error(err.error ?? "Failed to create upload URL");
      }`
    );
  }

  // Dodaj onConversionSuccess przed ToolTracking.processSuccess
  if (!content.includes("onConversionSuccess()")) {
    content = content.replace(
      /ToolTracking\.processSuccess\(TOOL_NAME, PROCESSING_TYPE\);/,
      `onConversionSuccess();\n      ToolTracking.processSuccess(TOOL_NAME, PROCESSING_TYPE);`
    );
  }

  // Owiń return w <>
  if (!content.includes("showPricingModal && <PricingModal")) {
    content = content.replace(
      `  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>`,
      `  return (
    <>
      {showPricingModal && <PricingModal onClose={() => setShowPricingModal(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>`
    );

    // Zamknij <>
    content = content.replace(
      /(\s+<\/div>\n\s+\);\n}[\s]*)$/,
      `\n      </div>\n    </>\n  );\n}\n`
    );
  }

  writeFileSync(filepath, content, "utf8");
  console.log(`✅ ${filepath}`);
}

// Najpierw przywróć oryginały z gita
import { execSync } from "child_process";

for (const file of [...SERVER_SIDE_FILES, ...BROWSER_SIDE_FILES]) {
  try {
    execSync(`git checkout HEAD -- "${file}"`);
    console.log(`↩️  Restored: ${file}`);
  } catch (e) {
    console.log(`⚠️  Could not restore: ${file}`);
  }
}

for (const file of SERVER_SIDE_FILES) {
  processFile(file, true);
}

for (const file of BROWSER_SIDE_FILES) {
  processFile(file, false);
}

console.log("Done!");