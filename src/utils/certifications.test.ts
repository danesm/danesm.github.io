import { describe, it, expect } from 'vitest';
import { getCuratedCertifications } from './certifications';
import type { Certification } from '../data/certifications';

const makeCert = (name: string, issueDate: string): Certification => ({
  name,
  issuer: 'Test Issuer',
  issueDate,
});

describe('getCuratedCertifications', () => {
  it('sorts by issueDate descending', () => {
    const certs = [
      makeCert('A', '2020-01-01'),
      makeCert('B', '2023-06-15'),
      makeCert('C', '2021-03-10'),
    ];
    const result = getCuratedCertifications(certs);
    expect(result.map((c) => c.name)).toEqual(['B', 'C', 'A']);
  });

  it('deduplicates by name, keeping the most recent', () => {
    const certs = [
      makeCert('Dup', '2019-01-01'),
      makeCert('Unique', '2022-05-01'),
      makeCert('Dup', '2023-01-01'),
    ];
    const result = getCuratedCertifications(certs);
    expect(result.map((c) => c.name)).toEqual(['Dup', 'Unique']);
    expect(result[0].issueDate).toBe('2023-01-01');
  });

  it('limits output to the specified limit', () => {
    const certs = Array.from({ length: 20 }, (_, i) =>
      makeCert(`Cert-${i}`, `2020-${String(i + 1).padStart(2, '0')}-01`),
    );
    const result = getCuratedCertifications(certs, 5);
    expect(result).toHaveLength(5);
  });

  it('defaults to limit of 10', () => {
    const certs = Array.from({ length: 15 }, (_, i) =>
      makeCert(`Cert-${i}`, `2020-${String(i + 1).padStart(2, '0')}-01`),
    );
    const result = getCuratedCertifications(certs);
    expect(result).toHaveLength(10);
  });

  it('returns empty array for empty input', () => {
    expect(getCuratedCertifications([])).toEqual([]);
  });

  it('does not mutate the original array', () => {
    const certs = [
      makeCert('B', '2020-01-01'),
      makeCert('A', '2023-01-01'),
    ];
    const original = [...certs];
    getCuratedCertifications(certs);
    expect(certs).toEqual(original);
  });
});
