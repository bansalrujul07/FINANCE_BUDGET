export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        surface2: '#0B1220',
        surface3: '#0A0F1C',
        border: 'rgba(255,255,255,0.05)',
        primary: '#3B82F6',
        success: '#22C55E',
        danger: '#EF4444',
        text: '#E5E7EB',
        textMuted: '#9CA3AF',
      },
      boxShadow: {
        soft: '0 28px 80px rgba(15, 23, 42, 0.25)',
        glow: '0 28px 80px rgba(59, 130, 246, 0.18)',
      },
      backgroundImage: {
        'fintech-gradient': 'linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)',
      },
      borderRadius: {
        xl2: '1.5rem',
      },
    },
  },
  plugins: [],
};
