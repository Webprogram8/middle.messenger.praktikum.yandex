module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    'postcss-import': {},
    cssnano: env === 'production' ? {} : false,
  },
});
