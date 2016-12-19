import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../../util/Colors';

const AttendanceDialog = ({
  isOpen,
  onStartClick,
  onEndClick,
  onCancelClick,
}) => (
  <Dialog
    title="Attendance"
    open={isOpen}
    modal={false}
    contentStyle={{
    }}
    actions={[
      <FlatButton
        label="Get Code"
        onTouchTap={onStartClick}
        style={{ color: Colors.green }}
      />,
      <FlatButton
        label="End"
        onTouchTap={onEndClick}
        disabled={true}
        style={{ color: Colors.red }}
      />,
      <FlatButton
        label="Cancel"
        onTouchTap={onCancelClick}
      />,

    ]}
  >
    Start Taking attendance by generating a code and then showing it to your students.

    

  </Dialog>
);

export default AttendanceDialog;
