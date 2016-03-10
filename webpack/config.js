const path = require('path');
const w = require('webpack');
const nodeExternals = require('webpack-node-externals');

const autoloaded = {
  app: {},
  server: {
    log: 'npmlog',
  },
};

const hmr = {
  app: 'webpack/hot/dev-server',
  server: 'webpack/hot/poll?500',
};

const externals = {
  app: null,
  server: [nodeExternals({whitelist: [hmr.server]})],
};

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


  /** Loaders */
  const loaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
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
    plugins.push(new w.optimize.UglifyJsPlugin());
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
      loaders,
    },
    plugins,
  };
};
