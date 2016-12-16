import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionBank from './QuestionBank';
import Heading from '../../Heading/Heading';
import { toastr } from 'react-redux-toastr';
import StatBlock from '../StatBlock';
import * as InstantActions from '../../../../../actions/Assess/Instant'
//import * as ReflectiveActions from '../../../../../actions/Assess/Reflective'
import * as AssessActions from '../../../../../actions/Assess/Assess'
import * as InstantApi from '../../../../../api/Assessment/Instant';
import * as ReflectiveApi from '../../../../../api/Assessment/Reflective';
import AssessmentViewer from './AssessmentViewer';

class Assess extends Component {
  componentDidMount() {
  }

  render() {
    const {
      userId,
      isInstantActive,
      isReflectiveActive,
      instantOptions,
      onOptionAdd,
      onOptionClear,
      onOptionClearClick,
      onOptionContentClick,
      activateInstant,
      activateReflective,
      deactivate,
      courseId,
      courseSessionId,
      isCourseSessionActive,
      chooseCorrectOption,
      unselectCorrectOption,
      correctOption,
      activeAssessmentType,
      mode,
      setAssessmentViewMode,
    } = this.props;


    return (
      <div className="assess r-between">
        <div className="left-pane c">
          <AssessmentViewer
            {...this.props}
          />
          <div
            className="one-thirds-pane"
            style={{
              marginTop: '1%',
            }}
          >
            <Heading text="Stats" />
            <div
              className="r-center"
              style={{
                height: '75%',
                padding: '0 12px'
              }}
              >
              <StatBlock
                name="Attendance"
                number={0}
                isMini
              />
              {isInstantActive || isReflectiveActive
                ? (
                  <div>
                    <StatBlock
                      name="Answered"
                      number={12}
                      isMini
                    />
                  </div>
                  )
                : null
              }
              {isReflectiveActive
                ? (
                    <StatBlock
                      name="Reviewed"
                      number={0}
                      isMini
                    />
                  )
                : null
              }

            </div>
          </div>

        </div>
        <div className="right-pane c">
          <div
            className="half-pane"
            style={{
              marginBottom: '1%',
            }}
          >
            Assessment Bank
          </div>
          <div
            className="half-pane"
            style={{
              marginTop: '1%',
            }}
          >
            Instant Assessment Graph
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  userId: state.User.id,
  courseId: state.Course.id,
  courseSessionId: state.Course.activeCourseSessionId,
  isCourseSessionActive: !!state.Course.activeCourseSessionId,
  activeAssessmentType: state.Assess.activeType,
  isInstantActive: !!state.Assess.Instant.isActive,
  instantOptions: state.Assess.Instant.options || [],
  isReflectiveActive: !!state.Assess.Reflective.isActive,
  correctOption: state.Assess.Instant.correctOption,
  mode: state.Assess.mode,
  assessmentId: state.Assess.activeAssessmentId || null,
});

const dispatchToProps = (dispatch) => ({
  onOptionAdd: (content) => {
    dispatch(InstantActions.addOption(content));
  },
  onOptionClearClick: (index) => {
    dispatch(InstantActions.removeOption(index))
  },
  chooseCorrectOption: (correctOption) => {
    dispatch(InstantActions.chooseCorrectOption(correctOption));
  },
  unselectCorrectOption: () => {
    dispatch(InstantActions.unselectCorrectOption());
  },
  activateInstant: (activeAssessmentId) => {
    dispatch(AssessActions.activate('INSTANT', activeAssessmentId));
  },
  activateReflective: (activeAssessmentId) => {
    dispatch(AssessActions.activate('REFLECTIVE', activeAssessmentId));
  },
  deactivate: () => {
    dispatch(AssessActions.deactivate());
  },
  setAssessmentViewMode: (mode) => {
    dispatch(AssessActions.setViewMode(mode));
  },
});

Assess = connect(
  stateToProps,
  dispatchToProps,
)(Assess);

export default Assess;
