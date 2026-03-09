/**
 * WCAG 2.1 Color Contrast Validation Utility
 *
 * Implements the contrast ratio algorithm from WCAG 2.1 specification:
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 *
 * WCAG AA minimum ratios:
 *   - Normal text (< 18pt or < 14pt bold): 4.5:1
 *   - Large text  (≥ 18pt or ≥ 14pt bold): 3.0:1
 */

// ---------------------------------------------------------------------------
// Core colour-science helpers
// ---------------------------------------------------------------------------

/**
 * Parse a hex colour string (#RGB, #RRGGBB, or #RRGGBBAA) into [r, g, b]
 * values in the 0-255 range.
 */
export function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace(/^#/, '');

  let r: number, g: number, b: number;

  if (cleaned.length === 3) {
    r = parseInt(cleaned[0] + cleaned[0], 16);
    g = parseInt(cleaned[1] + cleaned[1], 16);
    b = parseInt(cleaned[2] + cleaned[2], 16);
  } else if (cleaned.length === 6 || cleaned.length === 8) {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  } else {
    throw new Error(`Invalid hex colour: ${hex}`);
  }

  return [r, g, b];
}

/**
 * Convert an sRGB channel value (0-255) to its relative luminance component
 * per WCAG 2.1 § 1.4.3.
 */
function srgbChannelToLinear(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.04045
    ? srgb / 12.92
    : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

/**
 * Calculate the relative luminance of a colour.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (
    0.2126 * srgbChannelToLinear(r) +
    0.7152 * srgbChannelToLinear(g) +
    0.0722 * srgbChannelToLinear(b)
  );
}

/**
 * Calculate the contrast ratio between two colours.
 * Returns a value ≥ 1 (identical colours = 1:1).
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  const l1 = relativeLuminance(color1);
  const l2 = relativeLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// WCAG AA thresholds
// ---------------------------------------------------------------------------

export const WCAG_AA_NORMAL_TEXT = 4.5;
export const WCAG_AA_LARGE_TEXT = 3.0;

// ---------------------------------------------------------------------------
// Theme colour palette – documents every text/background pair used on the site
// ---------------------------------------------------------------------------

export interface ColorPair {
  name: string;
  foreground: string;
  background: string;
  /** "normal" (< 18pt) or "large" (≥ 18pt / ≥ 14pt bold) */
  usage: 'normal' | 'large';
}

/**
 * Light-theme colour pairs extracted from the component source files.
 * Each entry maps to one or more CSS rules in the codebase.
 */
export const lightThemePairs: ColorPair[] = [
  // Body / headings on white
  { name: 'Body text on white',            foreground: '#111827', background: '#ffffff', usage: 'normal' },
  { name: 'Heading (h1/h2) on white',      foreground: '#111827', background: '#ffffff', usage: 'large'  },
  { name: 'Subheading on white',           foreground: '#374151', background: '#ffffff', usage: 'normal' },
  { name: 'Secondary text on white',       foreground: '#4b5563', background: '#ffffff', usage: 'normal' },
  { name: 'Muted text on white',           foreground: '#6b7280', background: '#ffffff', usage: 'normal' },

  // Accent / links
  { name: 'Primary link on white',         foreground: '#2563eb', background: '#ffffff', usage: 'normal' },
  { name: 'Primary link hover on white',   foreground: '#1d4ed8', background: '#ffffff', usage: 'normal' },
  { name: 'Logo on white',                 foreground: '#1e3a8a', background: '#ffffff', usage: 'large'  },

  // Buttons
  { name: 'Primary button text',           foreground: '#ffffff', background: '#2563eb', usage: 'normal' },
  { name: 'Secondary button text on white',foreground: '#374151', background: '#ffffff', usage: 'normal' },

  // Skill card category colours (light)
  { name: 'Cloud skill text on tinted bg', foreground: '#1e40af', background: '#ffffff', usage: 'normal' },
  { name: 'Language skill text',           foreground: '#065f46', background: '#ffffff', usage: 'normal' },
  { name: 'Framework skill text',          foreground: '#92400e', background: '#ffffff', usage: 'normal' },
  { name: 'Tool skill text',              foreground: '#374151', background: '#ffffff', usage: 'normal' },

  // Active filter button
  { name: 'Active filter button text',     foreground: '#ffffff', background: '#2563eb', usage: 'normal' },
];

/**
 * Dark-theme colour pairs extracted from the component source files.
 */
export const darkThemePairs: ColorPair[] = [
  // Body / headings on gray-900
  { name: 'Body text on dark bg',          foreground: '#f9fafb', background: '#111827', usage: 'normal' },
  { name: 'Heading on dark bg',            foreground: '#f9fafb', background: '#111827', usage: 'large'  },
  { name: 'Alt heading on dark bg',        foreground: '#f3f4f6', background: '#111827', usage: 'normal' },
  { name: 'Secondary text on dark bg',     foreground: '#d1d5db', background: '#111827', usage: 'normal' },
  { name: 'Muted text on dark bg',         foreground: '#9ca3af', background: '#111827', usage: 'normal' },

  // Accent / links (dark)
  { name: 'Primary link on dark bg',       foreground: '#60a5fa', background: '#111827', usage: 'normal' },
  { name: 'Light link on dark bg',         foreground: '#93c5fd', background: '#111827', usage: 'normal' },
  { name: 'Lightest link on dark bg',      foreground: '#bfdbfe', background: '#111827', usage: 'normal' },

  // Logo (dark)
  { name: 'Logo on dark bg',              foreground: '#93c5fd', background: '#111827', usage: 'large'  },

  // Buttons (dark)
  { name: 'Dark primary button text',      foreground: '#ffffff', background: '#2563eb', usage: 'normal' },
  { name: 'Dark secondary button text',    foreground: '#d1d5db', background: '#111827', usage: 'normal' },

  // Skill card category colours (dark)
  { name: 'Cloud skill text (dark)',       foreground: '#93c5fd', background: '#111827', usage: 'normal' },
  { name: 'Language skill text (dark)',    foreground: '#6ee7b7', background: '#111827', usage: 'normal' },
  { name: 'Framework skill text (dark)',   foreground: '#fcd34d', background: '#111827', usage: 'normal' },
  { name: 'Tool skill text (dark)',        foreground: '#d1d5db', background: '#111827', usage: 'normal' },

  // Active filter button (same in dark)
  { name: 'Active filter button (dark)',   foreground: '#ffffff', background: '#2563eb', usage: 'normal' },
];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export interface ValidationResult {
  pair: ColorPair;
  ratio: number;
  requiredRatio: number;
  passes: boolean;
}

/**
 * Validate a single colour pair against WCAG AA.
 */
export function validatePair(pair: ColorPair): ValidationResult {
  const ratio = calculateContrastRatio(pair.foreground, pair.background);
  const requiredRatio = pair.usage === 'large' ? WCAG_AA_LARGE_TEXT : WCAG_AA_NORMAL_TEXT;
  return {
    pair,
    ratio: Math.round(ratio * 100) / 100,
    requiredRatio,
    passes: ratio >= requiredRatio,
  };
}

/**
 * Validate all site colour pairs and return results.
 */
export function validateAllColorPairs(): ValidationResult[] {
  return [...lightThemePairs, ...darkThemePairs].map(validatePair);
}

/**
 * Run validation and return only failing pairs.
 */
export function getFailingPairs(): ValidationResult[] {
  return validateAllColorPairs().filter((r) => !r.passes);
}
