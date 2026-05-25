/** Strip markdown/mailto wrappers so pasted links still log in. */
export function normalizeEmail(value = "") {
  const trimmed = String(value).trim();
  const markdown = trimmed.match(/^\[([^\]]+)\]\(mailto:[^)]+\)$/i);
  if (markdown) return markdown[1].trim().toLowerCase();
  if (trimmed.toLowerCase().startsWith("mailto:")) {
    return trimmed.slice(7).split("?")[0].trim().toLowerCase();
  }
  return trimmed.toLowerCase();
}
