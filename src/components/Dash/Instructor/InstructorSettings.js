/**
 * @author Anthony Altieri on 10/8/16.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Section from '../../Settings/Section';
import Slider from '../../Settings/Slider';
import Toggle from '../../Settings/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Colors from '../../../util/Colors';
import * as Loading from '../../../actions/Loading';
import * as Settings from '../../../actions/DashInstructor/Settings';
import { get as getSettings } from '../../../api/DashInstructor/Settings';

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
      <div
        className="settings"
        style={{
          padding: "12px"
        }}
      >
        <RaisedButton
          label="Save"
          fullWidth
          style={{
            marginBottom: "16px"
          }}
          buttonStyle={{
            backgroundColor: Colors.green,
          }}
          labelStyle={{
            color: "#FFFFFF",
          }}
          onClick={() => {
            // TODO: implement
          }}
        />
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
        <br />
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
  courseId: state.Course.id,
  threshold: state.Dash.Instructor.Settings.threshold,
  enableAlert: state.Dash.Instructor.Settings.enableAlert,
  enableAsk: state.Dash.Instructor.Settings.enableAsk,
  hasProfanityFilter: state.Dash.Instructor.Settings.hasProfanityFilter,
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
    dispatch(Settings.defaultSlideThreshold(threshold));
  },
  toggleAlert: (enableAlert) => {
    dispatch(Settings.defaultToggleAlert(enableAlert))
  },
  toggleAsk: (enableAsk) => {
    dispatch(Settings.defaultToggleAsk(enableAsk))
  },
  toggleProfanityFilter: (hasProfanityFilter) => {
    dispatch(Settings.defaultToggleProfanityFilter(hasProfanityFilter))
  },
});

InstructorSettings = connect(
  stateToProps,
  dispatchToProps,
)(InstructorSettings);



export default InstructorSettings;
