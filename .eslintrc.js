// https://eslint.org/docs/user-guide/configuring
// if you want to use this, you need install some package with npm:
//  - eslint
//  - eslint-config-standard
//  - eslint-plugin-html
//  - eslint-plugin-import
//  - eslint-plugin-node
//  - eslint-plugin-promise
//  - eslint-plugin-standard

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint files
  plugins: [
    'html'
  ],
  settings: {
    "html/html-extensions": [".html", ".weapp", ".vue"],  // consider .html and .weapp files as HTML
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    "no-underscore-dangle": 0
    // allow debugger during development
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    wx: false,
    getApp: false,
    App: false,
    getCurrentPages: false,
    Page: false,
    Component: false
  }
}