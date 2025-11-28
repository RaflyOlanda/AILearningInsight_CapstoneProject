export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
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
