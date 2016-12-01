/**
 * @author Anthony Altieri on 11/18/16.
 */

import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import Colors from '../util/Colors';

const CustomDatePicker = (props) => {
  return (
    <div>
      <DatePicker
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

export default CustomDatePicker;