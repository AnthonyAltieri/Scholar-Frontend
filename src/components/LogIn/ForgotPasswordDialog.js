/**
 * @author Anthony Altieri on 11/11/16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../util/Colors';
import TextField from '../TextField';

const ForgotPasswordDialog = ({
  isOpen,
  onSendClick,
  onCancelClick,
}) => {
  let email = '';
  return (
    <Dialog
      title="Enter a recovery email"
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
        onTouchTap={() => {
          const emailVal = !!email.value ? email.value : '';
          onSendClick(emailVal)
        }}
        style={{ color: Colors.green }}
      />
    ]}
    >
      You will receive an email that will allow you to reset your password.
      <div className="r-center">
        <TextField
          floatingLabelText="Email"
          id="forgot-pass-dialog-enter"
          ref={(event) => {
            email = document.getElementById('forgot-pass-dialog-enter');
          }}
        />
      </div>
    </Dialog>
  );
};

export default ForgotPasswordDialog;
