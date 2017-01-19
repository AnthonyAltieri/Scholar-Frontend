/**
 * @flow
 * @author Anthony Altieri on 1/18/17.
 */
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FontIcon from 'material-ui/FontIcon';
import Colors from '../../../util/Colors';
import { toastr } from 'react-redux-toastr';

const fabAlertStyle = {
  position: "absolute",
  bottom: "116px",
  right: "24px",
  zIndex: "10",
};

const AlertFab = ({
  onClick,
}) => (
  <FloatingActionButton
    mini
    style={fabAlertStyle}
    backgroundColor={Colors.red}
    onTouchTap={() => onClick()}
  >
    <FontIcon className="material-icons">
      error_outline
    </FontIcon>
  </FloatingActionButton>
);

export default AlertFab;
