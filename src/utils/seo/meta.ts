import { SEO_CONFIG } from './config';

export interface MetaTagInput {
  title: string;
  description: string;
  siteUrl: string;
  pathname: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
}

export interface MetaTags {
  title: string;
  description: string;
  canonicalURL: string;
  ogType: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

/**
 * Generates a formatted page title.
 * - Empty title → default site title
 * - "Home" → default site title (no separator)
 * - Otherwise → "pageTitle | siteName"
 */
export function generateTitle(pageTitle: string, siteName: string): string {
  if (!pageTitle || pageTitle === 'Home') {
    return SEO_CONFIG.defaultTitle;
  }
  return `${pageTitle} | ${siteName}`;
}

/**
 * Generates a canonical URL from a base site URL and pathname.
 * Prepends `/` to pathname if missing.
 */
export function generateCanonicalURL(siteUrl: string, pathname: string): string {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${siteUrl.replace(/\/+$/, '')}${normalizedPath}`;
}

/**
 * Generates a complete MetaTags object from page input data.
 */
export function generateMetaTags(input: MetaTagInput): MetaTags {
  const title = generateTitle(input.title, SEO_CONFIG.siteName);
  const canonicalURL = generateCanonicalURL(input.siteUrl, input.pathname);
  const ogImage = input.ogImage || `${input.siteUrl.replace(/\/+$/, '')}${SEO_CONFIG.defaultOgImage}`;

  return {
    title,
    description: input.description,
    canonicalURL,
    ogType: input.ogType || 'website',
    ogUrl: canonicalURL,
    ogTitle: title,
    ogDescription: input.description,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: input.description,
    twitterImage: ogImage,
  };
}
