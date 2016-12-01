/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import Colors from '../colors';

const CustomTimePicker = (props) => {
  return (
    <div>
      <TimePicker
        {...props}
        style={{
          marginTop: "24px",
        }}
      />
      {!!props.showBar
        ? (
          <hr
            style={{
              position: "relative",
              bottom: "18px",
              border: `1px solid ${Colors.bright}`,
            }}
          />
        )
        : null
      }
    </div>
  )
};

export default CustomTimePicker;
