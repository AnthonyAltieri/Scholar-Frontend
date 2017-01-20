/**
 * @flow
 * @author Anthony Altieri on 1/19/17.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../util/Colors';

const PickDemoAccountDialog = ({
  isOpen,
  onCancelClick,
  onStudentClick,
  onInstructorClick,
}) => (
  <Dialog
    title="Choose Demo Account Type"
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
        label="Student"
        onTouchTap={onStudentClick}
        style={{ color: Colors.blue }}
      />,
      <FlatButton
        label="Instructor"
        onTouchTap={onInstructorClick}
        style={{ color: Colors.blue }}
      />,
    ]}
  >
    Pick an account type that you would like to join the demo CourseSession as.
  </Dialog>
);

export default PickDemoAccountDialog;