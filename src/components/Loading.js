/**
 * @author Anthony Altieri on 9/4/16.
 */

import React from 'react';

const Loading = ({}) => (
  <div className="loading">
    <img src={require('../img/App/logo-dark.svg')} className="logo" />
      <p className="text">SCHOLAR</p>
      <div className="sk-wave transform-double">
        <div className="sk-rect sk-rect1 background-dark"></div>
        <div className="sk-rect sk-rect2 background-dark"></div>
        <div className="sk-rect sk-rect3 background-dark"></div>
        <div className="sk-rect sk-rect4 background-dark"></div>
        <div className="sk-rect sk-rect5 background-dark"></div>
      </div>
  </div>
);

export default Loading;