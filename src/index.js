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
  const { loaderOptions = {}, pluginOptions = {} } = options
  const styleRule = neutrino.config.module
    .rule('style')
    .test(loaderOptions.test || /\.css$/)

  const loaders = ExtractTextPlugin.extract({
    fallback: loaderOptions.fallback || 'style-loader',
    use: loaderOptions.use || 'css-loader'
  })

  // We want to start from a clean slate. This removes any existing "style"
  // rule that may exist (present if using the default neutrino-preset-web).
  neutrino.config.module.rules.delete('style')

  loaders.forEach(({ loader, options }) => styleRule.use(loader)
    .loader(loader)
    .options(options)
  )

  neutrino.config.plugin('extract')
    .use(ExtractTextPlugin, [Object.assign({ filename: '[name].css' }, pluginOptions)])
}
