/**
 * @author Anthony Altieri on 10/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from '../../Settings/Section';
import Slider from '../../Settings/Slider';
import Toggle from '../../Settings/Toggle';
import * as Loading from '../../../actions/Loading';
import * as Settings from '../../../actions/DashInstructor/Settings';
import { getSettings } from '../../../api/DashInstructor/Settings';

class InstructorSettings extends Component{
  componentDidMount() {
    const { courseId, retrievedSettings, startLoading, endLoading
    } = this.props;
    startLoading();
    getSettings(courseId)
      .then((settings) => {
        retrievedSettings(settings);
        endLoading();
      })
      .catch((e) => {
        // TODO: Handle Error
        endLoading();
      })
  }

  render() {
    const { threshold, slideThreshold, toggleAlert,
      enableAlert, enableAsk, toggleAsk, hasProfanityFilter,
      toggleProfanityFilter,
    } = this.props;
    return (
      <div className="settings">
        <Section
          heading="ALERT"
          hasEnable
          isEnabled={enableAlert}
          onEnableToggle={(event, value) => {
            toggleAlert(value);
          }}
        >
          <Slider
            title="Threshold Percentage"
            min={0}
            max={100}
            value={threshold}
            onChange={(event, value) => {
              console.log('value', value);
              slideThreshold(value)
            }}
          />
        </Section>
        <Section
          heading="ASK"
          hasEnable
          isEnabled={enableAsk}
          onEnableToggle={(event, value) => {
            toggleAsk(value);
          }}
        >
          <Toggle
            title="Profanity Filter"
            className="toggle-switch"
            hasOnOff
            value={hasProfanityFilter}
            onToggle={(event, value) => {
              toggleProfanityFilter(value);
            }}
          />
        </Section>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  courseId: state.CourseSession.courseId,
  threshold: state.DashInstructor.Settings.threshold,
  enableAlert: state.DashInstructor.Settings.enableAlert,
  enableAsk: state.DashInstructor.Settings.enableAsk,
  hasProfanityFilter: state.DashInstructor.Settings.hasProfanityFilter,
});

const dispatchToProps = (dispatch) => ({
  retrievedSettings: (settings) => {
    dispatch(Settings.retrievedSettings(settings));
  },
  startLoading: () => {
    dispatch(Loading.startLoading());
  },
  endLoading: () => {
    dispatch(Loading.endLoading());
  },
  slideThreshold: (threshold) => {
    dispatch(Settings.slideThreshold(threshold));
  },
  toggleAlert: (enableAlert) => {
    dispatch(Settings.toggleAlert(enableAlert))
  },
  toggleAsk: (enableAsk) => {
    dispatch(Settings.toggleAsk(enableAsk))
  },
  toggleProfanityFilter: (hasProfanityFilter) => {
    dispatch(Settings.toggleProfanityFilter(hasProfanityFilter))
  },
});

InstructorSettings = connect(
  stateToProps,
  dispatchToProps,
)(InstructorSettings);



export default InstructorSettings;
