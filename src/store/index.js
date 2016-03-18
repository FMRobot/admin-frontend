import {DevTools} from '../components/DevTools';
import reducer from './reducers';
import {applyMiddleware, compose, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import {routerMiddleware} from 'react-router-redux';

export default function configureStore(history, state) {
  const middleware = applyMiddleware(
    promiseMiddleware,
    routerMiddleware(history)
  );

  const enhancer = process.env.NODE_ENV === 'production'
    ? middleware
    : compose(middleware, DevTools.instrument());

  return createStore(reducer, state, enhancer);
}
