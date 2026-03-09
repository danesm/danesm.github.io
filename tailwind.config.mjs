/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    // Use Tailwind's default mobile-first breakpoints:
    // sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // ---------------------------------------------------------------
        // Semantic theme tokens – documents the colour pairs used across
        // the site. All pairs validated against WCAG AA in
        // src/utils/contrastValidation.ts
        //
        // LIGHT THEME (on #ffffff background)
        //   Text primary   #111827  – 15.39:1  (body, headings)
        //   Text secondary #374151  – 10.69:1  (sub-headings, buttons)
        //   Text tertiary  #4b5563  –  7.45:1  (hero title, tech tags)
        //   Text muted     #6b7280  –  4.83:1  (descriptions, dates)
        //   Accent         #2563eb  –  5.17:1  (links, active states)
        //   Accent hover   #1d4ed8  –  6.39:1  (link hover)
        //   Logo           #1e3a8a  – 10.26:1  (brand, large text)
        //
        // DARK THEME (on #111827 background)
        //   Text primary   #f9fafb  – 17.37:1  (body, headings)
        //   Text secondary #d1d5db  – 12.04:1  (nav links, buttons)
        //   Text muted     #9ca3af  –  6.99:1  (descriptions, dates)
        //   Accent         #60a5fa  –  6.81:1  (links)
        //   Accent light   #93c5fd  –  9.57:1  (logo, active nav)
        //   Accent lighter #bfdbfe  – 12.63:1  (link hover)
        // ---------------------------------------------------------------
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        // Mobile-optimized type scale (Task 9.3)
        'base': ['1rem', { lineHeight: '1.625' }],       // 16px body
        'lg': ['1.0625rem', { lineHeight: '1.75' }],     // 17px
        'xl': ['1.25rem', { lineHeight: '1.6' }],        // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],        // 24px - mobile h3
        '3xl': ['1.75rem', { lineHeight: '1.35' }],      // 28px - mobile h2
        '4xl': ['2.25rem', { lineHeight: '1.2' }],       // 36px - mobile h1
        '5xl': ['3rem', { lineHeight: '1.15' }],         // 48px - desktop h1
      },
      maxWidth: {
        'readable': '65ch',
      },
      minHeight: {
        'touch': '44px',  // Minimum touch target (Task 9.2)
      },
      minWidth: {
        'touch': '44px',  // Minimum touch target (Task 9.2)
      },
    },
  },
  plugins: [],
};
