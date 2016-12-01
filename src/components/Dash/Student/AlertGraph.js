/**
 * @author Anthony Altieri on 11/13/16.
 */

import React from 'react';
import Colors from '../../../util/Colors';


const Bar = ({
  isPastThreshold,
  percentage,
}) => (
  <div
    className="bar"
    style={{
      background: isPastThreshold ? Colors.red : Colors.green,
      width: `${percentage}%`
    }}
  >
    <p>{percentage}</p>
  </div>
);


const AlertGraph = (props) => (
  <div className="alert-graph">
    <Bar {...props} />
  </div>
);


export default AlertGraph;
