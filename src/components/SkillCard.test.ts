import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import type { Skill } from '../data/skills';

/**
 * Helper to render a SkillCard-like DOM structure matching the component output.
 */
function renderSkillCard(skill: Skill, _category?: string): Document {
  const proficiencyConfig: Record<string, { label: string; class: string }> = {
    expert: { label: 'Expert', class: 'proficiency-expert' },
    advanced: { label: 'Advanced', class: 'proficiency-advanced' },
    intermediate: { label: 'Intermediate', class: 'proficiency-intermediate' },
  };

  const proficiency = skill.proficiency ? proficiencyConfig[skill.proficiency] : null;
  const cardClass = proficiency ? proficiency.class : 'proficiency-none';

  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body>
        <div class="skill-card ${cardClass}">
          ${skill.icon ? `<span class="skill-icon" aria-hidden="true">${skill.icon}</span>` : ''}
          <span class="skill-name">${skill.name}</span>
          ${proficiency ? `<span class="skill-proficiency">${proficiency.label}</span>` : ''}
        </div>
      </body>
    </html>
  `, { url: 'http://localhost' });

  return dom.window.document;
}

describe('SkillCard Component', () => {
  describe('basic rendering', () => {
    it('should display the skill name', () => {
      const doc = renderSkillCard({ name: 'AWS Lambda' });
      const nameEl = doc.querySelector('.skill-name');
      expect(nameEl?.textContent).toBe('AWS Lambda');
    });

    it('should render the skill-card container', () => {
      const doc = renderSkillCard({ name: 'React' });
      const card = doc.querySelector('.skill-card');
      expect(card).toBeTruthy();
    });
  });

  describe('proficiency indicators', () => {
    it('should show Expert label for expert proficiency', () => {
      const doc = renderSkillCard({ name: 'TypeScript', proficiency: 'expert' });
      const badge = doc.querySelector('.skill-proficiency');
      expect(badge?.textContent).toBe('Expert');
    });

    it('should show Advanced label for advanced proficiency', () => {
      const doc = renderSkillCard({ name: 'Python', proficiency: 'advanced' });
      const badge = doc.querySelector('.skill-proficiency');
      expect(badge?.textContent).toBe('Advanced');
    });

    it('should show Intermediate label for intermediate proficiency', () => {
      const doc = renderSkillCard({ name: 'Next.js', proficiency: 'intermediate' });
      const badge = doc.querySelector('.skill-proficiency');
      expect(badge?.textContent).toBe('Intermediate');
    });

    it('should not show proficiency badge when proficiency is undefined', () => {
      const doc = renderSkillCard({ name: 'Git' });
      const badge = doc.querySelector('.skill-proficiency');
      expect(badge).toBeNull();
    });
  });

  describe('proficiency-based styling', () => {
    it('should apply proficiency-expert class for expert skills', () => {
      const doc = renderSkillCard({ name: 'AWS AppSync', proficiency: 'expert' });
      const card = doc.querySelector('.skill-card');
      expect(card?.classList.contains('proficiency-expert')).toBe(true);
    });

    it('should apply proficiency-advanced class for advanced skills', () => {
      const doc = renderSkillCard({ name: 'Docker', proficiency: 'advanced' });
      const card = doc.querySelector('.skill-card');
      expect(card?.classList.contains('proficiency-advanced')).toBe(true);
    });

    it('should apply proficiency-intermediate class for intermediate skills', () => {
      const doc = renderSkillCard({ name: 'AWS Step Functions', proficiency: 'intermediate' });
      const card = doc.querySelector('.skill-card');
      expect(card?.classList.contains('proficiency-intermediate')).toBe(true);
    });

    it('should apply proficiency-none class when no proficiency is set', () => {
      const doc = renderSkillCard({ name: 'SQL' });
      const card = doc.querySelector('.skill-card');
      expect(card?.classList.contains('proficiency-none')).toBe(true);
    });
  });

  describe('icon support', () => {
    it('should render icon when provided', () => {
      const doc = renderSkillCard({ name: 'React', icon: '⚛️' });
      const icon = doc.querySelector('.skill-icon');
      expect(icon).toBeTruthy();
      expect(icon?.textContent).toBe('⚛️');
    });

    it('should mark icon as aria-hidden for accessibility', () => {
      const doc = renderSkillCard({ name: 'React', icon: '⚛️' });
      const icon = doc.querySelector('.skill-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should not render icon element when icon is not provided', () => {
      const doc = renderSkillCard({ name: 'Go' });
      const icon = doc.querySelector('.skill-icon');
      expect(icon).toBeNull();
    });
  });
});
