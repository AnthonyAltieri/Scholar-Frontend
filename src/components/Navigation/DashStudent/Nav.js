/**
 * @author Anthony Altieri on 9/8/16.
 */

import React from 'react';

const backSrc = require('../../../img/App/back.svg');

const Nav = ({
  onBackClick,
  code,
  mode
}) => (
  <div className="nav">
    <div className="nav-top">
      <div
        className="navigation"
        onClick={onBackClick}
      >
        <img
          className="arrow"
          src={backSrc}
        />
        <p>To Courses</p>
      </div>
      <h1 className="code">
        {code}
      </h1>
    </div>
  </div>
);

export default Nav;
