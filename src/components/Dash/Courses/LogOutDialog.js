/**
 * @author Anthony Altieri on 11/22/16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../util/Colors';

const LogOutDialog = ({
  isOpen,
  onYesClick,
  onNoClick,
}) => (
  <Dialog
    title="Log Out"
    open={isOpen}
    modal={false}
    actions={[
      <FlatButton
        label="No"
        onTouchTap={onNoClick}
        style={{ color: Colors.red}}
      />,
      <FlatButton
        label="Yes"
        onTouchTap={onYesClick}
        style={{ color: Colors.green }}
      />
    ]}
  >
    Do you really want to log out?
  </Dialog>
);

export default LogOutDialog;
