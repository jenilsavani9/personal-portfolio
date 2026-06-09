/** Build-time config for the Tailwind standalone CLI. Not shipped to the browser. */
module.exports = {
  darkMode: ['class', '.dark-theme'],
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        code: 'var(--code-bg)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};
