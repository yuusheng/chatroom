export function safeJSONParse(json: string) {
  try {
    return JSON.parse(json)
  } catch {
    return json
  }
}
