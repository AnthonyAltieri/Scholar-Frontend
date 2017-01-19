/**
 * @author Anthony Altieri on 1/2/17.
 */

import React from 'react';
import StatBlock from '../StatBlock';

const Stats = ({
  numberQuestions,
  numberPresent,
  numberActiveAlerts,
  numberAttendance,
}) => (
  <div className="fullwidth fullheight">
    <div className="heading">
      <p className="header">Stats</p>
    </div>
    <div className="stats-row">
      <StatBlock
        name="Present"
        number={numberPresent || 0}
      />
      <StatBlock
        name="Active Alerts"
        number={numberActiveAlerts}
      />
      <StatBlock
        name="Questions"
        number={numberQuestions}
      />
      <StatBlock
        name="In Attendance"
        number={numberAttendance || 0}
      />
    </div>
  </div>
)

export default Stats;
