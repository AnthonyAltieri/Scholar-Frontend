/**
 * @author Anthony Altieri on 9/6/16.
 */

import { createStore, applyMiddleware } from 'redux';
import Root from './reducers/Root';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { saveState, loadState } from './localStorage';
import throttle from 'lodash/throttle';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) return rawDispatch;
  return (action) => {
    if (action.type.split('/')[0] === '@@router') {
      return rawDispatch(action);
    }
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
};


const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    Root,
    persistedState,
    applyMiddleware(routerMiddleware(browserHistory))
  );

  if (process.env.NODE_ENV !== 'production')
    store.dispatch = addLoggingToDispatch(store);

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }), 1000);

  return store;
};

export default configureStore;
