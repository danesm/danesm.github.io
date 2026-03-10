import { SEO_CONFIG } from './config';

export interface ArticleSchemaInput {
  title: string;
  description: string;
  datePublished: string;
  url: string;
  tags?: string[];
  authorName: string;
  authorUrl: string;
}

export function generatePersonSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Danesh Mishra',
    jobTitle: 'Senior Cloud Architect',
    worksFor: {
      '@type': 'Organization',
      name: 'Amazon Web Services (AWS)',
    },
    url: SEO_CONFIG.siteUrl,
    image: `${SEO_CONFIG.siteUrl}/images/og-image.svg`,
    description:
      'Senior Cloud Architect at AWS with 19+ years of experience in cloud architecture, serverless solutions, and modern web development.',
    sameAs: [
      'https://www.linkedin.com/in/daneshmishra',
      'https://github.com/danesm',
      'https://www.credly.com/users/danesh-mishra/badges',
    ],
    knowsAbout: [
      'AWS',
      'Cloud Architecture',
      'AppSync',
      'DynamoDB',
      'Lambda',
      'Terraform',
      'GraphQL',
      'React',
    ],
  };
}

export function generateArticleSchema(input: ArticleSchemaInput): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    url: input.url,
    author: {
      '@type': 'Person',
      name: input.authorName,
      url: input.authorUrl,
    },
  };

  if (input.tags && input.tags.length > 0) {
    schema.keywords = input.tags;
  }

  return schema;
}

function titleCase(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function generateBreadcrumbSchema(
  siteUrl: string,
  pathname: string,
  pageTitle: string,
): object {
  const segments = pathname
    .split('/')
    .filter((s) => s.length > 0);

  const items: Array<{ '@type': string; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
  ];

  for (let i = 0; i < segments.length; i++) {
    const isLast = i === segments.length - 1;
    const pathSoFar = '/' + segments.slice(0, i + 1).join('/') + '/';
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: isLast ? pageTitle : titleCase(segments[i]),
      item: `${siteUrl}${pathSoFar}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}
