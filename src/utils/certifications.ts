import type { Certification } from '../data/certifications';

/**
 * Returns a curated list of certifications: sorted by issue date descending,
 * deduplicated by name (keeping the most recent), and limited to `limit` entries.
 */
export function getCuratedCertifications(
  certs: Certification[],
  limit: number = 10,
): Certification[] {
  const sorted = [...certs].sort((a, b) =>
    b.issueDate.localeCompare(a.issueDate),
  );
  const seen = new Set<string>();
  const deduped = sorted.filter((cert) => {
    if (seen.has(cert.name)) return false;
    seen.add(cert.name);
    return true;
  });
  return deduped.slice(0, limit);
}
