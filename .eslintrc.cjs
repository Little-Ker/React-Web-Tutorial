module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": true,
    "commonjs": true
  },
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@public', 'public/'],
          ['@', './src'],
        ],
        extensions: ['.js', '.jsx']
      }
    }
  },
  plugins: [
    'react-refresh',
    'eslint-plugin-import',
    'react',
    'react-hooks',
  ],
  rules: {
    "no-restricted-exports": "off", // 不限制導出的使用
    'import/no-unresolved': 'off', // 關閉 import 檔案不存在提醒
    'no-unused-vars': [ // 有未使用變數提醒
      'warn',
      {
        vars: 'all',
        args: 'none',
      },
    ],
    'comma-dangle': [ // 是否允許掛尾逗號(最後一個元素後加上逗號)
      2,
      {
        arrays: 'always-multiline', // 多行數組總是需要逗號
        objects: 'always-multiline',
      },
    ],
    'semi': [ // 末尾是否使用分號
      2,
      'never',
    ],
    'react/jsx-filename-extension': [ // JSX 語法只能在特定檔案類型中使用
      2,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
    'linebreak-style': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-console': 'off',
    'arrow-parens': [
      2,
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-nested-ternary': 'off',
    'quote-props': [
      'error',
      'as-needed',
      {
        keywords: true,
        unnecessary: false,
      },
    ],
    'react/jsx-props-no-spreading': [
      2,
      {
        custom: 'ignore',
      },
    ],
    'react/jsx-curly-brace-presence': [0, 'ignore'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/forbid-prop-types': [
      2,
      {
        'forbid': [
          'any',
        ],
      },
    ],
    'react/destructuring-assignment': [0, 'always'],
    'import/no-cycle': [0, 'always'],
    'import/extensions': [
      'error',
      {
        'js': 'never',
        'jsx': 'never',
        'jpg': 'always',
        'png': 'always',
        'json': 'always',
        'css': 'always',
      },
    ],
    "react/no-unstable-nested-components": "off",
  },
}
