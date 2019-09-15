if (process.env.NODE_ENV === 'production') {
  global.manifest = require('./dist/public/static/javascripts/manifest.json');
  require('./dist/ ');
} else {
  require('@babel/register');
  require('@babel/polyfill');
  require('./src/web/server');
}
