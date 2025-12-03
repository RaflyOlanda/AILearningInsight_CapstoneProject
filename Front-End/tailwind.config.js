// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // --- PENAMBAHAN ANIMASI STARBORDER DIMULAI DI SINI ---
      animation: {
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0.4' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0.4' },
        },
      },
      // --- PENAMBAHAN ANIMASI STARBORDER BERAKHIR DI SINI ---
      
      colors: {
        primary: '#5B9BD5',
        accent: '#FF4FA3',
        warning: '#F2C94C',
        success: '#22C55E',
        muted: '#F3F4F6',
        card: '#FFFFFF',
        border: '#E5E7EB',
        textMuted: '#6B7280'
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.04), 0 4px 10px rgba(0,0,0,0.04)'
      },
      fontFamily: {
        sans: ['Quicksand', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '14px'
      }
    }
  },
  plugins: []
}