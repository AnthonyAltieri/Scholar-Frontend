/**
 * Created by bharatbatra on 12/19/16.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import Colors from '../../../../util/Colors';


const AttendanceCodeBox = ({
  code,
  style,
}) => (
  <div
    style={{
      ...style,
      padding: 20,
      border: "2px solid" + Colors.dark,
      fontSize: "40px",
      textAlign: 'center',
    }}
  >
    {code}
  </div>
);

export default AttendanceCodeBox;