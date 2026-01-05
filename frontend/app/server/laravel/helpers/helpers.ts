export const baseToUrl = (base: string, path: string) => {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
};

export const buildHeaders = (options: {
  token?: string;
  body?: unknown;
  defaults?: HeadersInit;
  extra?: HeadersInit;
}) => {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  if (options.body !== undefined) headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);

  for (const group of [options.defaults, options.extra]) {
    if (!group) continue;
    new Headers(group).forEach((value, key) => headers.set(key, value));
  }

  return headers;
};

export const parseJsonOrNull = async <T>(response: Response) => {
  const text = await response.text();
  if (!text) return null as T | null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null as T | null;
  }
};
