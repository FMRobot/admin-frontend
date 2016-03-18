/**
 * REDUCER GUIDELINES
 *
 * For readability separate sections with two empty lines.
 *
 * We use `ducks` methodology to write reducers.
 * More info: https://github.com/erikras/ducks-modular-redux
 */

/**
 * These are the basic imports you will need.
 */
import {createAction} from 'redux-actions';
import {fromJS} from 'immutable';
import {handleActions} from 'redux-actions';

/**
 * Define actions as constans at the top of file.
 * Use a namespace, e.g. `app`, `auth`, `users`.
 */
const ACTION_NAME = 'fm-admin/<namespace>/ACTION_NAME';


/**
 * If you need default state, describe it here.
 * It’d be better to specify an empty one than none at all:
 * `const initialState = fromJS({});`
 */
const initialState = fromJS({
  prop: 'Initial value',
});

/**
 * Set up a reducer. When you don’t need to handle error,
 * pass a function instead of `{next, throw}` object.
 *
 * More info: https://github.com/acdlite/redux-actions
 */
export default handleActions({
  [ACTION_NAME]: {
    next(state, {payload}) {
      return state.set('propName', payload);
    },
    throw(state) {
      return state.remove('propName');
    },
  },
}, initialState);


/**
 * Don’t forget to export action creators.
 */
export const updateColor = createAction(ACTION_NAME);

/**
 * Finally add your reducer to `store/reducers/index.js`
 */
