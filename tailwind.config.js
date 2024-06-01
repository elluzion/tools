/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      sans: ['"Geist"', '"Roboto"', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'monospace'],
    },
    extend: {
      colors: {
        'main-text': 'rgb(var(--color-text-main) / <alpha-value>)',
        'muted-text': 'rgb(var(--color-text-muted) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        'elevation-1': 'rgb(var(--color-elevation-1) / <alpha-value>)',
        'elevation-2': 'rgb(var(--color-elevation-2) / <alpha-value>)',
        'elevation-3': 'rgb(var(--color-elevation-3) / <alpha-value>)',
        'primary-action': 'rgb(var(--color-primary-action) / <alpha-value>)',
        'on-primary-action': 'rgb(var(--color-on-primary-action) / <alpha-value>)',
        'secondary-action': 'rgb(var(--color-secondary-action) / <alpha-value>)',
        'on-secondary-action': 'rgb(var(--color-on-secondary-action) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        'on-warning': 'rgb(var(--color-on-warning) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        ring: 'rgb(var(--color-ring) / <alpha-value>)',

        // For shadcn
        input: 'rgb(var(--color-border) / <alpha-value>)',
        foreground: 'rgb(var(--color-text-main) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--color-primary-action) / <alpha-value>)',
          foreground: 'rgb(var(--color-on-primary-action) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary-action) / <alpha-value>)',
          foreground: 'rgb(var(--color-on-secondary-action) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--color-warning) / <alpha-value>)',
          foreground: 'rgb(var(--color-on-warning) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--color-elevation-3) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-muted) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-elevation-3) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-main) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'rgb(var(--color-elevation-2) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-main) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--color-elevation-1) / <alpha-value>)',
          foreground: 'rgb(var(--color-text-main) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        contentDvh: 'calc(100dvh - 64px)',
      },
      screens: {
        xs: '400px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
