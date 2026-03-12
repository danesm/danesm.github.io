/**
 * fast-check Generators for Data Models
 *
 * Provides arbitraries for Skill, Project, and Certification types
 * used in property-based testing across the portfolio site.
 */
import fc from 'fast-check';
import type { Skill, SkillCategory, SkillsData } from '../data/skills';

import type { Certification } from '../data/certifications';
import type { Testimonial } from '../data/testimonials';
import type { CareerEntry } from '../data/career';
import type { SocialLink } from '../data/professional';

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** Generates a non-empty trimmed string (1-80 chars). */
export const nonEmptyString = (): fc.Arbitrary<string> =>
  fc
    .string({ minLength: 1, maxLength: 80, unit: 'grapheme' })
    .map((s) => {
      const trimmed = s.trim();
      return trimmed.length > 0 ? trimmed : 'placeholder';
    });

/** Generates a date string in YYYY-MM-DD format. */
export const dateString = (): fc.Arbitrary<string> =>
  fc
    .tuple(
      fc.integer({ min: 2000, max: 2030 }),
      fc.integer({ min: 1, max: 12 }),
      fc.integer({ min: 1, max: 28 }),
    )
    .map(([y, m, d]) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`);

/** Generates an optional HTTPS URL. */
export const optionalUrl = (): fc.Arbitrary<string | undefined> =>
  fc.option(
    fc.webUrl({ withFragments: false, withQueryParameters: false }),
    { nil: undefined },
  );

// ---------------------------------------------------------------------------
// Skill generators
// ---------------------------------------------------------------------------

const proficiencyArb = fc.constantFrom<'expert' | 'advanced' | 'intermediate'>(
  'expert',
  'advanced',
  'intermediate',
);

export const skillArb = (): fc.Arbitrary<Skill> =>
  fc.record({
    name: nonEmptyString(),
    proficiency: fc.option(proficiencyArb, { nil: undefined }),
    icon: fc.option(nonEmptyString(), { nil: undefined }),
  });

export const skillCategoryArb = (): fc.Arbitrary<SkillCategory> =>
  fc.record({
    name: nonEmptyString(),
    skills: fc.array(skillArb(), { minLength: 1, maxLength: 10 }),
  });

export const skillsDataArb = (): fc.Arbitrary<SkillsData> =>
  fc.record({
    categories: fc.array(skillCategoryArb(), { minLength: 1, maxLength: 6 }),
  });


// ---------------------------------------------------------------------------
// Project generators
// ---------------------------------------------------------------------------

export type ProjectFrontmatter = {
  title: string;
  description: string;
  technologies: string[];
  category: 'cloud' | 'web' | 'mobile' | 'data' | 'other';
  featured: boolean;
  startDate: string;
  endDate?: string;
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
};

const projectCategoryArb = fc.constantFrom<
  'cloud' | 'web' | 'mobile' | 'data' | 'other'
>('cloud', 'web', 'mobile', 'data', 'other');

export const projectArb = (): fc.Arbitrary<ProjectFrontmatter> =>
  fc.record({
    title: nonEmptyString(),
    description: nonEmptyString(),
    technologies: fc.array(nonEmptyString(), { minLength: 1, maxLength: 8 }),
    category: projectCategoryArb,
    featured: fc.boolean(),
    liveUrl: optionalUrl(),
    repoUrl: optionalUrl(),
    imageUrl: optionalUrl(),
    startDate: dateString(),
    endDate: fc.option(dateString(), { nil: undefined }),
  });

// ---------------------------------------------------------------------------
// Certification generators
// ---------------------------------------------------------------------------

export const certificationArb = (): fc.Arbitrary<Certification> =>
  fc.record({
    name: nonEmptyString(),
    issuer: nonEmptyString(),
    issueDate: dateString(),
    expiryDate: fc.option(dateString(), { nil: undefined }),
    credentialId: fc.option(nonEmptyString(), { nil: undefined }),
    verificationUrl: optionalUrl(),
    badgeImageUrl: optionalUrl(),
  });


// ---------------------------------------------------------------------------
// Testimonial generators
// ---------------------------------------------------------------------------

export const testimonialArb = (): fc.Arbitrary<Testimonial> =>
  fc.record({
    id: nonEmptyString(),
    quote: nonEmptyString(),
    authorName: nonEmptyString(),
    authorRole: nonEmptyString(),
    company: nonEmptyString(),
    source: fc.option(
      fc.constantFrom<'linkedin' | 'direct' | 'project'>('linkedin', 'direct', 'project'),
      { nil: undefined },
    ),
  });

// ---------------------------------------------------------------------------
// Career entry generators
// ---------------------------------------------------------------------------

export const careerEntryArb = (): fc.Arbitrary<CareerEntry> =>
  fc.record({
    id: nonEmptyString(),
    role: nonEmptyString(),
    company: nonEmptyString(),
    location: nonEmptyString(),
    startDate: dateString(),
    endDate: fc.option(dateString(), { nil: undefined }),
    description: nonEmptyString(),
  });

// ---------------------------------------------------------------------------
// Social link generators
// ---------------------------------------------------------------------------

export const socialLinkArb = (): fc.Arbitrary<SocialLink> =>
  fc.record({
    platform: fc.constantFrom<'linkedin' | 'github' | 'twitter' | 'youtube'>(
      'linkedin', 'github', 'twitter', 'youtube',
    ),
    url: fc.webUrl({ withFragments: false, withQueryParameters: false }),
    username: nonEmptyString(),
  });

// ---------------------------------------------------------------------------
// SEO generators
// ---------------------------------------------------------------------------

import type { MetaTagInput } from '../utils/seo/meta';

/** Generates valid URL pathnames like `/blog/my-post/` */
export const pathnameArb = (): fc.Arbitrary<string> =>
  fc
    .array(
      fc.stringMatching(/^[a-z0-9][a-z0-9-]{0,19}$/),
      { minLength: 0, maxLength: 4 },
    )
    .map((segments) => {
      if (segments.length === 0) return '/';
      return `/${segments.join('/')}/`;
    });

/** Generates MetaTagInput objects for property-based testing. */
export const metaTagInputArb = (): fc.Arbitrary<MetaTagInput> =>
  fc.record({
    title: nonEmptyString(),
    description: nonEmptyString(),
    siteUrl: fc.constant('https://daneshmishra.co.uk'),
    pathname: pathnameArb(),
    ogImage: fc.option(
      fc.webUrl({ withFragments: false, withQueryParameters: false }),
      { nil: undefined },
    ),
    ogType: fc.option(
      fc.constantFrom<'website' | 'article'>('website', 'article'),
      { nil: undefined },
    ),
  });

// ---------------------------------------------------------------------------
// Structured Data generators
// ---------------------------------------------------------------------------

import type { ArticleSchemaInput } from '../utils/seo/structured-data';

/** Generates ArticleSchemaInput objects for property-based testing. */
export const articleSchemaInputArb = (): fc.Arbitrary<ArticleSchemaInput> =>
  fc.record({
    title: nonEmptyString(),
    description: nonEmptyString(),
    datePublished: dateString(),
    url: fc.constant('https://daneshmishra.co.uk').chain((base) =>
      pathnameArb().map((path) => `${base}${path}`),
    ),
    tags: fc.option(
      fc.array(nonEmptyString(), { minLength: 1, maxLength: 5 }),
      { nil: undefined },
    ),
    authorName: nonEmptyString(),
    authorUrl: fc.webUrl({ withFragments: false, withQueryParameters: false }),
  });

// ---------------------------------------------------------------------------
// Homepage modernization generators
// ---------------------------------------------------------------------------

/** Service type union for SVG icon testing. */
export type ServiceTypeGen = 'cloud' | 'ai-automation' | 'websites' | 'payments' | 'modernization' | 'chatbots' | 'security';

/** Generates a non-empty array of phrase strings for typewriter testing. */
export const phraseListArb = (): fc.Arbitrary<string[]> =>
  fc.array(nonEmptyString(), { minLength: 1, maxLength: 10 });

/** Generates a progress value in [0, 1] for easing function testing. */
export const progressArb = (): fc.Arbitrary<number> =>
  fc.double({ min: 0, max: 1, noNaN: true });

/** Generates a scroll position (non-negative integer) for parallax testing. */
export const scrollPositionArb = (): fc.Arbitrary<number> =>
  fc.integer({ min: 0, max: 10000 });

/** Generates a parallax factor in [0.2, 0.5] for parallax testing. */
export const parallaxFactorArb = (): fc.Arbitrary<number> =>
  fc.double({ min: 0.2, max: 0.5, noNaN: true });

/** Generates a service type for SVG icon testing. */
export const serviceTypeArb = (): fc.Arbitrary<ServiceTypeGen> =>
  fc.constantFrom<ServiceTypeGen>('cloud', 'ai-automation', 'websites', 'payments', 'modernization', 'chatbots', 'security');

/** Generates a counter target value (positive integer) for counter animation testing. */
export const counterTargetArb = (): fc.Arbitrary<number> =>
  fc.integer({ min: 1, max: 999 });
