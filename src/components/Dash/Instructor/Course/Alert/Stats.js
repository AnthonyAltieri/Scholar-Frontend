/**
 * @author Anthony Altieri on 11/28/16.
 */

import React from 'react';
import StatBlock from '../StatBlock';

const Stats = ({
  numberAlerts,
  attendance,
}) => {
  return (
    <div
      className="stats r-around"
      style={{
        display: "flex"
      }}
    >
      <StatBlock
        name="Active Alerts"
        number={numberAlerts || 0}
      />
      <StatBlock
        name="Attendance"
        number={attendance || 0}
      />
    </div>
  );
};

export default Stats;
