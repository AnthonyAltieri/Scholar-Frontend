/**
 * @flow
 * @author Anthony Altieri on 1/19/17.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../util/Colors';

const InstructorPresentDialog = ({
  isOpen,
  onCancelClick,
  onRequestClick,
}) => (
  <Dialog
    title="Instructor Already Present"
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
        label="Request"
        onTouchTap={onRequestClick}
        style={{ color: Colors.green}}
      />,
    ]}
  >
    There is an instructor already controlling the demo Course Session
    would you like to request control? The instructor will have 1 min to
    decline your request or you will become the new instructor.
  </Dialog>
);

export default InstructorPresentDialog;
