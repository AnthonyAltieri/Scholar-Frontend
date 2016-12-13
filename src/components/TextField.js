/**
 * @author Anthony Altieri on 11/5/16.
 */

import React from 'react';
import TextField from 'material-ui/TextField';
import Colors from '../colors';
import { v4 } from 'uuid';

const CustomTextField = (props) => (
  <TextField
    {...props}
    id={props.id || v4()}
    floatingLabelFocusStyle={{
      color: Colors.bright,
    }}
    underlineFocusStyle={{
      borderColor: Colors.bright,
    }}
  />
);

export default CustomTextField;
