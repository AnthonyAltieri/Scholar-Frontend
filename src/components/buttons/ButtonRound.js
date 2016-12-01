/**
 * @author Anthony Altieri on 9/5/16.
 */

import React from 'react';
import Ink from 'react-ink';
import Colors from '../../util/Colors';

const ButtonRound = ({
  onClick,
  className,
  style,
  green,
  children,
}) => {
  let backgroundColor = null;
  if (!!green) {
    backgroundColor = Colors.green;
  }


  return (
    <a
      onClick={onClick}
      className={className ? 'button-round ' + className : 'button-round'}
      style={{
        ...style,
        backgroundColor,
      }}
    >
      <Ink />
      {children}
    </a>
  );
};

export default ButtonRound;