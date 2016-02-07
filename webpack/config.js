const autoprefixer = require('autoprefixer');
const path = require('path');
const pcssImport = require('postcss-import');
const pcssMixins = require('postcss-mixins');
const pcssSimpleVars = require('postcss-simple-vars');
const pcssNested = require('postcss-nested');
const pcssColorFn = require('postcss-color-function');
const w = require('webpack');
const nodeExternals = require('webpack-node-externals');

const autoloaded = {
  app: {},
  server: {
    log: 'npmlog',
  },
};

const cssLoaders = {
  app: [
    'postcss-loader',
    'css-loader?modules',
    'style-loader',
  ],
  server: [
    'postcss-loader',
    'css/locals?modules',
  ],
};

const hmr = {
  app: 'webpack/hot/dev-server',
  server: 'webpack/hot/poll?500',
};

const externals = {
  app: null,
  server: [nodeExternals({whitelist: [hmr.server]})],
};

const mixinsDir = path.join(__dirname, '../src/lib/css-mixins');

const target = {
  app: 'web',
  server: 'node',
};

module.exports = function config(scriptName) {
  /** Constants */
  const CWD = process.cwd();
  const DEV = process.env.NODE_ENV !== 'production';


  /** Entries */
  const entry = [`./src/${scriptName}`];

  if (DEV) {
    // Prepend entries with appropriate HMR code
    entry.unshift(hmr[scriptName]);
  }


  /** Preloaders */
  const preLoaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    },
  ];


  /** Loaders */
  const loaders = [
    {
      test: /\.css$/,
      loaders: cssLoaders[scriptName].reverse(),
    },
  ];


  /** Plugins */
  const plugins = [
    new w.optimize.OccurrenceOrderPlugin(true),
  ];

  if (DEV) {
    plugins.unshift(new w.HotModuleReplacementPlugin());
  } else {
    plugins.push(new w.NoErrorsPlugin());
    plugins.push(new w.optimize.DedupePlugin());
    plugins.push(new w.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    }));
  }

  plugins.push(new w.ProvidePlugin(Object.assign({}, autoloaded[scriptName])));


  /** Configuration */
  return {
    entry,
    target: target[scriptName],
    output: {
      filename: `${scriptName}.js`,
      path: path.join(CWD, 'build'),
      pathinfo: DEV,
    },
    recordsPath: path.join(CWD, 'build', `${scriptName}.records.json`),
    externals: externals[scriptName],
    devtool: DEV && 'source-map',
    module: {
      preLoaders,
      loaders,
    },
    plugins,
    postcss: () => [
      pcssImport,
      pcssMixins({mixinsDir}),
      pcssSimpleVars({variables: require('../src/lib/cssVariables')}),
      pcssNested,
      pcssColorFn,
      autoprefixer({
        browsers: [
          'last 2 versions',
          'IE >= 9',
        ],
      }),
    ],
  };
};
