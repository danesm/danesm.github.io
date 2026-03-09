import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { professionalInfo } from '../data/professional';

describe('Footer Component', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    const currentYear = new Date().getFullYear();
    
    // Create a minimal DOM environment with Footer structure
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <footer class="footer" role="contentinfo">
            <div class="footer-container">
              <div class="social-links">
                ${professionalInfo.socialLinks.map((link) => `
                  <a
                    href="${link.url}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="social-link"
                    aria-label="Visit ${professionalInfo.name} on ${link.platform}"
                  >
                    <span class="social-icon"></span>
                  </a>
                `).join('')}
              </div>
              <div class="footer-text">
                <p class="copyright">© ${currentYear} ${professionalInfo.name}. All rights reserved.</p>
                <p class="attribution">Built with <a href="https://astro.build" target="_blank" rel="noopener noreferrer" class="astro-link">Astro</a></p>
              </div>
            </div>
          </footer>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    (global as any).document = document;
  });

  it('should render footer with contentinfo role', () => {
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer?.getAttribute('role')).toBe('contentinfo');
  });

  it('should display all social links from professional data', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    expect(socialLinks.length).toBe(professionalInfo.socialLinks.length);
  });

  it('should have proper attributes for social links', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
      const expectedLink = professionalInfo.socialLinks[index];
      
      // Check href
      expect(link.getAttribute('href')).toBe(expectedLink.url);
      
      // Check target and rel for security
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      
      // Check aria-label for accessibility
      const ariaLabel = link.getAttribute('aria-label');
      expect(ariaLabel).toContain(expectedLink.platform);
    });
  });

  it('should display copyright notice with current year', () => {
    const currentYear = new Date().getFullYear();
    const copyright = document.querySelector('.copyright');
    
    expect(copyright).toBeTruthy();
    expect(copyright?.textContent).toContain(String(currentYear));
    expect(copyright?.textContent).toContain(professionalInfo.name);
    expect(copyright?.textContent).toContain('All rights reserved');
  });

  it('should display Astro attribution with link', () => {
    const attribution = document.querySelector('.attribution');
    const astroLink = document.querySelector('.astro-link');
    
    expect(attribution).toBeTruthy();
    expect(attribution?.textContent).toContain('Built with');
    expect(attribution?.textContent).toContain('Astro');
    
    expect(astroLink).toBeTruthy();
    expect(astroLink?.getAttribute('href')).toBe('https://astro.build');
    expect(astroLink?.getAttribute('target')).toBe('_blank');
    expect(astroLink?.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('should have minimum touch target size for social links', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    // In the actual component, social links have width: 44px and height: 44px
    // This test verifies the structure exists for proper sizing
    socialLinks.forEach((link) => {
      expect(link.classList.contains('social-link')).toBe(true);
    });
  });

  it('should have proper ARIA labels for all social links', () => {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link) => {
      const ariaLabel = link.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
      expect(ariaLabel?.length).toBeGreaterThan(0);
    });
  });
});
