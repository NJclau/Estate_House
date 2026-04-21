// lib/storage.ts
// SSR-safe localStorage wrappers
// No data leaves the browser. No PII stored.
//
// Source: Estate2.0 Website Spec Section 8 (localStorage intelligence)

const PREFIX = "estate_";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getItem<T>(key: string, fallback: T): T {
  if (!isClient()) return fallback;
  try {
    const raw = localStorage.getItem(`${PREFIX}${key}`);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
  } catch {
    // Quota exceeded or private mode — silently ignore
  }
}

export function removeItem(key: string): void {
  if (!isClient()) return;
  try {
    localStorage.removeItem(`${PREFIX}${key}`);
  } catch {
    // Ignore
  }
}

// ── Typed accessors ─────────────────────────────────────────

export function getSeenProperties(): string[] {
  return getItem<string[]>("seen_properties", []);
}

export function setSeenProperties(slugs: string[]): void {
  setItem("seen_properties", slugs);
}

export function getLastLocation(): string | null {
  return getItem<string | null>("last_location", null);
}

export function setLastLocation(location: string | null): void {
  setItem("last_location", location);
}

export function getLastType(): string | null {
  return getItem<string | null>("last_type", null);
}

export function setLastType(type: string | null): void {
  setItem("last_type", type);
}

export function getLastViewTimestamp(): number {
  return getItem<number>("last_view_timestamp", 0);
}

export function setLastViewTimestamp(): void {
  setItem("last_view_timestamp", Date.now());
}

export function isReturningUser(): boolean {
  if (!isClient()) return false;

  const flagged = getItem<boolean>("returning_user", false);
  if (flagged) return true;

  const lastView = getLastViewTimestamp();
  if (lastView === 0) return false;

  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const isRecent = Date.now() - lastView < sevenDaysMs;
  return isRecent;
}

export function markReturningUser(): void {
  setItem("returning_user", true);
  setLastViewTimestamp();
}

export function clearAll(): void {
  if (!isClient()) return;
  const keys = [
    "seen_properties",
    "last_location",
    "last_type",
    "last_view_timestamp",
    "returning_user",
  ];
  keys.forEach((key) => {
    try {
      localStorage.removeItem(`${PREFIX}${key}`);
    } catch {
      // Ignore
    }
  });
}
