import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  relativeLuminance,
  calculateContrastRatio,
  validatePair,
  validateAllColorPairs,
  getFailingPairs,
  lightThemePairs,
  darkThemePairs,
  WCAG_AA_NORMAL_TEXT,
  WCAG_AA_LARGE_TEXT,
  type ColorPair,
} from './contrastValidation';

// ---------------------------------------------------------------------------
// Unit tests – core functions
// ---------------------------------------------------------------------------

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
    expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
    expect(hexToRgb('#2563eb')).toEqual([37, 99, 235]);
  });

  it('parses 3-digit shorthand hex', () => {
    expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
    expect(hexToRgb('#000')).toEqual([0, 0, 0]);
  });

  it('parses 8-digit hex (ignores alpha)', () => {
    expect(hexToRgb('#2563ebff')).toEqual([37, 99, 235]);
  });

  it('works without leading #', () => {
    expect(hexToRgb('2563eb')).toEqual([37, 99, 235]);
  });

  it('throws on invalid hex', () => {
    expect(() => hexToRgb('#zz')).toThrow('Invalid hex');
    expect(() => hexToRgb('#12')).toThrow('Invalid hex');
  });
});

describe('relativeLuminance', () => {
  it('returns 1 for white', () => {
    expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 4);
  });

  it('returns 0 for black', () => {
    expect(relativeLuminance('#000000')).toBeCloseTo(0, 4);
  });

  it('returns ~0.2126 for pure red', () => {
    expect(relativeLuminance('#ff0000')).toBeCloseTo(0.2126, 3);
  });
});

describe('calculateContrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(calculateContrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0);
  });

  it('returns 1 for identical colours', () => {
    expect(calculateContrastRatio('#2563eb', '#2563eb')).toBeCloseTo(1, 2);
  });

  it('is symmetric (order does not matter)', () => {
    const r1 = calculateContrastRatio('#2563eb', '#ffffff');
    const r2 = calculateContrastRatio('#ffffff', '#2563eb');
    expect(r1).toBeCloseTo(r2, 4);
  });

  // Known reference value: #2563eb on #ffffff ≈ 5.17:1
  it('matches known reference for blue-600 on white', () => {
    const ratio = calculateContrastRatio('#2563eb', '#ffffff');
    expect(ratio).toBeGreaterThanOrEqual(5.0);
    expect(ratio).toBeLessThan(5.5);
  });
});

describe('validatePair', () => {
  it('passes a high-contrast normal text pair', () => {
    const pair: ColorPair = {
      name: 'test',
      foreground: '#000000',
      background: '#ffffff',
      usage: 'normal',
    };
    const result = validatePair(pair);
    expect(result.passes).toBe(true);
    expect(result.requiredRatio).toBe(WCAG_AA_NORMAL_TEXT);
  });

  it('fails a low-contrast normal text pair', () => {
    const pair: ColorPair = {
      name: 'test',
      foreground: '#cccccc',
      background: '#ffffff',
      usage: 'normal',
    };
    const result = validatePair(pair);
    expect(result.passes).toBe(false);
  });

  it('uses 3:1 threshold for large text', () => {
    const pair: ColorPair = {
      name: 'test',
      foreground: '#6b7280',
      background: '#ffffff',
      usage: 'large',
    };
    const result = validatePair(pair);
    expect(result.requiredRatio).toBe(WCAG_AA_LARGE_TEXT);
  });
});

// ---------------------------------------------------------------------------
// WCAG AA validation – all site colour pairs
// ---------------------------------------------------------------------------

describe('WCAG AA colour contrast – light theme', () => {
  it.each(lightThemePairs.map((p) => [p.name, p]))(
    '%s meets WCAG AA',
    (_name, pair) => {
      const result = validatePair(pair as ColorPair);
      expect(
        result.passes,
        `${result.pair.name}: ratio ${result.ratio}:1 < required ${result.requiredRatio}:1 ` +
          `(fg ${result.pair.foreground} on bg ${result.pair.background})`,
      ).toBe(true);
    },
  );
});

describe('WCAG AA colour contrast – dark theme', () => {
  it.each(darkThemePairs.map((p) => [p.name, p]))(
    '%s meets WCAG AA',
    (_name, pair) => {
      const result = validatePair(pair as ColorPair);
      expect(
        result.passes,
        `${result.pair.name}: ratio ${result.ratio}:1 < required ${result.requiredRatio}:1 ` +
          `(fg ${result.pair.foreground} on bg ${result.pair.background})`,
      ).toBe(true);
    },
  );
});

describe('validateAllColorPairs', () => {
  it('returns results for every defined pair', () => {
    const results = validateAllColorPairs();
    expect(results.length).toBe(lightThemePairs.length + darkThemePairs.length);
  });

  it('has zero failing pairs', () => {
    const failing = getFailingPairs();
    if (failing.length > 0) {
      const details = failing
        .map(
          (f) =>
            `  ${f.pair.name}: ${f.ratio}:1 (need ${f.requiredRatio}:1) – fg ${f.pair.foreground} bg ${f.pair.background}`,
        )
        .join('\n');
      expect.fail(`Failing colour pairs:\n${details}`);
    }
  });
});
