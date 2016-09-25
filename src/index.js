/**
 * @author Anthony Altieri on 9/5/16.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import Root from './components/Root.js';
import configureStore from './configureStore'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import './scss/style.scss';

const store = configureStore();

module.hot.accept();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

