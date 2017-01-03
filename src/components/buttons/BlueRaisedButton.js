/**
 * @author Anthony Altieri on 12/28/16.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../util/Colors';

const BlueRaisedButton = (props) => (
  <RaisedButton
    backgroundColor={Colors.blue}
    labelColor="#FFFFFF"
    {...props}
  />
);

export default BlueRaisedButton;
