/**
 * @author Anthony Altieri on 10/9/16.
 */

import React from 'react';
import MaterialToggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Toggle = ({
  title,
  label,
  labelPosition,
  thumbStyle,
  trackStyle,
  thumbSwitchedStyle,
  trackSwitchedStyle,
  labelStyle,
  onToggle,
  className,
  hasOnOff,
  value,
}) => {
  return (
    <div className="toggle">
      <h3 className="title">{title}</h3>
      <MuiThemeProvider>
        <MaterialToggle
          className={className}
          label={hasOnOff
            ? ((value) ? 'on' : 'off')
            : label}
          labelPosition={labelPosition}
          thumbStyle={thumbStyle}
          trackStyle={trackStyle}
          thumbSwitchedStyle={thumbSwitchedStyle}
          trackSwitchedStyle={trackSwitchedStyle}
          labelStyle={labelStyle}
          onToggle={onToggle}
        />
      </MuiThemeProvider>

    </div>
  );
};

export default Toggle;

