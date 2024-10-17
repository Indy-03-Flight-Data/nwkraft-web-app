/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Add Autoprefixer to ensure cross-browser compatibility
  },
};

export default config;
