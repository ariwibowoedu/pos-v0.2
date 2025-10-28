/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "light-background": "#F9FAFB",
        "light-surface": "#FFFFFF",
        "light-overlay": "#F3F4F6",
        "light-text-primary": "#111827",
        "light-text-secondary": "#374151",
        "light-text-muted": "#9CA3AF",
        "light-primary": "#2563EB",
        "light-success": "#059669",
        "light-warning": "#D97706",
        "light-error": "#DC2626",
        "light-info": "#7C3AED",

        /* Dark Theme */
        "dark-background": "#0D1117",
        "dark-surface": "#161B22",
        "dark-overlay": "#1F2937",
        "dark-text-primary": "#F9FAFB",
        "dark-text-secondary": "#D1D5DB",
        "dark-text-muted": "#6B7280",
        "dark-primary": "#3B82F6",
        "dark-success": "#10B981",
        "dark-warning": "#F59E0B",
        "dark-error": "#EF4444",
        "dark-info": "#8B5CF6",
      },
      fontFamily: {
        inter: ["Inter Variable", "sans-serif"],
      }
    },
  },
  plugins: [],
}

