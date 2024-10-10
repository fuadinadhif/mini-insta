const config = {
  '*.{ts,js,tsx,jsx}': [
    'eslint --report-unused-disable-directives --max-warnings 0',
    'prettier --write',
  ],
};

export default config;
