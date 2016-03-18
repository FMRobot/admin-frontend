import {DevTools} from './components/DevTools';
import {Provider} from 'react-redux';
import React from 'react';
import {Router} from 'react-router';
import {browserHistory} from 'react-router';
import {match} from 'react-router';
import {render} from 'react-dom';
import routes from './routes';
import configureStore from './store';

const store = configureStore(browserHistory);

match({history: browserHistory, routes}, (err, redirectTo, props) => {
  render(
    <Provider store={store}>
      <main>
        <Router {...props} />
        <DevTools />
      </main>
    </Provider>,
    document.getElementById('app')
  );
});
