export const REGEX_PATTERNS = {
  SUSPICIOUS_HIGH_MASK_SHIFT: /0x[fF]{8,}(?:u\d+)?\s*<<\s*(?:64|128|160|192|224)/,
  WRONG_BOUNDARY_COMPARATOR: /if\s*(?:\(\s*)?[a-zA-Z_][\w]*\s*>\s*(?:mask|1\s*<<\s*\d+)(?:\s*\))?/,
  SHIFT_OPERATION: /<<\s*(?:32|64|96|128)/,
  CHECKED_GUARD_FUNCTION: /checked_shl|checked_shift|checked_shlw/
} as const;
