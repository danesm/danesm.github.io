import { describe, test, expect } from 'vitest';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  validateProfessionalInfo,
  validateCertifications,
  validateSkillsData,
  validateImagePath,
  validateAll,
  formatErrors,
  type ValidationError,
} from './validateData';
import type { ProfessionalInfo } from '../data/professional';
import type { Certification } from '../data/certifications';
import type { SkillsData } from '../data/skills';

// Use the real public dir for image path tests
const currentDir = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(currentDir, '..', '..', 'public');

// ---------------------------------------------------------------------------
// Helpers – minimal valid objects
// ---------------------------------------------------------------------------

function validProfessionalInfo(): ProfessionalInfo {
  return {
    name: 'Test User',
    title: 'Engineer',
    employer: 'Acme',
    yearsExperience: 5,
    location: 'Seattle',
    bio: 'A short bio.',
    socialLinks: [{ platform: 'github', url: 'https://github.com/test', username: 'test' }],
  };
}

function validCertification(): Certification {
  return {
    name: 'AWS SAA',
    issuer: 'AWS',
    issueDate: '2024-01-01',
  };
}

function validSkillsData(): SkillsData {
  return {
    categories: [
      { name: 'Cloud', skills: [{ name: 'AWS Lambda' }] },
    ],
  };
}



// ---------------------------------------------------------------------------
// Professional Info
// ---------------------------------------------------------------------------

describe('validateProfessionalInfo', () => {
  test('valid data produces no errors', () => {
    const errors: ValidationError[] = [];
    validateProfessionalInfo(validProfessionalInfo(), errors);
    expect(errors).toHaveLength(0);
  });

  test('missing name produces an error', () => {
    const errors: ValidationError[] = [];
    const info = { ...validProfessionalInfo(), name: '' };
    validateProfessionalInfo(info, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].field).toBe('name');
  });

  test('missing employer produces an error', () => {
    const errors: ValidationError[] = [];
    const info = { ...validProfessionalInfo(), employer: '' };
    validateProfessionalInfo(info, errors);
    expect(errors.some((e) => e.field === 'employer')).toBe(true);
  });

  test('invalid yearsExperience produces an error', () => {
    const errors: ValidationError[] = [];
    const info = { ...validProfessionalInfo(), yearsExperience: NaN };
    validateProfessionalInfo(info, errors);
    expect(errors.some((e) => e.field === 'yearsExperience')).toBe(true);
  });

  test('empty socialLinks produces an error', () => {
    const errors: ValidationError[] = [];
    const info = { ...validProfessionalInfo(), socialLinks: [] };
    validateProfessionalInfo(info, errors);
    expect(errors.some((e) => e.field === 'socialLinks')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Certifications
// ---------------------------------------------------------------------------

describe('validateCertifications', () => {
  test('valid certifications produce no errors', () => {
    const errors: ValidationError[] = [];
    validateCertifications([validCertification()], publicDir, errors);
    expect(errors).toHaveLength(0);
  });

  test('empty array produces an error', () => {
    const errors: ValidationError[] = [];
    validateCertifications([], publicDir, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].message).toContain('empty');
  });

  test('missing name produces an error', () => {
    const errors: ValidationError[] = [];
    const cert = { ...validCertification(), name: '' };
    validateCertifications([cert], publicDir, errors);
    expect(errors.some((e) => e.field.includes('name'))).toBe(true);
  });

  test('missing issueDate produces an error', () => {
    const errors: ValidationError[] = [];
    const cert = { ...validCertification(), issueDate: '' };
    validateCertifications([cert], publicDir, errors);
    expect(errors.some((e) => e.field.includes('issueDate'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

describe('validateSkillsData', () => {
  test('valid skills produce no errors', () => {
    const errors: ValidationError[] = [];
    validateSkillsData(validSkillsData(), errors);
    expect(errors).toHaveLength(0);
  });

  test('empty categories produces an error', () => {
    const errors: ValidationError[] = [];
    validateSkillsData({ categories: [] }, errors);
    expect(errors.length).toBeGreaterThan(0);
  });

  test('category with empty skills produces an error', () => {
    const errors: ValidationError[] = [];
    validateSkillsData({ categories: [{ name: 'Empty', skills: [] }] }, errors);
    expect(errors.some((e) => e.field.includes('skills'))).toBe(true);
  });

  test('skill with empty name produces an error', () => {
    const errors: ValidationError[] = [];
    validateSkillsData({ categories: [{ name: 'Cat', skills: [{ name: '' }] }] }, errors);
    expect(errors.some((e) => e.message.includes('missing or empty'))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Image path validation
// ---------------------------------------------------------------------------

describe('validateImagePath', () => {
  test('external https URL is skipped', () => {
    const errors: ValidationError[] = [];
    validateImagePath('https://example.com/img.png', 'test.ts', 'img', publicDir, errors);
    expect(errors).toHaveLength(0);
  });

  test('external http URL is skipped', () => {
    const errors: ValidationError[] = [];
    validateImagePath('http://example.com/img.png', 'test.ts', 'img', publicDir, errors);
    expect(errors).toHaveLength(0);
  });

  test('existing local path produces no error', () => {
    const errors: ValidationError[] = [];
    validateImagePath('/robots.txt', 'test.ts', 'img', publicDir, errors);
    expect(errors).toHaveLength(0);
  });

  test('missing local path produces an error', () => {
    const errors: ValidationError[] = [];
    validateImagePath('/images/nonexistent.png', 'test.ts', 'img', publicDir, errors);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].message).toContain('does not exist');
  });
});

// ---------------------------------------------------------------------------
// validateAll integration
// ---------------------------------------------------------------------------

describe('validateAll', () => {
  test('all valid data returns no errors', () => {
    const errors = validateAll({
      professionalInfo: validProfessionalInfo(),
      certifications: [validCertification()],
      skillsData: validSkillsData(),
      publicDir,
    });
    expect(errors).toHaveLength(0);
  });

  test('multiple invalid fields accumulate errors', () => {
    const errors = validateAll({
      professionalInfo: { ...validProfessionalInfo(), name: '', employer: '' },
      certifications: [],
      skillsData: { categories: [] },
      publicDir,
    });
    expect(errors.length).toBeGreaterThanOrEqual(4);
  });
});

// ---------------------------------------------------------------------------
// formatErrors
// ---------------------------------------------------------------------------

describe('formatErrors', () => {
  test('formats errors with file, field, and message', () => {
    const output = formatErrors([
      { file: 'src/data/test.ts', field: 'name', message: 'is missing' },
    ]);
    expect(output).toContain('src/data/test.ts');
    expect(output).toContain('name');
    expect(output).toContain('is missing');
  });

  test('returns empty string for no errors', () => {
    expect(formatErrors([])).toBe('');
  });
});
