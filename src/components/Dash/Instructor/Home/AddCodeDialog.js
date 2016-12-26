/**
 * @author Anthony Altieri on 12/26/16.
 */

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Colors from '../../../../util/Colors';

const LogOutDialog = ({
  isOpen,
  onOkClick,
  addCodes,
}) => (
  <Dialog
    title="Course Add Codes"
    open={isOpen}
    modal={false}
    autoScrollBodyContent
    actions={[
      <FlatButton
        label="Ok"
        onTouchTap={onOkClick}
      />
    ]}
  >
    <ul className="add-code-list">
      {addCodes.map((ac) => (
        <li className="r-between">
          <div>
            <p>{ac.title}</p>
            <p>({ac.abbreviation})</p>
          </div>
          <p>{ac.addCode}</p>
        </li>
      ))}
    </ul>
  </Dialog>
);

export default LogOutDialog;
