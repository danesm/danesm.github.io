/**
 * Career Timeline Data
 *
 * Professional experience entries for the portfolio website.
 * Entries are stored in reverse chronological order (most recent first).
 */

export interface CareerEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export const careerEntries: CareerEntry[] = [
  {
    id: 'aws',
    role: 'Sr Cloud Architect',
    company: 'Amazon Web Services (AWS)',
    location: 'Greater London, UK',
    startDate: 'Oct 2020',
    description:
      'Leading cloud architecture engagements for enterprise customers. Progressed from Global Migrations Architect through Cloud Application Architect to Sr Cloud Architect. Designing scalable cloud-native solutions, driving application modernisation, and delivering large-scale migration strategies.',
  },
  {
    id: 'ibm',
    role: 'Application Architect (Payments Integration, Cloud Migration)',
    company: 'IBM',
    location: 'London, UK',
    startDate: 'May 2018',
    endDate: 'Sep 2020',
    description:
      'Cloud-native application development using Java 8, SpringBoot, and Red Hat Fuse. Modernised government systems on AWS and designed REST APIs using OpenAPI. Led large-scale cloud migration for Lloyds Banking Group — UK Payments and Commercial application migration.',
  },
  {
    id: 'cognizant',
    role: 'Integration Architect',
    company: 'Cognizant Technology Solutions',
    location: 'London, UK',
    startDate: 'Dec 2014',
    endDate: 'May 2015',
    description:
      'Delivered integration architecture for a major UK retail brand.',
  },
  {
    id: 'wipro',
    role: 'Sr Software Engineer',
    company: 'Wipro Limited',
    location: 'India, Japan and UK',
    startDate: 'Jan 2006',
    endDate: 'Dec 2014',
    description:
      'Nine years spanning payments integration for a major UK bank (IBM FTM, IIB, MQ, z/OS), developer and SRE for a leading UK insurer on the IBM WebSphere stack, and early-career Java and integration development across India, Japan, and the UK.',
  },
  {
    id: '3i-infotech',
    role: 'Java Developer',
    company: '3i Infotech (DataCons)',
    location: 'Mumbai, India',
    startDate: 'Jul 2005',
    endDate: 'Dec 2005',
    description:
      'Banking product developer. Built services using Servlets/JSP, XSLT, WebSphere Application Server, Oracle DB, and Oracle FLEXCUBE Banking product.',
  },
];
