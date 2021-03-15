module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 7
  },
  overrides: [
    {
      files: ['src/**/*.js'],
      env: {
        node: false,
        browser: true,
        es6: true
      },
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
