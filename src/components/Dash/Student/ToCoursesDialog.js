/**
 * @author Anthony Altieri on 11/11/16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../util/Colors';

const ToCoursesDialog = ({
  isOpen,
  onYesClick,
  onNoClick,
}) => (
  <Dialog
    title="Exit to Course List"
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
    Do you want to leave your Course Session and go back to the Course List?
  </Dialog>
);

export default ToCoursesDialog;
