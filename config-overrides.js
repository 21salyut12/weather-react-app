const path = require('path');

module.exports = function override(config, env) {
  // Add the SVG rule to handle SVG imports using svgr/webpack
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
    include: path.resolve(__dirname, 'src'),
  });

  return config;
};