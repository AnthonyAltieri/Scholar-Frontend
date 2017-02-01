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
      width: `${isNaN(percentage) ? 0.00 : percentage }%`
    }}
  >
    <p>{percentage.toFixed(2)}%</p>
  </div>
);


const AlertGraph = (props) => (
  <div className={ props.positionalClass }>
    <Bar {...props} />
  </div>
);


export default AlertGraph;
