/**
 * @author Anthony Altieri on 10/8/16.
 */

import React from 'react';
import MaterialSlider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Slider = ({
  title,
  min,
  max,
  step,
  defaultValue,
  value,
  onChange,
}) => {
  let ball;
  return (
    <div className="slider">
      <h3 className="title">{title}</h3>
      <p className="value">{value}</p>
      <MuiThemeProvider>
        <MaterialSlider
          min={min}
          max={max}
          step={step || 1}
          defaultValue={defaultValue || min}
          value={value}
          onChange={onChange}
        />
      </MuiThemeProvider>
    </div>
  );
};

Slider.propTypes = {
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
};

export default Slider;
