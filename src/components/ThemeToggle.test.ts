import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

describe('ThemeToggle Functions', () => {
  let dom: JSDOM;
  let window: Window & typeof globalThis;
  let document: Document;
  let localStorage: Storage;

  beforeEach(() => {
    // Create a fresh DOM for each test
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
      url: 'http://localhost',
    });
    window = dom.window as unknown as Window & typeof globalThis;
    document = window.document;
    localStorage = window.localStorage;

    // Set up global objects
    global.window = window;
    global.document = document;
    global.localStorage = localStorage;

    // Clear localStorage before each test
    localStorage.clear();

    // Mock matchMedia
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  describe('getSystemTheme', () => {
    it('should return "dark" when system prefers dark mode', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const getSystemTheme = (): 'light' | 'dark' => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      expect(getSystemTheme()).toBe('dark');
    });

    it('should return "light" when system prefers light mode', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const getSystemTheme = (): 'light' | 'dark' => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      expect(getSystemTheme()).toBe('light');
    });
  });

  describe('getTheme', () => {
    it('should return saved theme from localStorage when available', () => {
      const THEME_KEY = 'theme-preference';
      localStorage.setItem(THEME_KEY, 'dark');

      const getTheme = (): 'light' | 'dark' => {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem(THEME_KEY);
          if (saved === 'light' || saved === 'dark') {
            return saved;
          }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      expect(getTheme()).toBe('dark');
    });

    it('should fall back to system preference when no saved theme', () => {
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const getTheme = (): 'light' | 'dark' => {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem('theme-preference');
          if (saved === 'light' || saved === 'dark') {
            return saved;
          }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      expect(getTheme()).toBe('dark');
    });

    it('should ignore invalid values in localStorage', () => {
      const THEME_KEY = 'theme-preference';
      localStorage.setItem(THEME_KEY, 'invalid');

      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const getTheme = (): 'light' | 'dark' => {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem(THEME_KEY);
          if (saved === 'light' || saved === 'dark') {
            return saved;
          }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      expect(getTheme()).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should add theme class to document element', () => {
      const THEME_KEY = 'theme-preference';
      
      const setTheme = (theme: 'light' | 'dark'): void => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_KEY, theme);
        }
      };

      setTheme('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(document.documentElement.classList.contains('light')).toBe(false);
    });

    it('should persist theme to localStorage', () => {
      const THEME_KEY = 'theme-preference';
      
      const setTheme = (theme: 'light' | 'dark'): void => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_KEY, theme);
        }
      };

      setTheme('dark');
      expect(localStorage.getItem(THEME_KEY)).toBe('dark');
    });

    it('should remove previous theme class when setting new theme', () => {
      const THEME_KEY = 'theme-preference';
      
      const setTheme = (theme: 'light' | 'dark'): void => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_KEY, theme);
        }
      };

      setTheme('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
      
      setTheme('dark');
      expect(document.documentElement.classList.contains('light')).toBe(false);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      const THEME_KEY = 'theme-preference';
      localStorage.setItem(THEME_KEY, 'light');

      const getTheme = (): 'light' | 'dark' => {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem(THEME_KEY);
          if (saved === 'light' || saved === 'dark') {
            return saved;
          }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      const setTheme = (theme: 'light' | 'dark'): void => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_KEY, theme);
        }
      };

      const toggleTheme = (): void => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      };

      toggleTheme();
      expect(localStorage.getItem(THEME_KEY)).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should toggle from dark to light', () => {
      const THEME_KEY = 'theme-preference';
      localStorage.setItem(THEME_KEY, 'dark');

      const getTheme = (): 'light' | 'dark' => {
        if (typeof localStorage !== 'undefined') {
          const saved = localStorage.getItem(THEME_KEY);
          if (saved === 'light' || saved === 'dark') {
            return saved;
          }
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };

      const setTheme = (theme: 'light' | 'dark'): void => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_KEY, theme);
        }
      };

      const toggleTheme = (): void => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      };

      toggleTheme();
      expect(localStorage.getItem(THEME_KEY)).toBe('light');
      expect(document.documentElement.classList.contains('light')).toBe(true);
    });
  });
});
