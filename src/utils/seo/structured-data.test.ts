/**
 * Property-based and unit tests for the Structured Data Generator.
 *
 * Uses fast-check via the shared assertProperty helper.
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { assertProperty } from '../../test/property-helpers';
import { articleSchemaInputArb, pathnameArb, nonEmptyString } from '../../test/generators';
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from './structured-data';

// ===========================================================================
// Property-Based Tests
// ===========================================================================

describe('Structured Data Generator – Property Tests', () => {
  // -------------------------------------------------------------------------
  // Property 2: Article schema completeness
  // **Validates: Requirements 4.1, 4.2, 4.4**
  // -------------------------------------------------------------------------
  it('Property 2: Article schema completeness', () => {
    assertProperty(
      fc.property(articleSchemaInputArb(), (input) => {
        const schema = generateArticleSchema(input) as Record<string, unknown>;

        expect(schema['@context']).toBe('https://schema.org');
        expect(schema['@type']).toBe('Article');

        // Required fields must be present and non-empty
        expect(schema.headline).toBe(input.title);
        expect((schema.headline as string).length).toBeGreaterThan(0);

        expect(schema.description).toBe(input.description);
        expect((schema.description as string).length).toBeGreaterThan(0);

        expect(schema.datePublished).toBe(input.datePublished);
        expect((schema.datePublished as string).length).toBeGreaterThan(0);

        expect(schema.url).toBe(input.url);
        expect((schema.url as string).length).toBeGreaterThan(0);

        // Author must be a Person with non-empty values
        const author = schema.author as Record<string, unknown>;
        expect(author['@type']).toBe('Person');
        expect((author.name as string).length).toBeGreaterThan(0);
        expect((author.url as string).length).toBeGreaterThan(0);
      }),
    );
  });

  // -------------------------------------------------------------------------
  // Property 3: Article keywords from tags
  // **Validates: Requirements 4.3**
  // -------------------------------------------------------------------------
  it('Property 3: Article keywords from tags', () => {
    assertProperty(
      fc.property(
        articleSchemaInputArb().filter((input) => input.tags !== undefined && input.tags.length > 0),
        (input) => {
          const schema = generateArticleSchema(input) as Record<string, unknown>;

          expect(schema.keywords).toBeDefined();
          expect(schema.keywords).toEqual(input.tags);
        },
      ),
    );
  });

  // -------------------------------------------------------------------------
  // Property 4: Article JSON serialization round-trip
  // **Validates: Requirements 4.5**
  // -------------------------------------------------------------------------
  it('Property 4: Article JSON serialization round-trip', () => {
    assertProperty(
      fc.property(articleSchemaInputArb(), (input) => {
        const schema = generateArticleSchema(input);
        const serialized = JSON.stringify(schema);
        const deserialized = JSON.parse(serialized);

        expect(deserialized).toEqual(schema);
      }),
    );
  });

  // -------------------------------------------------------------------------
  // Property 5: BreadcrumbList structure invariants
  // **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
  // -------------------------------------------------------------------------
  it('Property 5: BreadcrumbList structure invariants', () => {
    const siteUrl = 'https://danesm.github.io';

    assertProperty(
      fc.property(pathnameArb(), nonEmptyString(), (pathname, pageTitle) => {
        const schema = generateBreadcrumbSchema(siteUrl, pathname, pageTitle) as Record<string, unknown>;
        const items = schema.itemListElement as Array<Record<string, unknown>>;

        // (a) @type must be BreadcrumbList
        expect(schema['@type']).toBe('BreadcrumbList');

        // (b) First item must be "Home" at position 1
        expect(items[0].name).toBe('Home');
        expect(items[0].position).toBe(1);

        // (c) Positions must be sequential starting from 1 with no gaps
        for (let i = 0; i < items.length; i++) {
          expect(items[i].position).toBe(i + 1);
        }

        // (d) Number of items = path depth + 1 (for Home)
        const segments = pathname.split('/').filter((s: string) => s.length > 0);
        expect(items.length).toBe(segments.length + 1);
      }),
    );
  });

  // -------------------------------------------------------------------------
  // Property 6: Breadcrumb path round-trip
  // **Validates: Requirements 5.5**
  // -------------------------------------------------------------------------
  it('Property 6: Breadcrumb path round-trip', () => {
    const siteUrl = 'https://danesm.github.io';

    assertProperty(
      fc.property(pathnameArb(), nonEmptyString(), (pathname, pageTitle) => {
        const schema = generateBreadcrumbSchema(siteUrl, pathname, pageTitle) as Record<string, unknown>;
        const items = schema.itemListElement as Array<Record<string, unknown>>;

        // Extract URL pathnames from each item
        const itemPaths = items.map((item) => new URL(item.item as string).pathname);

        // Each item's path should be a prefix of the next
        for (let i = 0; i < itemPaths.length - 1; i++) {
          expect(itemPaths[i + 1].startsWith(itemPaths[i]) || itemPaths[i] === '/').toBe(true);
        }

        // The last item's path should match the original pathname
        if (pathname === '/') {
          // Root: only Home item, its path is "/"
          expect(itemPaths[itemPaths.length - 1]).toBe('/');
        } else {
          expect(itemPaths[itemPaths.length - 1]).toBe(pathname);
        }
      }),
    );
  });
});

// ===========================================================================
// Unit Tests
// ===========================================================================

describe('Structured Data Generator – Unit Tests', () => {
  it('Root breadcrumb returns single Home item', () => {
    const schema = generateBreadcrumbSchema(
      'https://danesm.github.io',
      '/',
      'Home',
    ) as Record<string, unknown>;
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    expect(items).toHaveLength(1);
    expect(items[0].name).toBe('Home');
    expect(items[0].position).toBe(1);
    expect(items[0].item).toBe('https://danesm.github.io/');
  });

  it('Nested path breadcrumb includes intermediate sections', () => {
    const schema = generateBreadcrumbSchema(
      'https://danesm.github.io',
      '/blog/git-github-basics/',
      'Git & GitHub Basics',
    ) as Record<string, unknown>;
    const items = schema.itemListElement as Array<Record<string, unknown>>;

    expect(items).toHaveLength(3);
    expect(items[0]).toEqual({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://danesm.github.io/',
    });
    expect(items[1]).toEqual({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://danesm.github.io/blog/',
    });
    expect(items[2]).toEqual({
      '@type': 'ListItem',
      position: 3,
      name: 'Git & GitHub Basics',
      item: 'https://danesm.github.io/blog/git-github-basics/',
    });
  });

  it('Article with no tags omits keywords field', () => {
    const schema = generateArticleSchema({
      title: 'Test Post',
      description: 'A test blog post',
      datePublished: '2024-01-15',
      url: 'https://danesm.github.io/blog/test-post/',
      authorName: 'Danesh Mishra',
      authorUrl: 'https://danesm.github.io',
    }) as Record<string, unknown>;

    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Test Post');
    expect(schema.keywords).toBeUndefined();
  });
});
