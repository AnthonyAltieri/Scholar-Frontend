/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';

const backSrc = require('../../../img/App/back.svg');

const Nav = ({
  onBackClick,
  onAlertClick,
  onAskClick,
  code,
  mode
}) => (
  <div className="nav">
    <div className="nav-top">
      <div className="navigation">
        <img
          className="arrow"
          onClick={onBackClick}
          src={backSrc}
        />
        <h3
          className="text"
          onClick={onBackClick}
        >
          {mode === 'QUESTIONS' ? 'Courses' : 'Questions'}
        </h3>
      </div>
    </div>
    <h1 className="header">{code}</h1>
    <div className="nav-btns">
      <a
        className={mode === 'ASK' ? 'btn btn-active' : 'btn'}
        onClick={onAskClick}
      >
        ASK
      </a>
      <a
        className={mode === 'ALERT' ? 'btn btn-active' : 'btn'}
        onClick={onAlertClick}
      >
        ALERT
      </a>
    </div>
  </div>
);

export default Nav;
