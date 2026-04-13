import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-app': '#0f1117',
        'bg-sidebar': '#161b22',
        'bg-card': '#1c2128',
        'bg-code': '#0d1117',
        'bg-hover': '#21262d',
        border: '#30363d',
        'text-primary': '#e6edf3',
        'text-secondary': '#8b949e',
        'text-muted': '#484f58',
        'accent-orange': '#FF9900',
        'accent-blue': '#4A9EFF',
        'accent-green': '#3fb950',
        'accent-purple': '#a78bfa',
        'accent-red': '#f85149',
        'accent-amber': '#f59e0b',
      },
    },
  },
  plugins: [],
};

export default config;
