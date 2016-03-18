import React from 'react';
import {Route} from 'react-router';

/** Components */
import {App} from './components/App';
import {NoMatch} from './components/NoMatch';

// Keep routes in alphabetic order; `NoMatch` must be the last one.
export default (
  <Route path="/" component={App}>
    <Route path="*" component={NoMatch}/>
  </Route>
);
