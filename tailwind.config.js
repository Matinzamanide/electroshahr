// tailwind.config.js
module.exports = {
    // ... سایر تنظیمات
    plugins: [],
    theme: {
      extend: {
        animation: {
          'fade-in': 'fadeIn 0.3s ease-out',
          'fade-in-up': 'fadeInUp 0.3s ease-out',
          'slide-down': 'slideDown 0.4s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          fadeInUp: {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          slideDown: {
            '0%': { transform: 'translateY(-100%)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
      },
    },
  };