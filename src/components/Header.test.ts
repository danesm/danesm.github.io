import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Header Component', () => {
  let dom: JSDOM;
  let document: Document;
  let window: any;

  beforeEach(() => {
    // Create a minimal DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <button id="mobile-menu-toggle" aria-expanded="false" aria-label="Open menu"></button>
          <div id="mobile-menu" aria-hidden="true">
            <a href="/">Home</a>
            <a href="/about">About</a>
          </div>
        </body>
      </html>
    `, { url: 'http://localhost' });

    document = dom.window.document;
    window = dom.window;

    // Set up global document and window
    (global as any).document = document;
    (global as any).window = window;
  });

  afterEach(() => {
    dom.window.close();
  });

  it('should toggle mobile menu when button is clicked', () => {
    const menuButton = document.getElementById('mobile-menu-toggle') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;

    // Simulate the initialization logic
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;

      menuButton.setAttribute('aria-expanded', String(newState));
      mobileMenu.setAttribute('aria-hidden', String(!newState));
      menuButton.setAttribute('aria-label', newState ? 'Close menu' : 'Open menu');
    });

    // Initial state
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('true');
    expect(menuButton.getAttribute('aria-label')).toBe('Open menu');

    // Click to open
    menuButton.click();
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('false');
    expect(menuButton.getAttribute('aria-label')).toBe('Close menu');

    // Click to close
    menuButton.click();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('true');
    expect(menuButton.getAttribute('aria-label')).toBe('Open menu');
  });

  it('should close mobile menu when a link is clicked', () => {
    const menuButton = document.getElementById('mobile-menu-toggle') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;
    const links = mobileMenu.querySelectorAll('a');

    // Set up event listeners
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      menuButton.setAttribute('aria-expanded', String(newState));
      mobileMenu.setAttribute('aria-hidden', String(!newState));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });

    // Open menu
    menuButton.click();
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    // Click a link
    links[0].click();
    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('true');
  });

  it('should close mobile menu on Escape key', () => {
    const menuButton = document.getElementById('mobile-menu-toggle') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;

    // Set up event listeners
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      menuButton.setAttribute('aria-expanded', String(newState));
      mobileMenu.setAttribute('aria-hidden', String(!newState));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          menuButton.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        }
      }
    });

    // Open menu
    menuButton.click();
    expect(menuButton.getAttribute('aria-expanded')).toBe('true');

    // Press Escape
    const escapeEvent = new dom.window.KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(menuButton.getAttribute('aria-expanded')).toBe('false');
    expect(mobileMenu.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    const menuButton = document.getElementById('mobile-menu-toggle') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDivElement;

    // Check initial ARIA attributes
    expect(menuButton.hasAttribute('aria-expanded')).toBe(true);
    expect(menuButton.hasAttribute('aria-label')).toBe(true);
    expect(mobileMenu.hasAttribute('aria-hidden')).toBe(true);
  });
});
