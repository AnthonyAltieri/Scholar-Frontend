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
    <div className="stats">
      <StatBlock
        name="Number of Alerts"
        value={numberAlerts}
      />
      <StatBlock
        name="Course Session Attendance"
        value={attendance}
      />
      <div className="r-around" id="stat-row">
      </div>

    </div>
  );
};

export default Stats;
