export type LocalStorageKeys =
  | "token"
  | "username"
  | "email"
  | "type"
  | "name"
  | "uid";

export function getLocalStorage(key: LocalStorageKeys): string | null {
  return localStorage.getItem(key);
}

export function setLocalStorage(key: LocalStorageKeys, value: unknown): void {
  if (value === null || value === undefined) return;

  if (typeof value === "object") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
    return;
  }

  localStorage.setItem(key, String(value));
}

export function clearLocalStorage(key: LocalStorageKeys): void {
  localStorage.removeItem(key);
}
