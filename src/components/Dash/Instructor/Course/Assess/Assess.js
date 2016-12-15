import React, { Component } from 'react';
import { connect } from 'react-redux';
import Instant from './Instant/Instant';
import Reflective from './Reflective/Reflective';
import QuestionBank from './QuestionBank';
import Heading from '../../Heading/Heading';
import { toastr } from 'react-redux-toastr';
import StatBlock from '../StatBlock';
import * as InstantActions from '../../../../../actions/Assess/Instant'
//import * as ReflectiveActions from '../../../../../actions/Assess/Reflective'
import * as AssessActions from '../../../../../actions/Assess/Assess'
import * as InstantApi from '../../../../../api/Assessment/Instant';
import * as ReflectiveApi from '../../../../../api/Assessment/Reflective';

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
    } = this.props;

    let instantQuestion;
    let optionNodes = [];
    let reflectiveQuestion;

    return (
      <div className="assess r-between">
        <div className="left-pane c">
          <Instant
            options={instantOptions}
            isActive={isInstantActive}
            otherAssessmentActive={isReflectiveActive}
            onOptionAdd={onOptionAdd}
            onOptionClear={onOptionClear}
            onOptionClearClick={onOptionClearClick}
            onOptionContentClick={onOptionContentClick}
            isCourseSessionActive={isCourseSessionActive}
            chooseCorrectOption={chooseCorrectOption}
            unselectCorrectOption={unselectCorrectOption}
            correctOption={correctOption}
            questionRef={(n) => {
              instantQuestion = n;
            }}
            optionsRef={(n) => {
              optionNodes = [
                ...optionNodes,
                n
              ];
            }}
            onStartClick={async function(
              correctOption,
            ) {
              const question = instantQuestion.value;
              const options = optionNodes.reduce((a, c) => (
                [...a, c.value]
              ), []);
              try {
                const payload = await InstantApi.create(
                  courseId,
                  courseSessionId,
                  userId,
                  question,
                  options,
                  correctOption,
                );
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                activateInstant();
              } catch (e) {
                console.error('[ERROR] onStartClick', e);
                toastr.error('Something went wrong please try again');
              }
            }}
            onEndClick={async function() {
              try {
                const payload = await InstantApi.deactivate(courseSessionId);
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                deactivate();
              } catch (e) {
                console.error('[ERROR] onEndClick', e);
              }
            }}
          />
          <Reflective
            isActive={isReflectiveActive}
            otherAssessmentActive={isInstantActive}
            isCourseSessionActive={isCourseSessionActive}
            questionRef={(n) => {
              reflectiveQuestion = n;
            }}
            onStartClick={async function() {
              const question = reflectiveQuestion.value;
              try {
                const payload = await ReflectiveApi
                  .create(
                    courseId,
                    courseSessionId,
                    userId,
                    question,
                  );
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                activateReflective();
              } catch (e) {
                console.error('[ERROR] onStartClick', e);
              }
            }}
            onEndClick={async function() {
              try {
                const payload = await InstantApi.deactivate(courseSessionId);
                if (!!payload.error) {
                  toastr.error('Something went wrong please try again');
                  return;
                }
                deactivate();
              } catch (e) {
                console.error('[ERROR] onEndClick', e);
              }
            }}
          />
        </div>
        <div className="right-pane c">
          <div
            className="two-thirds-pane"
            style={{
              marginBottom: '1%',
            }}
          >
          </div>
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
  activateInstant: () => {
    dispatch(AssessActions.activate('INSTANT'));
  },
  activateReflective: () => {
    dispatch(AssessActions.activate('REFLECTIVE'));
  },
  deactivate: () => {
    dispatch(AssessActions.deactivate());
  },
});

Assess = connect(
  stateToProps,
  dispatchToProps,
)(Assess);

export default Assess;
