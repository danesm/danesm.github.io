/**
 * Skills Data
 * 
 * Organized by category with proficiency indicators.
 * Prioritizes AWS and cloud-native technologies.
 */

export interface Skill {
  name: string;
  proficiency?: 'expert' | 'advanced' | 'intermediate';
  icon?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface SkillsData {
  categories: SkillCategory[];
}

export const skillsData: SkillsData = {
  categories: [
    {
      name: 'Cloud & AWS Services',
      skills: [
        { name: 'AWS AppSync', proficiency: 'expert' },
        { name: 'Amazon DynamoDB', proficiency: 'expert' },
        { name: 'AWS Lambda', proficiency: 'expert' },
        { name: 'Amazon S3', proficiency: 'expert' },
        { name: 'AWS CloudFormation', proficiency: 'advanced' },
        { name: 'Amazon API Gateway', proficiency: 'advanced' },
        { name: 'AWS IAM', proficiency: 'advanced' },
        { name: 'Amazon CloudWatch', proficiency: 'advanced' },
        { name: 'AWS Step Functions', proficiency: 'intermediate' },
        { name: 'Amazon EventBridge', proficiency: 'intermediate' },
      ]
    },
    {
      name: 'Infrastructure as Code',
      skills: [
        { name: 'Terraform', proficiency: 'expert' },
        { name: 'AWS CDK', proficiency: 'advanced' },
        { name: 'CloudFormation', proficiency: 'advanced' },
      ]
    },
    {
      name: 'Programming Languages',
      skills: [
        { name: 'TypeScript', proficiency: 'expert' },
        { name: 'JavaScript', proficiency: 'expert' },
        { name: 'Python', proficiency: 'advanced' },
        { name: 'Go', proficiency: 'advanced' },
        { name: 'Java', proficiency: 'advanced' },
      ]
    },
    {
      name: 'Frontend Frameworks & Tools',
      skills: [
        { name: 'React', proficiency: 'expert' },
        { name: 'Vite', proficiency: 'advanced' },
        { name: 'Astro', proficiency: 'advanced' },
        { name: 'Tailwind CSS', proficiency: 'advanced' },
        { name: 'Next.js', proficiency: 'intermediate' },
      ]
    },
    {
      name: 'APIs & Data',
      skills: [
        { name: 'GraphQL', proficiency: 'expert' },
        { name: 'REST APIs', proficiency: 'expert' },
        { name: 'NoSQL Databases', proficiency: 'expert' },
        { name: 'SQL', proficiency: 'advanced' },
      ]
    },
    {
      name: 'DevOps & Tools',
      skills: [
        { name: 'Git', proficiency: 'expert' },
        { name: 'GitHub Actions', proficiency: 'advanced' },
        { name: 'Docker', proficiency: 'advanced' },
        { name: 'CI/CD Pipelines', proficiency: 'advanced' },
        { name: 'AWS CLI', proficiency: 'advanced' },
      ]
    }
  ]
};
