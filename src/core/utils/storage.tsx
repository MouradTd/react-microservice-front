export function getItem<T>(key: string): T {
    const value = localStorage.getString(key);
    return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
    localStorage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
    localStorage.delete(key);
}
