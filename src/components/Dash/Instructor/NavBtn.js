/**
 * @author Anthony Altieri on 10/3/16.
 */

import React from 'react';
import Ink from 'react-ink';

const NavBtn = ({
  iconSrc,
  onClick,
}) => {
  return (
    <a
      className="nav-btn"
      onClick={onClick}
    >
      <img
        className="icon"
        src={iconSrc}
      />
    </a>
  );
};

export default NavBtn;
