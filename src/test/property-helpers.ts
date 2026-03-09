/**
 * Property-Based Test Helpers
 *
 * Shared configuration and utilities for fast-check property tests.
 */
import fc from 'fast-check';

// ---------------------------------------------------------------------------
// Default configuration – minimum 100 iterations per property test
// ---------------------------------------------------------------------------

export const PBT_CONFIG: fc.Parameters<unknown> = {
  numRuns: 100,
  verbose: false,
};

/**
 * Convenience wrapper that runs fc.assert with the project-wide defaults.
 * Accepts the same arguments as fc.assert but merges PBT_CONFIG.
 */
export function assertProperty<Ts>(
  property: fc.IProperty<Ts>,
  params?: fc.Parameters<Ts>,
): void {
  fc.assert(property, { ...PBT_CONFIG, ...params } as fc.Parameters<Ts>);
}

// ---------------------------------------------------------------------------
// DOM helpers (jsdom)
// ---------------------------------------------------------------------------

/**
 * Creates a minimal DOM document from an HTML string.
 * Useful for testing rendering properties without a full framework.
 */
export function parseHTML(html: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
}

/**
 * Checks whether a given text appears somewhere in the document body.
 */
export function bodyContainsText(doc: Document, text: string): boolean {
  return doc.body.textContent?.includes(text) ?? false;
}
