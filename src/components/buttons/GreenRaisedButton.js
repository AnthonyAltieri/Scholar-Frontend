import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../util/Colors';

const GreenRaisedButton = (props) => (
  <RaisedButton
    backgroundColor={Colors.green}
    labelColor="#FFFFFF"
    {...props}
  />
);

export default GreenRaisedButton;
