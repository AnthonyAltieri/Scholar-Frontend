/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';

const Filter = ({
  text,
  isActive,
  onClick,
}) => (
  <p
    className={isActive ? 'filter active' : 'filter'}
    onClick={onClick}
  >
    {text}
  </p>
);

export default Filter;
