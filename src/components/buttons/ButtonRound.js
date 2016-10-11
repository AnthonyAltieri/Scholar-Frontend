/**
 * @author Anthony Altieri on 9/5/16.
 */

import React from 'react';
import Ink from 'react-ink';

const ButtonRound = ({
  onClick,
  className,
  style,
  children,
}) => {
  return (
    <a
      onClick={onClick}
      className={className ? 'button-round ' + className : 'button-round'}
      style={style ? style : {}}
    >
      <Ink />
      {children}
    </a>
  );
};

export default ButtonRound;