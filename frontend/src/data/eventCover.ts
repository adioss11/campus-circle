const COVERS: [string, string][] = [
  ["#f0a8e8", "#6c4cff"],
  ["#ff9ec8", "#7c6bff"],
  ["#c084fc", "#4f46e5"],
];

/** Pick a gradient from the event id so each card has a stable color. */
export function coverForEvent(id: string): [string, string] {
  let n = 0;
  for (const char of id) {
    n += char.charCodeAt(0);
  }
  return COVERS[n % COVERS.length];
}
