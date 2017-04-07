'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/* -----------------------------------------------------------------------------
 * middleware
 * -------------------------------------------------------------------------- */

module.exports = (neutrino, options = {}) => {
  // We want to start from a clean slate. This removes any existing "style"
  // rule that may exist (present if using the default neutrino-preset-web).
  neutrino.config.module.rules.delete('style')

  const styleRule = neutrino.config.module
    .rule('style')
    .test(options.test || /\.css$/)

  const loaders = ExtractTextPlugin.extract({
    fallback: options.fallback || 'style-loader',
    use: options.use || 'css-loader'
  })

  loaders.forEach(({ loader, options }) => styleRule.use(loader)
    .loader(loader)
    .options(options)
  )

  neutrino.config.plugin('extract')
    .use(ExtractTextPlugin, [options.filename || '[name].css'])
}
