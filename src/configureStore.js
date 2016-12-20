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
    if (action.type.split('')[0] === '@') {
      return rawDispatch(action);
    } else if (action.type === 'UPDATE_ACTIVE_ALERTS_STUDENT') {
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
    console.log("Gonna Save the state rn");
    // console.log(JSON.stringify(store.getState().Course, null, null));
    // console.log(JSON.stringify(store.getState().Admin, null, null));
    // console.log(JSON.stringify(store.getState().Assess, null, null));
    // console.log(JSON.stringify(store.getState().AssessmentBank, null, null));
    // console.log(JSON.stringify(store.getState().Courses, null, null));
    // console.log(JSON.stringify(store.getState().Dash, null, null));
    // console.log(JSON.stringify(store.getState().DashStudent, null, null));
    // console.log(JSON.stringify(store.getState().Drawer, null, null));
    // console.log(JSON.stringify(store.getState().Graph, null, null));
    // console.log(JSON.stringify(store.getState().Loading, null, null));
    // console.log(JSON.stringify(store.getState().Menu, null, null));
    // console.log(JSON.stringify(store.getState().Overlay, null, null));
    // console.log(JSON.stringify(store.getState().QuestionList, null, null));
    // console.log(JSON.stringify(store.getState().SignupInstructor, null, null));
    console.log(JSON.stringify(store.getState().Socket, null, null));
    // console.log(JSON.stringify(store.getState().StudentQuestionList, null, null));
    // console.log(JSON.stringify(store.getState().User, null, null));
    // console.log(JSON.stringify(store.getState().routing, null, null));
    // console.log(JSON.stringify(store.getState().toastr, null, null));
  }, 500));

  return store;
};

export default configureStore;
