/**
 * Build-time Data Validation
 *
 * Validates required fields in data files and checks that image paths
 * referenced in data actually exist on disk. Designed to run as part
 * of the build pipeline so broken references are caught early.
 *
 * Validates: Requirements 13.5
 */

import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Certification } from '../data/certifications';
import type { ProfessionalInfo } from '../data/professional';
import type { SkillsData } from '../data/skills';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ValidationError {
  file: string;
  field: string;
  message: string;
}

// ---------------------------------------------------------------------------
// Field validators
// ---------------------------------------------------------------------------

function requireString(
  value: unknown,
  file: string,
  field: string,
  errors: ValidationError[],
): void {
  if (typeof value !== 'string' || value.trim().length === 0) {
    errors.push({ file, field, message: `Required string field "${field}" is missing or empty` });
  }
}

function requireNumber(
  value: unknown,
  file: string,
  field: string,
  errors: ValidationError[],
): void {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    errors.push({ file, field, message: `Required number field "${field}" is missing or invalid` });
  }
}


function requireArray(
  value: unknown,
  file: string,
  field: string,
  errors: ValidationError[],
  minLength = 1,
): void {
  if (!Array.isArray(value) || value.length < minLength) {
    errors.push({
      file,
      field,
      message: `Required array field "${field}" is missing or has fewer than ${minLength} item(s)`,
    });
  }
}

// ---------------------------------------------------------------------------
// Image path validation
// ---------------------------------------------------------------------------

/**
 * Checks whether a local image path exists relative to the public/ directory.
 * External URLs (http/https) are skipped — only local paths are validated.
 */
export function validateImagePath(
  imagePath: string,
  file: string,
  field: string,
  publicDir: string,
  errors: ValidationError[],
): void {
  if (!imagePath || imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return; // external URLs are not validated on disk
  }
  const resolved = resolve(publicDir, imagePath.replace(/^\//, ''));
  if (!existsSync(resolved)) {
    errors.push({
      file,
      field,
      message: `Image path "${imagePath}" does not exist in public/ directory (resolved: ${resolved})`,
    });
  }
}

// ---------------------------------------------------------------------------
// Data-specific validators
// ---------------------------------------------------------------------------

export function validateProfessionalInfo(
  info: ProfessionalInfo,
  errors: ValidationError[],
): void {
  const file = 'src/data/professional.ts';
  requireString(info.name, file, 'name', errors);
  requireString(info.title, file, 'title', errors);
  requireString(info.employer, file, 'employer', errors);
  requireNumber(info.yearsExperience, file, 'yearsExperience', errors);
  requireString(info.location, file, 'location', errors);
  requireString(info.bio, file, 'bio', errors);
  requireArray(info.socialLinks, file, 'socialLinks', errors);

  for (const link of info.socialLinks ?? []) {
    requireString(link.platform, file, `socialLinks[].platform`, errors);
    requireString(link.url, file, `socialLinks[].url`, errors);
    requireString(link.username, file, `socialLinks[].username`, errors);
  }
}

export function validateCertifications(
  certs: Certification[],
  publicDir: string,
  errors: ValidationError[],
): void {
  const file = 'src/data/certifications.ts';
  if (!Array.isArray(certs) || certs.length === 0) {
    errors.push({ file, field: 'certifications', message: 'Certifications array is empty' });
    return;
  }

  certs.forEach((cert, i) => {
    const prefix = `certifications[${i}]`;
    requireString(cert.name, file, `${prefix}.name`, errors);
    requireString(cert.issuer, file, `${prefix}.issuer`, errors);
    requireString(cert.issueDate, file, `${prefix}.issueDate`, errors);

    if (cert.badgeImageUrl) {
      validateImagePath(cert.badgeImageUrl, file, `${prefix}.badgeImageUrl`, publicDir, errors);
    }
  });
}

export function validateSkillsData(
  data: SkillsData,
  errors: ValidationError[],
): void {
  const file = 'src/data/skills.ts';
  requireArray(data.categories, file, 'categories', errors);

  (data.categories ?? []).forEach((cat, ci) => {
    const prefix = `categories[${ci}]`;
    requireString(cat.name, file, `${prefix}.name`, errors);
    requireArray(cat.skills, file, `${prefix}.skills`, errors);

    (cat.skills ?? []).forEach((skill, si) => {
      requireString(skill.name, file, `${prefix}.skills[${si}].name`, errors);
    });
  });
}


// ---------------------------------------------------------------------------
// Aggregate runner
// ---------------------------------------------------------------------------

export interface ValidateAllOptions {
  professionalInfo: ProfessionalInfo;
  certifications: Certification[];
  skillsData: SkillsData;
  publicDir: string;
}

/**
 * Runs every validator and returns the collected errors.
 * An empty array means all data is valid.
 */
export function validateAll(opts: ValidateAllOptions): ValidationError[] {
  const errors: ValidationError[] = [];
  validateProfessionalInfo(opts.professionalInfo, errors);
  validateCertifications(opts.certifications, opts.publicDir, errors);
  validateSkillsData(opts.skillsData, errors);
  return errors;
}

/**
 * Formats validation errors into human-readable strings.
 */
export function formatErrors(errors: ValidationError[]): string {
  return errors
    .map((e) => `  ✗ ${e.file} → ${e.field}: ${e.message}`)
    .join('\n');
}
