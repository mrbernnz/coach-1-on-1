const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@coaches': path.resolve(__dirname, 'src/coaches'),
      '@students': path.resolve(__dirname, 'src/students'),
      '@calendar': path.resolve(__dirname, 'src/calendar')
    }
  }
};
