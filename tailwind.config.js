/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5A3D',
          light: '#5A8A6F',
          dark: '#1F3E2A'
        },
        secondary: {
          DEFAULT: '#5A8A6F',
          light: '#8FBC8F',
          dark: '#4A7A5F'
        },
        accent: '#8FBC8F',
        surface: {
          50: '#FAFBFA',
          100: '#F5F7F5',
          200: '#E8EBE8',
          300: '#D3D8D3',
          400: '#B8C2B8',
          500: '#9DAD9D',
          600: '#829882',
          700: '#677367',
          800: '#4C5E4C',
          900: '#334933'
        },
        zen: {
          mist: '#F5F7F5',
          white: '#FAFBFA',
          sage: '#5A8A6F',
          forest: '#2D5A3D',
          mint: '#8FBC8F'
        }
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Quicksand', 'ui-sans-serif', 'system-ui'],
        handwritten: ['Caveat', 'cursive']
      },
      boxShadow: { 
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        zen: '0px 2px 4px rgba(45, 90, 61, 0.08), 0px 4px 8px rgba(45, 90, 61, 0.05), 0px 8px 16px rgba(45, 90, 61, 0.03)',
        float: '0 8px 32px rgba(45, 90, 61, 0.12)',
        neu-light: '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff',
        neu-dark: '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      },
      borderRadius: { xl: '0.75rem', '2xl': '1rem' },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'ripple': 'ripple 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'grow': 'grow 0.5s ease-out',
        'dissolve': 'dissolve 1s ease-out'
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        dissolve: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.2)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}