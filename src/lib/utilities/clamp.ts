export function clampNumber(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max);
}
