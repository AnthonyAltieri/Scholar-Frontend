/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';

const Filter = ({
  text,
  isActive,
}) => (
  <p className={isActive ? 'filter active' : 'filter'}>
    {text}
  </p>
);

export default Filter;
