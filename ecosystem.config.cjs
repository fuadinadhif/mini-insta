module.exports = {
  apps: [
    {
      namespace: 'Mini Insta',
      name: 'web',
      script: 'turbo serve',
      cwd: './apps/web',
      watch: '.',
    },
    {
      namespace: 'Mini Insta',
      name: 'api',
      script: 'turbo serve',
      cwd: './apps/api',
      watch: '.',
    },
  ],
};
