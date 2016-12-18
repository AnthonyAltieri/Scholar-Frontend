import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from '../../TextField';
import Colors from '../../../util/Colors';

const AttendanceDialog = ({
  isOpen,
  onCancelClick,
  onSubmitClick,
}) => {
  let code = '';
  return (
    <Dialog
      title="Attendance"
      open={isOpen}
      actions={[
        <FlatButton
          label="Cancel"
          onTouchTap={onCancelClick}
          style={{ color: Colors.red }}
        />,
        <FlatButton
          label="Submit"
          onTouchTap={() => {
            onSubmitClick(code);
          }}
          style={{ color: Colors.green }}
        />
      ]}
    >
      <p className="dialog-text">
      Enter in the code that your instructor provides to confirm that you are in lecture.
      Gps will be used to determine your position in order to verify your presence in lecture.
      </p>
      <div className="r-center">
        <TextField
          floatingLabelText="Code"
          id="attendance-code"
          ref={() => {
            code = document.getElementById('attendance-code');
          }}
        />
      </div>
    </Dialog>
  );
};

export default AttendanceDialog;
