/**
 * Certifications Data
 * 
 * Contains all certifications with Credly badge IDs for official embed rendering.
 * Auto-populated from Credly profile: https://www.credly.com/users/danesh-mishra/badges
 */

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeImageUrl?: string;
  credlyBadgeId?: string;
}

export const certifications: Certification[] = [
  {
    name: 'AWS AI Foundational (L100)',
    issuer: 'AWS Worldwide Field Enablement',
    issueDate: '2025-12-03',
    expiryDate: '2026-12-03',
    credlyBadgeId: '03010fea-2a88-4998-8ca6-05321d6d9a43'
  },
  {
    name: 'AWS Certified Machine Learning Engineer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2025-08-25',
    expiryDate: '2028-08-25',
    credlyBadgeId: '3e46d594-18a8-4802-96ba-990710cd195b'
  },
  {
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2025-02-12',
    expiryDate: '2028-08-25',
    credlyBadgeId: '4390549b-9d7d-4685-8e3e-6b138a5fda23'
  },
  {
    name: 'AWS Certified AI Practitioner Early Adopter',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2025-02-12',
    credlyBadgeId: 'de91aafe-d94e-4ba3-9fbb-19b2ea2bc66f'
  },
  {
    name: 'AWS Knowledge: Events and Workflows - Training Badge',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2024-08-06',
    credlyBadgeId: '3ebc1b9d-57a5-4b4c-9a3f-5d48e9dc6c32'
  },
  {
    name: 'AWS Partner: Generative AI Essentials - Training Badge',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2024-01-23',
    credlyBadgeId: 'f6441708-5ca0-47ad-8309-3d51d849ed5b'
  },
  {
    name: 'AWS Certified DevOps Engineer – Professional',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2023-05-13',
    expiryDate: '2026-05-13',
    credlyBadgeId: '46e4d986-af50-4dcf-90f7-e71b61adf698'
  },
  {
    name: 'AWS Knowledge: Serverless - Training Badge',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2023-05-08',
    credlyBadgeId: '69b4e9d2-277b-4fc0-a4f4-6151f2843374'
  },
  {
    name: 'AWS Certified Solutions Architect – Professional',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2022-11-14',
    expiryDate: '2025-11-14',
    credlyBadgeId: '80f24604-7495-4308-83fa-9a3a0d64b7c6'
  },
  {
    name: 'AWS Certified SysOps Administrator – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2021-01-12',
    expiryDate: '2026-05-13',
    credlyBadgeId: '545c5e8c-aef5-4287-aa91-5d0d88c44ad5'
  },
  {
    name: 'IBM Consultant Profession Certification - Experienced',
    issuer: 'IBM',
    issueDate: '2020-09-23',
    credlyBadgeId: 'eb567fe2-715c-4e0a-9792-fc0e7b1ad824'
  },
  {
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2020-08-07',
    expiryDate: '2026-05-13',
    credlyBadgeId: 'ec0c6f52-34ef-447d-9728-ac3cedc52403'
  },
  {
    name: 'IBM Quantum Conversations',
    issuer: 'IBM',
    issueDate: '2020-01-10',
    credlyBadgeId: '7f673689-3fc8-44b3-9372-6c661a419a8b'
  },
  {
    name: 'IBM Consulting - Core Experienced',
    issuer: 'IBM',
    issueDate: '2019-12-09',
    credlyBadgeId: '613bb814-0804-49e0-a5b6-7e9bfca74cde'
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services Training and Certification',
    issueDate: '2019-11-29',
    expiryDate: '2025-11-14',
    credlyBadgeId: '70ec50b7-0000-4717-91f0-4bf483b39f68'
  },
  {
    name: 'IBM Intellectual Capital/ Intellectual Property Creator',
    issuer: 'IBM',
    issueDate: '2019-06-13',
    credlyBadgeId: 'b07851e2-b184-4a59-8871-73c08f50a1c5'
  },
  {
    name: 'Architectural Thinking',
    issuer: 'IBM',
    issueDate: '2019-01-22',
    credlyBadgeId: '29a5837d-00f6-42cf-9366-1e5c5ea86762'
  },
  {
    name: 'IBM AI Skills Academy Deep Learning Explorer',
    issuer: 'IBM',
    issueDate: '2018-12-21',
    credlyBadgeId: 'cd727b18-8477-4cf2-8ff1-bc65e62314f0'
  },
  {
    name: 'IBM Intellectual Capital/ Intellectual Property Creator',
    issuer: 'IBM',
    issueDate: '2018-12-03',
    credlyBadgeId: '7ad7029c-000d-4208-84a6-3a5d577572d7'
  },
  {
    name: 'IBM Mentor',
    issuer: 'IBM',
    issueDate: '2018-06-29',
    credlyBadgeId: '5f231c8a-bf92-4b32-b18e-0dde4d1ba268'
  },
  {
    name: 'IBM Mentor',
    issuer: 'IBM',
    issueDate: '2018-06-20',
    credlyBadgeId: 'e0b6670e-e218-4ff2-86c0-3a918f7f3be2'
  },
  {
    name: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM',
    issueDate: '2018-06-17',
    credlyBadgeId: '49120d50-b3c1-4d35-be13-2efaaceb1439'
  },
  {
    name: 'Banking Insights and Solutions (Silver)',
    issuer: 'IBM',
    issueDate: '2018-06-03',
    credlyBadgeId: 'f66d235c-8023-432a-90b7-a5a7149875c4'
  },
  {
    name: 'IBM Cloud Essentials',
    issuer: 'IBM',
    issueDate: '2018-04-25',
    credlyBadgeId: '3a0ad74d-c6eb-47ce-84fb-b47c46bb310e'
  },
  {
    name: 'IBM Blockchain Essentials',
    issuer: 'IBM',
    issueDate: '2017-11-05',
    credlyBadgeId: '1cea2243-d2bb-4070-a8b2-c5f442d6e5a3'
  },
  {
    name: 'Banking Industry Jumpstart',
    issuer: 'IBM',
    issueDate: '2017-11-02',
    credlyBadgeId: 'e8c42b4a-cdee-4b05-8ff2-e6dd465858bb'
  },
  {
    name: 'Wipro FTM Academy Certified IBM FTM Architect',
    issuer: 'Wipro',
    issueDate: '2013-11-01',
    badgeImageUrl: '/images/wipro_new_logo.svg'
  },
  {
    name: 'Wipro FTM Academy Certified IBM FTM Solution Designer and Developer',
    issuer: 'Wipro',
    issueDate: '2013-11-01',
    badgeImageUrl: '/images/wipro_new_logo.svg'
  },
  {
    name: 'IELTS Band Score 7',
    issuer: 'Anglia Ruskin University, Cambridge, UK',
    issueDate: '2012-12-01',
    badgeImageUrl: '/images/IELTS.jpg'
  },
  {
    name: 'Wipro Certified Integration Architect (ACE 5.1)',
    issuer: 'Wipro',
    issueDate: '2012-10-01',
    badgeImageUrl: '/images/wipro_new_logo.svg'
  },
  {
    name: 'ITIL v3 Foundation',
    issuer: 'ITIL',
    issueDate: '2012-07-01',
    badgeImageUrl: '/images/ITILv3.png'
  },
  {
    name: 'IBM Certified SOA Solution Designer',
    issuer: 'IBM',
    issueDate: '2012-06-01',
    badgeImageUrl: '/images/IBM-WebSphere.png'
  },
  {
    name: 'IBM Certified WebSphere Integration Developer v6.0.1',
    issuer: 'IBM',
    issueDate: '2007-02-01',
    badgeImageUrl: '/images/IBM-WebSphere.png'
  },
  {
    name: 'Sun Certified Java Programmer (SCJP) v1.4',
    issuer: 'Sun Microsystems',
    issueDate: '2007-01-01',
    badgeImageUrl: '/images/SCJP.png'
  }
];
