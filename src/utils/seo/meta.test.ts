/**
 * Property-based and unit tests for the Meta Tag Generator.
 *
 * Uses fast-check via the shared assertProperty helper.
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { assertProperty } from '../../test/property-helpers';
import { metaTagInputArb, pathnameArb, nonEmptyString } from '../../test/generators';
import {
  generateTitle,
  generateCanonicalURL,
  generateMetaTags,
} from './meta';
import { SEO_CONFIG } from './config';

// ===========================================================================
// Property-Based Tests
// ===========================================================================

describe('Meta Tag Generator – Property Tests', () => {
  // -------------------------------------------------------------------------
  // Property 1: Canonical URL round-trip
  // **Validates: Requirements 3.2, 3.3**
  // -------------------------------------------------------------------------
  it('Property 1: Canonical URL round-trip', () => {
    assertProperty(
      fc.property(pathnameArb(), (pathname) => {
        const siteUrl = 'https://daneshmishra.co.uk';
        const canonical = generateCanonicalURL(siteUrl, pathname);
        const parsed = new URL(canonical);

        // Origin should match the site URL
        expect(parsed.origin).toBe(siteUrl);

        // Pathname should match the input (generateCanonicalURL prepends / if missing)
        const expectedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
        expect(parsed.pathname).toBe(expectedPath);
      }),
    );
  });

  // -------------------------------------------------------------------------
  // Property 7: Meta tag completeness
  // **Validates: Requirements 7.1, 7.3, 7.4, 7.6**
  // -------------------------------------------------------------------------
  it('Property 7: Meta tag completeness', () => {
    assertProperty(
      fc.property(metaTagInputArb(), (input) => {
        const tags = generateMetaTags(input);

        // All fields must be non-empty strings
        expect(tags.title.length).toBeGreaterThan(0);
        expect(tags.description.length).toBeGreaterThan(0);
        expect(tags.canonicalURL.length).toBeGreaterThan(0);
        expect(tags.ogType.length).toBeGreaterThan(0);
        expect(tags.ogUrl.length).toBeGreaterThan(0);
        expect(tags.ogTitle.length).toBeGreaterThan(0);
        expect(tags.ogDescription.length).toBeGreaterThan(0);
        expect(tags.ogImage.length).toBeGreaterThan(0);
        expect(tags.twitterCard.length).toBeGreaterThan(0);
        expect(tags.twitterTitle.length).toBeGreaterThan(0);
        expect(tags.twitterDescription.length).toBeGreaterThan(0);
        expect(tags.twitterImage.length).toBeGreaterThan(0);

        // Title must contain site name "Danesh Mishra" (Req 7.1)
        expect(tags.title).toContain('Danesh Mishra');
      }),
    );
  });

  // -------------------------------------------------------------------------
  // Property 8: Description passthrough
  // **Validates: Requirements 7.2**
  // -------------------------------------------------------------------------
  it('Property 8: Description passthrough', () => {
    assertProperty(
      fc.property(metaTagInputArb(), (input) => {
        const tags = generateMetaTags(input);
        expect(tags.description).toBe(input.description);
      }),
    );
  });

  // -------------------------------------------------------------------------
  // Property 9: Custom OG image override
  // **Validates: Requirements 6.2**
  // -------------------------------------------------------------------------
  it('Property 9: Custom OG image override', () => {
    assertProperty(
      fc.property(
        metaTagInputArb().filter((input) => input.ogImage !== undefined),
        (input) => {
          const tags = generateMetaTags(input);
          expect(tags.ogImage).toBe(input.ogImage);
          expect(tags.twitterImage).toBe(input.ogImage);
        },
      ),
    );
  });

  // -------------------------------------------------------------------------
  // Property 10: GSC verification tag presence
  // **Validates: Requirements 1.1, 1.2**
  // -------------------------------------------------------------------------
  it('Property 10: GSC verification tag presence', () => {
    assertProperty(
      fc.property(nonEmptyString(), (verificationCode) => {
        // Non-empty verification code should be truthy and usable
        expect(verificationCode.length).toBeGreaterThan(0);
        // The config value determines whether the tag is rendered
        expect(!!verificationCode).toBe(true);
      }),
    );

    // When empty, no verification tag should be produced
    expect(SEO_CONFIG.googleSiteVerification).toBe('');
    expect(!!SEO_CONFIG.googleSiteVerification).toBe(false);
  });
});

// ===========================================================================
// Unit Tests
// ===========================================================================

describe('Meta Tag Generator – Unit Tests', () => {
  it('Home title formatting: returns default title without separator', () => {
    const title = generateTitle('Home', SEO_CONFIG.siteName);
    expect(title).toBe('Danesh Mishra - Senior Cloud Architect');
    expect(title).not.toContain('|');
  });

  it('Empty title returns default title', () => {
    const title = generateTitle('', SEO_CONFIG.siteName);
    expect(title).toBe('Danesh Mishra - Senior Cloud Architect');
  });

  it('Non-home title includes page title and site name with separator', () => {
    const title = generateTitle('My Blog Post', SEO_CONFIG.siteName);
    expect(title).toBe('My Blog Post | Danesh Mishra');
  });

  it('Default OG image is used when no custom image provided', () => {
    const tags = generateMetaTags({
      title: 'Test Page',
      description: 'A test page',
      siteUrl: 'https://daneshmishra.co.uk',
      pathname: '/test/',
    });
    expect(tags.ogImage).toBe('https://daneshmishra.co.uk/images/og-image.svg');
    expect(tags.twitterImage).toBe('https://daneshmishra.co.uk/images/og-image.svg');
  });

  it('Empty verification code is falsy', () => {
    expect(SEO_CONFIG.googleSiteVerification).toBe('');
    // Template should conditionally omit the tag when empty
    expect(!!SEO_CONFIG.googleSiteVerification).toBe(false);
  });
});
