/**
 * Created by bharatbatra on 12/19/16.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import Colors from '../../../../util/Colors';


const AttendanceCodeBox = ({
  code,
}) => (
  <div style={
    {

      border: "3px solid" + Colors.dark,
      fontSize: "40px"
    }}>
    {code}
  </div>
);

export default AttendanceCodeBox;