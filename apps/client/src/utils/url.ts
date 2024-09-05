export function url(path: string) {
  const baseUrl = import.meta.env.DEV
    ? location.origin
    : import.meta.env.VITE_PUBLIC_PATH

  return new URL(path, baseUrl)
}
