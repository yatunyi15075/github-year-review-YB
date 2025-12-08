// src/lib/helpers.ts

/**
 * Format a number with commas
 * e.g. 1234567 => 1,234,567
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Get the year from a GitHub date string
 */
export function getYearFromDate(dateStr: string): number {
  return new Date(dateStr).getFullYear();
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
