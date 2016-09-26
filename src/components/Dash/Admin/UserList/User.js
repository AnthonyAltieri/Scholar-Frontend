/**
 * @author Anthony Altieri on 9/26/16.
 */

import React from 'react';

const User = ({
  id,
  firstname,
  lastname,
  type,
}) => {
  return (
    <li>
      <div className="r">
        <p className="label">id:</p>
        <h3>{id}</h3>
      </div>
      <div className="r">
        <p className="label">first name:</p>
        <h3>{firstname}</h3>
      </div>
      <div className="r">
        <p className="label">last name:</p>
        <h3>{lastname}</h3>
      </div>
      <div className="r">
        <p className="label">type:</p>
        <h3>{type}</h3>
      </div>
    </li>
  );
};

export default User;
