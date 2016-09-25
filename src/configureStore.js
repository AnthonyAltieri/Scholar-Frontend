/**
 * @author Anthony Altieri on 9/6/16.
 */

import { createStore, applyMiddleware } from 'redux';
import Root from './reducers/Root';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  if (!console.group) return rawDispatch;
  return (action) => {
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
  const store = createStore(
    Root,
    applyMiddleware(routerMiddleware(browserHistory))
  );

  if (process.env.NODE_ENV !== 'production')
    store.dispatch = addLoggingToDispatch(store);

  return store;
};

export default configureStore;
