/**
 * Basit className birleştirici — koşullu/undefined değerleri filtreler.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}
