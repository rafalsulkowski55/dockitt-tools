const STORAGE_KEY = "dockitt_daily_conversions";

interface ConversionRecord {
  date: string;
  count: number;
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