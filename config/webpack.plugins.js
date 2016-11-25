const webpack = require('webpack');
const helpers = require('./helpers');

// const autoprefixer = require('autoprefixer');
// const postcssReporter = require('postcss-reporter');
// const scssSyntax = require('postcss-scss');
/*
 * Webpack Plugins
 */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * Plugin: DefinePlugin
 * Description: Define free variables.
 * Useful for having development builds with debug logging or adding global constants.
 *
 * Environment helpers
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
/**
 * Plugin: NormalModuleReplacementPlugin
 * Description: Replace resources that matches resourceRegExp with newResource
 *
 * See: http://webpack.github.io/docs/list-of-plugins.html#normalmodulereplacementplugin
 */

const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const IgnorePlugin = require('webpack/lib/IgnorePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
/**
 * Plugin: UglifyJsPlugin
 * Description: Minimize all JavaScript output of chunks.
 * Loaders are switched into minimizing mode.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
 */
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Plugin: WebpackMd5Hash
 * Description: Plugin to replace a standard webpack chunkhash with md5.
 *
 * See: https://www.npmjs.com/package/webpack-md5-hash
 */
const WebpackMd5Hash = require('webpack-md5-hash');

/* Webpack Plugins Instances */

const AssetsPluginInstance = new AssetsPlugin({path: helpers.root('dist'), filename: 'webpack-assets.json', prettyPrint: true});

/*
 * Plugin: ForkCheckerPlugin
 * Description: Do type checking in a separate process, so webpack don't need to wait.
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
 */
const ForkCheckerPluginInstance = new ForkCheckerPlugin();

/*
 * Plugin: CommonsChunkPlugin
 * Description: Shares common code between the pages.
 * It identifies common modules and put them into a commons chunk.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
 */
const CommonsChunkPluginInstance = new webpack.optimize.CommonsChunkPlugin({
  name: ['polyfills', 'vendor'].reverse()
});

/*
 * Plugin: CopyWebpackPlugin
 * Description: Copy files and directories in webpack.
 *
 * Copies project static assets.
 *
 * See: https://www.npmjs.com/package/copy-webpack-plugin
 */
const CopyWebpackPluginInstance = new CopyWebpackPlugin([
  {
    from: 'src/assets',
    to: 'assets'
  }
]);

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
const HtmlWebpackPluginInstance = new HtmlWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  chunksSortMode: 'dependency'
});

/*
 * Plugin: HtmlHeadConfigPlugin
 * Description: Generate html tags based on javascript maps.
 *
 * If a publicPath is set in the webpack output configuration, it will be automatically added to
 * href attributes, you can disable that by adding a "=href": false property.
 * You can also enable it to other attribute by settings "=attName": true.
 *
 * The configuration supplied is map between a location (key) and an element definition object (value)
 * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
 *
 * Example:
 *  Adding this plugin configuration
 *  new HtmlElementsPlugin({
 *    headTags: { ... }
 *  })
 *
 *  Means we can use it in the template like this:
 *  <%= webpackConfig.htmlElements.headTags %>
 *
 * Dependencies: HtmlWebpackPlugin
 */
const HtmlElementsPluginInstance = new HtmlElementsPlugin({headTags: require('./head-config.common')});

const ProvidePluginInstance = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "window.jQuery": "jquery",
  Tether: "tether",
  "window.Tether": "tether",
  Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
  Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
  Button: "exports-loader?Button!bootstrap/js/dist/button",
  Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
  Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
  Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
  Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
  Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
  Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
  Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
  Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
  Util: "exports-loader?Util!bootstrap/js/dist/util"
});

const ContextReplacementPluginInstance = new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, __dirname);

module.exports = {
  CopyWebpackPluginInstance: CopyWebpackPluginInstance,
  CommonsChunkPluginInstance: CommonsChunkPluginInstance,
  HtmlWebpackPluginInstance: HtmlWebpackPluginInstance,
  ForkCheckerPluginInstance: ForkCheckerPluginInstance,
  HtmlElementsPluginInstance: HtmlElementsPluginInstance,
  AssetsPluginInstance: AssetsPluginInstance,
  ProvidePluginInstance: ProvidePluginInstance,
  ContextReplacementPluginInstance: ContextReplacementPluginInstance,
  LoaderOptionsPlugin: LoaderOptionsPlugin,

  DefinePlugin: DefinePlugin,
  NamedModulesPlugin: NamedModulesPlugin,
  NormalModuleReplacementPlugin: NormalModuleReplacementPlugin,
  IgnorePlugin: IgnorePlugin,
  DedupePlugin: DedupePlugin,
  UglifyJsPlugin: UglifyJsPlugin,
  WebpackMd5Hash: WebpackMd5Hash,
  ExtractTextPlugin: ExtractTextPlugin
};
