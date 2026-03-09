/**
 * fast-check Generators for Data Models
 *
 * Provides arbitraries for Skill, Project, and Certification types
 * used in property-based testing across the portfolio site.
 */
import fc from 'fast-check';
import type { Skill, SkillCategory, SkillsData } from '../data/skills';
import type { Project } from '../data/projects';
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

const projectCategoryArb = fc.constantFrom<
  'cloud' | 'web' | 'mobile' | 'data' | 'other'
>('cloud', 'web', 'mobile', 'data', 'other');

export const projectArb = (): fc.Arbitrary<Project> =>
  fc.record({
    id: fc.string({ minLength: 1, maxLength: 30 }).filter((s) => /^[a-z0-9-]+$/.test(s)),
    title: nonEmptyString(),
    description: nonEmptyString(),
    longDescription: fc.option(nonEmptyString(), { nil: undefined }),
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
