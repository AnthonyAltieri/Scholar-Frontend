/**
 * @author Anthony Altieri on 11/22/16.
 */


import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../util/Colors';
import TextField from '../../TextField';

const AddCourseDialog = ({
  isOpen,
  onSendClick,
  onCancelClick,
}) => {
  let code = '';
  return (
    <Dialog
      title="Enter an add code"
      open={isOpen}
      modal={false}
      contentStyle={{
        width: "90%",
      }}
      actions={[
      <FlatButton
        label="Cancel"
        onTouchTap={onCancelClick}
        style={{ color: Colors.red }}
      />,
      <FlatButton
        label="Send"
        onTouchTap={onSendClick}
        style={{ color: Colors.green }}
      />
    ]}
    >
      Please enter the code of a course you would like to add
      <div className="r-center">
        <TextField
          floatingLabelText="Email"
          onChange={(event) => {
            code = event.target.value;
          }}
        />
      </div>
    </Dialog>
  );
};

export default AddCourseDialog;
