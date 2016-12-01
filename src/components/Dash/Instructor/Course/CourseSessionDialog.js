/**
 * @author Anthony Altieri on 11/27/16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../../util/Colors';

const CourseSessionDialog = ({
  isOpen,
  onStartClick,
  onEndClick,
  onCancelClick,
}) => {
  return (
    <Dialog
      title="Control Course Session"
      open={isOpen}
      modal={false}
      contentStyle={{
      }}
      actions={[
      <FlatButton
        label="Cancel"
        onTouchTap={onCancelClick}
      />,
      <FlatButton
        label="End"
        onTouchTap={onEndClick}
        style={{ color: Colors.red }}
      />,
      <FlatButton
        label="Start"
        onTouchTap={onStartClick}
        style={{ color: Colors.green }}
      />
    ]}
    >
      Would you like to Start or End a Course Session for this Course.
    </Dialog>
  );
};

export default CourseSessionDialog;
