/**
 * Testimonials Data
 *
 * Real LinkedIn recommendations for the portfolio website.
 * Each testimonial includes a quote, author details, and source.
 */

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  authorImage?: string;
  date?: string;
  source?: 'linkedin' | 'direct' | 'project';
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote:
      'Very talented software developer. Very knowledgeable of the industry and software development. Every team has a go to guy, and this is one of them. Enjoyed working with Danesh for 2 years.',
    authorName: 'Tony McCann',
    authorRole: 'Principal Architect',
    company: 'Persistent',
    authorImage: '/images/tony.png',
    date: 'March 2016',
    source: 'linkedin',
  },
  {
    id: 'testimonial-2',
    quote:
      'Danesh was a joy to work with. His approach to any problem solving situation was very calm and determined. Danesh is a great team player, and just a great joy to be around. Add to that the fact that he was a very sought after techie, and you have a complete man for any job.',
    authorName: 'Vivek Singh',
    authorRole: 'Technical Delivery Lead | Agile (CSM) | Project Management',
    company: 'Lloyds',
    authorImage: '/images/vivek.png',
    date: 'December 2014',
    source: 'linkedin',
  },
  {
    id: 'testimonial-3',
    quote:
      'Danesh is a great team player, and just a great joy to be around.',
    authorName: 'Nitin Gupta',
    authorRole: 'Software Developer | 12+ Years Experience',
    company: 'Software Development',
    date: 'December 2014',
    source: 'linkedin',
  },
  {
    id: 'testimonial-4',
    quote:
      'Danesh has a combination of excellent technical depth, along with a strong focus on results, and an ability to integrate well into a client and multiple vendor environment. His ability to focus and drive solutions program wide rather than in specific modules kept him the core member of expert solution layer. His positive attitude helped team to learn and grow in niche skills in a very comfortable environment. I highly recommend him as a great asset to any technology program.',
    authorName: 'Vishal Saxena',
    authorRole: 'IBM FTM Payments Consultant | FinTech | Core Banking',
    company: 'Ex-IBM',
    date: 'September 2014',
    source: 'linkedin',
  },
  {
    id: 'testimonial-5',
    quote:
      'I worked with Danesh on the TBT SOC project for Lloyds Banking Group for a number of months. I found Danesh to be extremely hard-working, quick to learn, and very pleasant to work with. He would be an asset to any company.',
    authorName: 'Peter McGrath',
    authorRole: 'Solutions Architect',
    company: 'IBM',
    date: 'September 2014',
    source: 'linkedin',
  },
  {
    id: 'testimonial-6',
    quote:
      'I have worked with Danesh on two Payment Hub implementations and Danesh has in that time expanded his existing expertise in Integration and WebSphere Message Broker to also become an expert in the Financial Transaction Manager Product proficient in both Design and Development.',
    authorName: 'Jan Junkers',
    authorRole: 'Enterprise Architect',
    company: 'DNB',
    authorImage: '/images/jan.png',
    date: 'September 2014',
    source: 'linkedin',
  },
  {
    id: 'testimonial-7',
    quote:
      "I've worked with Danesh for around 2 years. He is a very soft spoken person who hardly loses control of things assigned. His integrity and interest in helping and understanding his team is second to none. In difficult situations, when it matters most, he remains focused and committed to his vision and responsibilities. Danesh is quick learner and picked up various roles quickly. I would be happy to work with him again.",
    authorName: 'Rajeev Jain',
    authorRole: 'Principal Director Agentic AI & LLMOps | Multi-Cloud Architect',
    company: 'Enterprise Solutions',
    authorImage: '/images/RajeevJ.png',
    date: 'October 2011',
    source: 'linkedin',
  },
  {
    id: 'testimonial-8',
    quote:
      'He is a go getter profile. Given a problem statement, he comes up with a solution. I still remember the need for a Hibernate expert in the project. Danesh had some knowledge. He took up the challenge and built up the expertise required for the project.',
    authorName: 'Amit H',
    authorRole: 'Architect',
    company: 'Technology',
    date: 'May 2011',
    source: 'linkedin',
  },
  {
    id: 'testimonial-9',
    quote:
      'Danesh is an exceptionally talented professional. Everyone knows him as a cheerful person who easily moves along with everyone. He has a never give up attitude and is eager to help his colleagues. He has grown in his stature with his hardwork and dedication. Even with such an abundance of technical skill he is a down to earth person to whom people can reach out easily.',
    authorName: 'Pawan Kumar Shetty K.',
    authorRole: 'Senior Consultant - Application Development',
    company: 'Technology Consulting',
    date: 'April 2011',
    source: 'linkedin',
  },
];
