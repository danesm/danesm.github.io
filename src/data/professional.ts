/**
 * Professional Information Data
 * 
 * Contains current professional details, bio, and social links
 * for the portfolio website.
 */

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'youtube';
  url: string;
  username: string;
}

export interface ProfessionalInfo {
  name: string;
  title: string;
  employer: string;
  yearsExperience: number;
  location: string;
  bio: string;
  socialLinks: SocialLink[];
}

export const professionalInfo: ProfessionalInfo = {
  name: 'Danesh Mishra',
  title: 'Senior Cloud Architect',
  employer: 'Amazon Web Services (AWS)',
  yearsExperience: 19,
  location: 'Seattle, WA',
  bio: `Senior Cloud Architect at AWS, helping enterprise clients design and deliver scalable cloud and AI-powered solutions.
Combines deep technical expertise with a modern, AI-augmented development approach to ship high-quality software faster.
With global experience spanning the UK, Europe, USA, and Asia, I thrive on turning complex technical challenges into elegant, production-ready architectures for organizations of all sizes.`,
  socialLinks: [
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/daneshwar',
      username: 'daneshwar'
    },
    {
      platform: 'github',
      url: 'https://github.com/danesm',
      username: 'danesm'
    },
    {
      platform: 'twitter',
      url: 'https://x.com/dmishra2017',
      username: 'dmishra2017'
    }
  ]
};
