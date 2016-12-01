/**
 * @author Anthony Altieri on 10/3/16.
 */

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const SIDE_NAV_WIDTH = 124;
const NavBtn = (props) => {
  const { icon, label } = props;
  return (
    <RaisedButton
      style={{
        marginTop: "6px",
        marginBottom: "6px",
        width: `${SIDE_NAV_WIDTH - 12}px`,
        marginLeft: "auto",
        marginRight: "auto",
      }}
      label={label}
      labelPosition="before"
      {...props}
      labelStyle={{
        fontSize: "11px",
      }}
      fullWidth
      icon={
    <FontIcon
      style={{
        position: "relative",
        bottom: "2px",
      }}
      className="material-icons"
    >
      {icon}
    </FontIcon>
    }
    />
  );
};

export default NavBtn;