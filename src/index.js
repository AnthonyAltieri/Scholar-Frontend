/**
 * @author Anthony Altieri on 9/5/16.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import Root from './components/Root.js';
import configureStore from './configureStore'
import './scss/style.scss';

import Panic from './Voodoo/src/Panic';

const store = configureStore();
module.hot.accept();


ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);

