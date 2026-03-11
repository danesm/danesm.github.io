/**
 * Property-Based Tests for Data Model Generators
 *
 * Validates that generated data models conform to their type contracts
 * and that the actual site data satisfies structural invariants.
 */
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { assertProperty, PBT_CONFIG } from './property-helpers';
import {
  skillArb,
  skillCategoryArb,
  projectArb,
  certificationArb,
} from './generators';
import { skillsData } from '../data/skills';

import { certifications } from '../data/certifications';

// ---------------------------------------------------------------------------
// Generator shape validation
// ---------------------------------------------------------------------------

describe('Skill generator', () => {
  it('always produces a non-empty name', () => {
    assertProperty(
      fc.property(skillArb(), (skill) => {
        expect(skill.name.trim().length).toBeGreaterThan(0);
      }),
    );
  });

  it('proficiency is one of the allowed values or undefined', () => {
    const allowed = new Set(['expert', 'advanced', 'intermediate', undefined]);
    assertProperty(
      fc.property(skillArb(), (skill) => {
        expect(allowed.has(skill.proficiency)).toBe(true);
      }),
    );
  });
});

describe('Project generator', () => {
  it('always has at least one technology', () => {
    assertProperty(
      fc.property(projectArb(), (project) => {
        expect(project.technologies.length).toBeGreaterThanOrEqual(1);
      }),
    );
  });

  it('category is one of the allowed values', () => {
    const allowed = new Set(['cloud', 'web', 'mobile', 'data', 'other']);
    assertProperty(
      fc.property(projectArb(), (project) => {
        expect(allowed.has(project.category)).toBe(true);
      }),
    );
  });
});

describe('Certification generator', () => {
  it('always produces a non-empty name and issuer', () => {
    assertProperty(
      fc.property(certificationArb(), (cert) => {
        expect(cert.name.trim().length).toBeGreaterThan(0);
        expect(cert.issuer.trim().length).toBeGreaterThan(0);
      }),
    );
  });

  it('issueDate is a valid YYYY-MM-DD string', () => {
    assertProperty(
      fc.property(certificationArb(), (cert) => {
        expect(cert.issueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }),
    );
  });
});


// ---------------------------------------------------------------------------
// Actual site data structural invariants
// ---------------------------------------------------------------------------

describe('Site data invariants', () => {
  it('every skill category has at least one skill', () => {
    for (const category of skillsData.categories) {
      expect(category.skills.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('every certification has a non-empty name, issuer, and issueDate', () => {
    for (const cert of certifications) {
      expect(cert.name.trim().length).toBeGreaterThan(0);
      expect(cert.issuer.trim().length).toBeGreaterThan(0);
      expect(cert.issueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('Cloud & AWS Services category appears first in skills', () => {
    expect(skillsData.categories[0].name).toContain('Cloud');
  });
});
