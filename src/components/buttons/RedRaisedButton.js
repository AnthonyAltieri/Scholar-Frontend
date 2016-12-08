
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../util/Colors';

const RedRaisedButton = (props) => (
  <RaisedButton
    backgroundColor={Colors.red}
    labelColor="#FFFFFF"
    {...props}
  />
);

export default RedRaisedButton;
