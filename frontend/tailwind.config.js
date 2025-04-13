// Added comments to improve readability and maintainability
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS/TS files in the src folder for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FFD700',
          dark: '#B8860B',
          light: '#FFE55C',
          metallic: '#D4AF37',
          gradient: {
            start: '#FFD700',
            mid: '#DAA520',
            end: '#B8860B'
          }
        },
        black: {
          DEFAULT: '#000000',
          rich: '#0A0A0A',
          matte: '#1A1A1A',
          gradient: {
            start: '#000000',
            mid: '#1A1A1A',
            end: '#2A2A2A'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-metallic': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-gold': 'pulseGold 2s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      },
      boxShadow: {
        'gold': '0 4px 6px -1px rgba(255, 215, 0, 0.1), 0 2px 4px -1px rgba(255, 215, 0, 0.06)',
        'gold-lg': '0 10px 15px -3px rgba(255, 215, 0, 0.1), 0 4px 6px -2px rgba(255, 215, 0, 0.05)',
        'gold-inner': 'inset 0 2px 4px 0 rgba(255, 215, 0, 0.06)',
        'metallic': '0 4px 6px -1px rgba(212, 175, 55, 0.1), 0 2px 4px -1px rgba(212, 175, 55, 0.06)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      textColor: {
        'metallic': 'var(--metallic-text-color, #D4AF37)',
      },
    },
  },
  plugins: [
    function({ addUtilities, theme }) {
      addUtilities({
        '.metallic-text': {
          'background': 'linear-gradient(to right, #FFD700, #B8860B)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
          'text-shadow': '0 0 1px rgba(212, 175, 55, 0.3)',
        },
        '.input': {
          'background-color': theme('colors.black.matte'),
          'border': '1px solid',
          'border-color': theme('colors.gold.DEFAULT', '#FFD700'),
          'border-opacity': '0.3',
          'color': theme('colors.gold.DEFAULT', '#FFD700'),
          'padding': '0.5rem 1rem',
          'border-radius': '0.375rem',
          'transition': 'all 0.3s ease-in-out',
          '&:focus': {
            'border-opacity': '1',
            'outline': 'none',
            'ring': '2px',
            'ring-color': theme('colors.gold.DEFAULT', '#FFD700'),
            'ring-opacity': '0.5',
          },
        },
        '.btn': {
          'padding': '0.5rem 1rem',
          'border-radius': '0.375rem',
          'transition': 'all 0.3s ease-in-out',
          'font-weight': '500',
        },
        '.btn-primary': {
          'background-color': theme('colors.gold.DEFAULT', '#FFD700'),
          'color': theme('colors.black.rich', '#0A0A0A'),
          '&:hover': {
            'background-color': theme('colors.gold.dark', '#B8860B'),
          },
        },
      })
    }
  ],
};
