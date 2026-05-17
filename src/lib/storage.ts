// Typed localStorage wrapper — all keys centralized here, never hardcoded elsewhere.

export type CheckinStatus = 'done' | 'skipped' | null;

function dateKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

// ── CHECKINS ────────────────────────────────────────────────
const CHECKIN_PREFIX = 'nexus:checkin';

export function getCheckinKey(date: Date, blockIndex: number): string {
  return `${CHECKIN_PREFIX}:${dateKey(date)}:${blockIndex}`;
}

export function getCheckin(blockIndex: number, date: Date = new Date()): CheckinStatus {
  const raw = localStorage.getItem(getCheckinKey(date, blockIndex));
  if (raw === 'done' || raw === 'skipped') return raw;
  return null;
}

export function setCheckin(blockIndex: number, status: CheckinStatus, date: Date = new Date()): void {
  const key = getCheckinKey(date, blockIndex);
  if (status === null) {
    localStorage.removeItem(key);
  } else {
    localStorage.setItem(key, status);
  }
  // Dispatch custom event for same-tab reactivity (e.g. useDailyScore)
  window.dispatchEvent(new Event('nexus:checkin-update'));
}

export function getCheckinsByDateStr(dateStr: string): Record<number, CheckinStatus> {
  const prefix = `${CHECKIN_PREFIX}:${dateStr}:`;
  const result: Record<number, CheckinStatus> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(prefix)) {
      const idx = parseInt(key.replace(prefix, ''), 10);
      const val = localStorage.getItem(key) as CheckinStatus;
      if (!isNaN(idx) && (val === 'done' || val === 'skipped')) {
        result[idx] = val;
      }
    }
  }
  return result;
}

export function getAllCheckins(date: Date = new Date()): Record<number, CheckinStatus> {
  return getCheckinsByDateStr(dateKey(date));
}

// ── BOOT FLAG ────────────────────────────────────────────────
const BOOT_KEY = 'nexus:boot:last';

export function getLastBootDate(): string | null {
  return localStorage.getItem(BOOT_KEY);
}

export function setLastBootDate(date: Date = new Date()): void {
  localStorage.setItem(BOOT_KEY, dateKey(date));
}

export function shouldShowBoot(): boolean {
  return getLastBootDate() !== dateKey();
}
