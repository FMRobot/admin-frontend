const childProcess = require('child_process');
const del = require('del');
const log = require('npmlog');
const ms = require('ms');
const webpack = require('webpack');

const config = require('./config');

const compiler = webpack([config('server'), config('app')]);

const {LOG_LEVEL, NODE_ENV} = process.env;

log.level = LOG_LEVEL || NODE_ENV === 'production' ? 'error' : 'silly';

del('./build')
.then(() => {
  compiler.watch({
    aggregateTimeout: 500,
  }, (err, stats) => {
    if (err) {
      throw err;
    }

    const filename = stats.compilation.outputOptions.filename;
    const duration = stats.endTime - stats.startTime;

    log.info(filename, `Compiled in ${ms(duration)}`);

    if (filename === 'server.js' && !global.webpackInitBuildDone) {
      childProcess.fork('./build/server', {cwd: process.cwd()});
      global.webpackInitBuildDone = true;
    }
  });
});
