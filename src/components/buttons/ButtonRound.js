/**
 * @author Anthony Altieri on 9/5/16.
 */

import React from 'react';

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
      {children}
    </a>
  );
};

export default ButtonRound;