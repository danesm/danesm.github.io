#!/usr/bin/env node
/**
 * Build-time validation script
 *
 * Validates all data files for required fields and checks that local
 * image references exist on disk. Exit code 1 on any error so the
 * build pipeline fails fast with clear messages.
 *
 * Usage:  npx tsx scripts/validate.ts
 */

import { resolve } from 'node:path';
import { professionalInfo } from '../src/data/professional';
import { certifications } from '../src/data/certifications';
import { skillsData } from '../src/data/skills';
import { projects } from '../src/data/projects';
import { validateAll, formatErrors } from '../src/utils/validateData';

const publicDir = resolve(import.meta.dirname ?? '.', '..', 'public');

const errors = validateAll({
  professionalInfo,
  certifications,
  skillsData,
  projects,
  publicDir,
});

if (errors.length > 0) {
  console.error('\n❌ Data validation failed:\n');
  console.error(formatErrors(errors));
  console.error(`\n${errors.length} error(s) found. Fix the issues above and try again.\n`);
  process.exit(1);
} else {
  console.log('✅ All data files validated successfully.');
}
