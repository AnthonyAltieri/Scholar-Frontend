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
      <div className="navigation">
        <img
          className="arrow"
          onClick={onBackClick}
          src={backSrc}
        />
      </div>
      <h1 className="code">
        CSE 100
      </h1>
    </div>
  </div>
);

export default Nav;
