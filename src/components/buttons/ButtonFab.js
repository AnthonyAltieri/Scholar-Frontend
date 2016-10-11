/**
 * @author Anthony Altieri on 9/27/16.
 */

import React from 'react';
import Ink from 'react-ink';

const isValidPosition = (pos) => {
  // TODO: add more positions
  return pos === 'br';
};

const ButtonFab = ({
  position,
  onClick,
  className,
}) => {
  if (!isValidPosition(position)) {
    throw new Error (`Invalid Fab position: ${position}`);
  }

  return (
    <a
      className={`fab ${position} ${className}`}
      onClick={onClick}
    >
      <Ink />
      <img
        className="plus"
        src={require('../../img/Fab/plus.svg')}
      />
    </a>
  );
};

export default ButtonFab;
