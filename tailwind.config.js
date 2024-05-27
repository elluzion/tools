/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Geist"', '"Roboto"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        'text-main': 'var(--color-text-main)',
        'text-muted': 'var(--color-text-muted)',
        background: 'var(--color-background)',
        'elevation-1': 'var(--color-elevation-1)',
        'elevation-2': 'var(--color-elevation-2)',
        'elevation-3': 'var(--color-elevation-3)',
        'primary-action': 'var(--color-primary-action)',
        'on-primary-action': 'var(--color-on-primary-action)',
        'secondary-action': 'var(--color-secondary-action)',
        'on-secondary-action': 'var(--color-on-secondary-action)',
        warning: 'var(--color-warning)',
        'on-warning': 'var(--color-on-warning)',
        border: 'var(--color-border)',
        ring: 'var(--color-ring)',
      },
    },
  },
  plugins: [],
};
