/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FFF8F2',
          light: '#FFFCFA',
          dark: '#F7EFE7',
        },
        blush: {
          DEFAULT: '#FBE6DE',
          deep: '#F6D3C7',
          soft: '#FDF0EB',
        },
        plum: {
          DEFAULT: '#5B2A4E',
          dark: '#431E39',
          light: '#844A74',
          subtle: '#F4ECF2',
        },
        sindoor: {
          DEFAULT: '#C8553D',
          dark: '#A9402B',
          light: '#DC6E57',
          subtle: '#FBEEEB',
        },
        sage: {
          DEFAULT: '#7A9E7E',
          light: '#DCE8DC',
          dark: '#587D5C',
          subtle: '#EEF4EF',
        },
        clay: {
          DEFAULT: '#EADCCB',
          light: '#F4ECE2',
          dark: '#D4C2AE',
        },
        ink: {
          DEFAULT: '#2B2230',
          muted: '#6E6072',
          subtle: '#9A8E9E',
        },
        emergency: {
          DEFAULT: '#B3261E',
          light: '#FCEBEA',
          dark: '#8C1D18',
        },
        haldi: {
          DEFAULT: '#E9B44C',
          subtle: '#FDF6E8',
        }
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'plum-sm': '0 2px 10px -1px rgba(91, 42, 78, 0.06)',
        'plum-md': '0 8px 24px -4px rgba(91, 42, 78, 0.09)',
        'plum-lg': '0 16px 36px -6px rgba(91, 42, 78, 0.12)',
        'sindoor': '0 6px 20px -2px rgba(200, 85, 61, 0.28)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'thread-flow': 'threadFlow 4s ease-in-out infinite',
      },
      keyframes: {
        threadFlow: {
          '0%, 100%': { strokeDashoffset: '0' },
          '50%': { strokeDashoffset: '30' },
        }
      }
    },
  },
  plugins: [],
}
