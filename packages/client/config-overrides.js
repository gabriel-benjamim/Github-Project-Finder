const { override, useEslintRc } = require('customize-cra');
const path = require('path');

module.exports = override(useEslintRc('./.eslintrc.json'));
