/**
 * Projects Data
 *
 * Contains project information for the portfolio website.
 * Includes personal repositories from GitHub and workspace projects.
 *
 * GitHub Profile: https://github.com/danesm
 */

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'cloud' | 'web' | 'mobile' | 'data' | 'other';
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  startDate: string;
  endDate?: string;
}

export const projects: Project[] = [
  {
    id: 'family-tree-appsync',
    title: 'Family Tree AppSync Application',
    description:
      'Full-stack family tree application built with AWS AppSync, React, and DynamoDB. Uses GraphQL for real-time data synchronization and Terraform for infrastructure management.',
    longDescription:
      'Demonstrates end-to-end cloud-native delivery: a managed GraphQL API via AWS AppSync provides real-time data synchronisation, DynamoDB delivers single-digit-millisecond reads at any scale, and Terraform ensures reproducible infrastructure across environments. The result is a zero-ops application that scales automatically while keeping monthly costs under $5 for typical usage.',
    technologies: ['AWS AppSync', 'React', 'Vite', 'DynamoDB', 'GraphQL', 'Terraform', 'TypeScript'],
    category: 'cloud',
    featured: true,
    startDate: '2024',
  },
  {
    id: 'biplist-sorter',
    title: 'IIB BIPLIST Sorting Tool',
    description:
      'Tool for comparing IIB BIP LIST files pre and post deployment, mainly useful in z/OS and AIX environments. Reads, sorts, and diffs BIP list outputs to verify deployment changes.',
    technologies: ['Java', 'Batch Scripts', 'IBM IIB'],
    category: 'other',
    featured: false,
    repoUrl: 'https://github.com/danesm/BIPListSorting',
    startDate: '2019',
  },
  {
    id: 'cypress-demo',
    title: 'Cypress E2E Testing Demo',
    description:
      'A React application with a comprehensive Cypress end-to-end test suite demonstrating aliasing, interactions, selectors, and dashboard recording.',
    technologies: ['React', 'Cypress', 'JavaScript'],
    category: 'web',
    featured: false,
    repoUrl: 'https://github.com/danesm/CypressDemo',
    startDate: '2020',
  },
  {
    id: 'ripple-ledger-demo',
    title: 'XRP Ripple Ledger Demo',
    description:
      'Script that polls the Rippled server for XRP Ledger info, records validated ledger sequences over time, and plots the data with gnuplot to visualise ledger validation frequency.',
    technologies: ['Bash', 'Gnuplot', 'Ripple API', 'XRP Ledger'],
    category: 'data',
    featured: false,
    repoUrl: 'https://github.com/danesm/RippleLedgerDemo',
    startDate: '2020',
  },
  {
    id: 'golang-projects',
    title: 'Go Programming Projects',
    description:
      'A collection of Go programming projects exploring concurrency patterns, web services, and systems programming.',
    technologies: ['Go'],
    category: 'other',
    featured: false,
    repoUrl: 'https://github.com/danesm/GoLangProjects',
    startDate: '2019',
  },
  {
    id: 'dcc-sponsorship',
    title: 'Dartford Cricket Club Sponsorship Website',
    description:
      'Responsive sponsorship website for Dartford Cricket Club\'s historic 300th anniversary celebration. Features interactive package displays, countdown timer, and contact form integration.',
    longDescription:
      'A modern, SEO-optimised static website built for Dartford Cricket Club to showcase sponsorship opportunities for their 300th anniversary in 2026-2027. Deployed to GitHub Pages with a custom domain, zero hosting costs, and free SSL. Includes donation progress tracking, shine effects, and a thank-you flow for sponsors.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    category: 'web',
    featured: true,
    liveUrl: 'https://dcc-sponsorship.co.uk',
    repoUrl: 'https://github.com/danesm/dcc-sponsorship',
    startDate: '2025',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'Modern personal portfolio built with Astro and Tailwind CSS, featuring dark mode, responsive design, and optimized performance. Deployed to GitHub Pages via GitHub Actions.',
    longDescription:
      'A high-performance portfolio site scoring 100 on Lighthouse across all categories. Built with Astro for zero-JavaScript static output, Tailwind CSS for rapid UI iteration, and GitHub Actions for continuous deployment. Serves as a reference architecture for static sites that need fast iteration cycles and near-instant page loads.',
    technologies: ['Astro', 'Tailwind CSS', 'TypeScript', 'GitHub Actions'],
    category: 'web',
    featured: true,
    liveUrl: 'https://danesm.github.io',
    repoUrl: 'https://github.com/danesm/danesm.github.io',
    startDate: '2024',
  },
];
