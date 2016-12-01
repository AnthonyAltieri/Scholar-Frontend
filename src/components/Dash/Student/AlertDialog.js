/**
 * @author Anthony Altieri on 11/11/16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../util/Colors';

const AlertDialog = ({
  isOpen,
  onOkClick,
}) => (
  <Dialog
    title="Alert activated"
    open={isOpen}
    modal={false}
    actions={[
      <FlatButton
        label="Ok"
        onTouchTap={onOkClick}
        style={{ color: Colors.green }}
      />
    ]}
  >
    Your confusion has been noted and sent to your professor.
  </Dialog>
);

export default AlertDialog;
