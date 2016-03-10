import {createServer} from 'http';
import {argv} from 'yargs';
import {handler} from './handler';

const {LOG_LEVEL, NODE_ENV, PORT} = process.env;

log.level = LOG_LEVEL || NODE_ENV === 'production' ? 'error' : 'silly';

const port = PORT || argv.port || 3000;

const server = createServer();
server.on('request', handler);
server.listen(port);

log.http('server', `Listening on http://0.0.0.0:${port}`);

if (module.hot) {
  // Keep referece to remove outdated and add updated handlers
  let hotHandler = handler;

  module.hot.accept('./handler.js', () => {
    // Remove old requestHandler
    server.removeListener('request', hotHandler);

    // Require updated code
    hotHandler = require('./handler').handler;

    // Add updated requestHandler
    server.on('request', hotHandler);
  });
}
