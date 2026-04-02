import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

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

function processServerSide(filepath) {
  let content = readFileSync(filepath, "utf8");

  // 1. Dodaj checkDownloadLimit i setPendingDownload do destrukturyzacji hooka
  content = content.replace(
    `const { showPricingModal, setShowPricingModal, checkLimit, onConversionSuccess } = useConversionLimit();`,
    `const { showPricingModal, setShowPricingModal, checkLimit, checkDownloadLimit, onConversionSuccess, setPendingDownload } = useConversionLimit();`
  );

  // 2. Usuń checkLimit() przed przetwarzaniem
  content = content.replace(
    /\s+\/\/ Sprawdź limit przed przetwarzaniem\n\s+if \(!checkLimit\(\)\) return;\n/g,
    "\n"
  );

  // 3. Usuń LIMIT_REACHED z create endpoint
  content = content.replace(
    `        if (err.error === "LIMIT_REACHED") {
          setShowPricingModal(true);
          setStatus("idle");
          return;
        }
        `,
    "        "
  );

  // 4. Zamień onConversionSuccess na setPendingDownload
  content = content.replace(
    `      // Inkrementuj licznik po sukcesie
      onConversionSuccess();`,
    `      // Zapisz pending download w localStorage
      setPendingDownload({
        storageKey,
        filename: file.name,
        toolSlug: TOOL_NAME,
        timestamp: Date.now(),
      });`
  );

  // 5. Zamień handleDownload na async z checkDownloadLimit
  content = content.replace(
    /function handleDownload\(\) \{[\s\S]*?a\.click\(\);\n\s*\}/,
    `async function handleDownload() {
    if (!downloadUrl) return;
    const canDownload = await checkDownloadLimit();
    if (!canDownload) return;
    onConversionSuccess();
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file?.name ?? "file.pdf";
    a.click();
  }`
  );

  writeFileSync(filepath, content, "utf8");
  console.log(`✅ SERVER: ${filepath}`);
}

function processBrowserSide(filepath) {
  let content = readFileSync(filepath, "utf8");

  // 1. Dodaj checkDownloadLimit do destrukturyzacji hooka
  content = content.replace(
    `const { showPricingModal, setShowPricingModal, checkLimit, onConversionSuccess } = useConversionLimit();`,
    `const { showPricingModal, setShowPricingModal, checkLimit, checkDownloadLimit, onConversionSuccess } = useConversionLimit();`
  );

  // 2. Usuń checkLimit() przed przetwarzaniem
  content = content.replace(
    /\s+\/\/ Sprawdź limit przed przetwarzaniem\n\s+if \(!checkLimit\(\)\) return;\n/g,
    "\n"
  );

  // 3. Usuń onConversionSuccess() po sukcesie
  content = content.replace(
    /\s+\/\/ Inkrementuj licznik po sukcesie\n\s+onConversionSuccess\(\);\n/g,
    "\n"
  );

  // 4. Zamień handleDownload na async z checkDownloadLimit
  content = content.replace(
    /function handleDownload\(\) \{[\s\S]*?a\.click\(\);\n\s*\}/,
    `async function handleDownload() {
    if (!downloadUrl) return;
    const canDownload = await checkDownloadLimit();
    if (!canDownload) return;
    onConversionSuccess();
    ToolTracking.downloadClicked(TOOL_NAME, PROCESSING_TYPE);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "output.pdf";
    a.click();
  }`
  );

  writeFileSync(filepath, content, "utf8");
  console.log(`✅ BROWSER: ${filepath}`);
}

// Przywróć oryginały z gita
for (const file of [...SERVER_SIDE_FILES, ...BROWSER_SIDE_FILES]) {
  try {
    execSync(`git checkout HEAD -- "${file}"`);
    console.log(`↩️  Restored: ${file}`);
  } catch (e) {
    console.log(`⚠️  Could not restore: ${file}`);
  }
}

for (const file of SERVER_SIDE_FILES) {
  processServerSide(file);
}

for (const file of BROWSER_SIDE_FILES) {
  processBrowserSide(file);
}

console.log("Done!");