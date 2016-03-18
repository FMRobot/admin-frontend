import {DevTools} from './components/DevTools';
import {Provider} from 'react-redux';
import R from 'ramda';
import React from 'react';
import {Root} from './components/Root';
import {RouterContext} from 'react-router';
import configureStore from './store';
import connect from 'connect';
import {createMemoryHistory} from 'react-router';
import {match} from 'react-router';
import ms from 'ms';
import {renderToStaticMarkup} from 'react-dom/server';
import {renderToString} from 'react-dom/server';
import responseTime from 'response-time';
import routes from './routes';
import serveFavicon from 'serve-favicon';
import serveStatic from 'serve-static';

function isUnmatched(props) {
  return R.any(R.propEq('path', '*'), props.routes);
}

function renderPage(store, props) {
  const App = () => (
    <Provider store={store}>
      <main>
        <RouterContext {...props} />
        <DevTools />
      </main>
    </Provider>
  );
  const app = {__html: renderToString(<App />)};
  const data = {__html: `window.APP_DATA=${JSON.stringify(props)};`};

  return renderToStaticMarkup(<Root app={app} data={data} />);
}

function frontend(req, res) {
  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);

  match({routes, location: req.url}, (err, redirectTo, props) => {
    if (err) {
      // TODO: replace with next(err)
      log.error('router', err.message);
      res.writeHead(500);
      return res.end(err.message);
    }

    if (redirectTo) {
      const Location = redirectTo.pathname + redirectTo.search;

      log.http('router', `Redirecting to: ${Location}`);
      res.writeHead(302, {Location});

      return res.end();
    }

    if (props) {
      const html = renderPage(store, props);

      res.setHeader('Content-Type', 'text/html');

      if (isUnmatched(props)) {
        res.writeHead(404);
      }

      return res.end(`<!doctype html>\n${html}`);
    }
  });
}

export const handler = connect();

handler.use(serveFavicon('static/favicon.ico'));

handler.use(serveStatic('build'));

if (process.env.NODE_ENV !== 'production') {
  handler.use(responseTime(({method, url}, res, time) => {
    log.verbose('server', `${method} ${url} — ${ms(Math.round(time))}`);
  }));
}

handler.use(frontend);
