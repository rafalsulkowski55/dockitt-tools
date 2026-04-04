const STORAGE_KEY = "dockitt_daily_conversions";
const PENDING_DOWNLOAD_KEY = "dockitt_pending_download";

interface ConversionRecord {
  date: string;
  count: number;
}

export interface PendingDownload {
  storageKey?: string;
  filename: string;
  toolSlug: string;
  toolPath: string;
  timestamp: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function getConversionRecord(): ConversionRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getToday(), count: 0 };
    const record = JSON.parse(raw) as ConversionRecord;
    if (record.date !== getToday()) return { date: getToday(), count: 0 };
    return record;
  } catch {
    return { date: getToday(), count: 0 };
  }
}

export function incrementConversion(): void {
  const record = getConversionRecord();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    date: getToday(),
    count: record.count + 1,
  }));
}

export function hasReachedLimit(): boolean {
  const record = getConversionRecord();
  return record.count >= 1;
}

export function setPendingDownload(data: PendingDownload): void {
  localStorage.setItem(PENDING_DOWNLOAD_KEY, JSON.stringify(data));
}

export function getPendingDownload(): PendingDownload | null {
  try {
    const raw = localStorage.getItem(PENDING_DOWNLOAD_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PendingDownload;
    if (data.timestamp && Date.now() - data.timestamp > 30 * 60 * 1000) {
      localStorage.removeItem(PENDING_DOWNLOAD_KEY);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearPendingDownload(): void {
  localStorage.removeItem(PENDING_DOWNLOAD_KEY);
}