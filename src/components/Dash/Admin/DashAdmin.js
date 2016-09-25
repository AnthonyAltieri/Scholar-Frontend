/**
 * @author Anthony Altieri on 9/23/16.
 */

import React from 'react';
import Nav from './Nav';

const DashAdmin = ({
  children,
}) => {
  return (
    <div className="dash-admin fullscreen">
      <Nav />
      <div className="stage">
        {children}
      </div>
    </div>
  );
};

export default DashAdmin;
