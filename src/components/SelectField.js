/**
 * @author Anthony Altieri on 11/18/16.
 */

import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Colors from '../util/Colors';

const CustomSelectField = ({
  floatingLabelText,
  value,
  onChange,
  menuItems,
  showBar,

}) => (
    <SelectField
      floatingLabelText={floatingLabelText}
      value={value}
      onChange={onChange}
      floatingLabelFocusStyle={{
      color: Colors.bright,
    }}
      underlineFocusStyle={{
      borderColor: Colors.bright,
    }}
    >
      {menuItems.map((i) => (
        <MenuItem
          key={i.value}
          value={i.value}
          primaryText={i.primaryText}
        />
      ))}
    </SelectField>
);


export default CustomSelectField;