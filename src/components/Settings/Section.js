/**
 * @author Anthony Altieri on 10/8/16.
 */

import React from 'react';
import Colors from '../../util/Colors';
import Toggle from './Toggle';

const Section = ({
  heading,
  children,
  hasEnable,
  isEnabled,
  onEnableToggle,
}) => {

  const styles = {
    thumbOff: {
      // backgroundColor: Colors.red,
    },
    trackOff: {
      backgroundColor: Colors.redLight,
    },
    thumbSwitched: {
      backgroundColor: Colors.green,
    },
    trackSwitched: {
      backgroundColor: Colors.greenLight,
    },
  };

  return (
    <div className="section">
      <div className="header">
        <h1 className="heading">{heading}</h1>
        {hasEnable
          ? <Toggle
              className="toggle-enable"
              label={isEnabled ? 'Enabled' : 'Disabled'}
              labelPosition={'right'}
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onToggle={onEnableToggle}
              labelStyle={{ color: Colors.dark }}
            />
          : null}
      </div>
      <div className="options">
        {children}
      </div>
    </div>
  );
};

export default Section;
