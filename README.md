# Danesh Mishra - Portfolio Website

Modern portfolio website built with [Astro](https://astro.build), TypeScript, and Tailwind CSS. Deployed to GitHub Pages via GitHub Actions.

Live site: [danesm.github.io](https://danesm.github.io)

## Development Setup

### Prerequisites

- Node.js 20+
- npm

### Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:4321)
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Commands

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm run dev`          | Start local dev server at `localhost:4321`        |
| `npm run build`        | Validate data, type-check, and build to `./dist/` |
| `npm run validate`     | Run data validation only                         |
| `npm test`             | Run unit and property-based tests                |
| `npm run test:watch`   | Run tests in watch mode                          |
| `npm run test:coverage`| Run tests with coverage report                   |
| `npm run preview`      | Preview production build locally                 |

## Updating Content

All content is managed through TypeScript data files in `src/data/`. Type safety ensures you don't miss required fields.

### Update Professional Information

Edit `src/data/professional.ts`:

```typescript
export const professionalInfo: ProfessionalInfo = {
  name: 'Danesh Mishra',
  title: 'Senior Cloud Architect',       // Update job title here
  employer: 'Amazon Web Services (AWS)',  // Update employer here
  yearsExperience: 19,                   // Update years of experience
  location: 'Seattle, WA',
  bio: `Your professional bio here...`,
  socialLinks: [
    { platform: 'linkedin', url: 'https://...', username: '...' },
    { platform: 'github', url: 'https://...', username: '...' },
  ]
};
```

### Add a New Project

Edit `src/data/projects.ts` and add an entry to the `projects` array:

```typescript
{
  id: 'my-new-project',           // Unique identifier (kebab-case)
  title: 'My New Project',
  description: 'Short description for the card view.',
  longDescription: 'Optional longer description.',
  technologies: ['TypeScript', 'AWS Lambda', 'DynamoDB'],
  category: 'cloud',              // 'cloud' | 'web' | 'mobile' | 'data' | 'other'
  featured: true,                 // Featured projects appear prominently
  liveUrl: 'https://...',         // Optional: link to live demo
  repoUrl: 'https://github.com/...', // Optional: link to source code
  imageUrl: '/images/project.png',   // Optional: project thumbnail
  startDate: '2024',
}
```

### Add a New Certification

Edit `src/data/certifications.ts` and add an entry to the `certifications` array:

```typescript
{
  name: 'AWS Certified Solutions Architect - Professional',
  issuer: 'Amazon Web Services (AWS)',
  issueDate: '2024-01-15',           // YYYY-MM-DD format
  expiryDate: '2027-01-15',          // Optional
  credentialId: 'ABC123',            // Optional
  verificationUrl: 'https://www.credly.com/badges/...', // Optional
  badgeImageUrl: 'https://images.credly.com/...',       // Optional
}
```

### Update Skills

Edit `src/data/skills.ts`. Skills are organized by category:

```typescript
{
  name: 'Cloud',
  skills: [
    { name: 'AWS Lambda', proficiency: 'expert' },
    { name: 'DynamoDB', proficiency: 'advanced' },
    // Add new skills here
  ]
}
```

Proficiency levels: `'expert'`, `'advanced'`, `'intermediate'`

Categories appear in array order — keep Cloud/AWS first to match the site's emphasis.

## Deployment

### Automatic Deployment

The site deploys automatically when you push to the `main` branch:

1. Push changes to `main`
2. GitHub Actions runs tests and builds the site
3. Build output is deployed to GitHub Pages

The workflow is defined in `.github/workflows/deploy.yml`.

### Build Pipeline

The build command (`npm run build`) runs three steps in sequence:

1. `tsx scripts/validate.ts` — Validates all data files have required fields
2. `astro check` — TypeScript type checking for Astro components
3. `astro build` — Generates optimized static HTML/CSS/JS in `./dist/`

If any step fails, the build stops with a descriptive error message.

### Manual Deployment

You can also trigger a deployment manually from the GitHub Actions tab using the "Run workflow" button.

## Project Structure

```
src/
├── components/          # Reusable Astro components
│   ├── Header.astro     # Navigation with theme toggle
│   ├── Footer.astro     # Social links and copyright
│   ├── ThemeToggle.astro # Dark/light mode switch
│   ├── SkillCard.astro  # Individual skill display
│   ├── ProjectCard.astro # Project card with links
│   ├── Badge.astro      # Certification badge display
│   └── ScrollToTop.astro # Scroll-to-top button
├── data/                # Content data files (edit these!)
│   ├── professional.ts  # Name, title, employer, bio
│   ├── skills.ts        # Skills by category
│   ├── projects.ts      # Project portfolio
│   └── certifications.ts # AWS certifications
├── layouts/
│   └── BaseLayout.astro # HTML shell, SEO, theme init
├── pages/
│   ├── index.astro      # Homepage
│   └── projects.astro   # Projects page with filtering
├── styles/
│   └── global.css       # Global styles and Tailwind layers
└── utils/               # Validation and utility functions
```

## Features

- Built with Astro for zero-JS-by-default static output
- Tailwind CSS with dark mode (`class` strategy)
- System theme detection with localStorage persistence
- Responsive design (320px–2560px)
- `prefers-reduced-motion` respected on all animations
- SEO: Open Graph, Twitter Cards, JSON-LD, sitemap
- Privacy-focused analytics (Cloudflare Web Analytics, no cookies)
- WCAG AA color contrast in both themes
- Keyboard navigable with visible focus indicators
- Data validation at build time with clear error messages

## License

© 2026 Danesh Mishra. All rights reserved.
