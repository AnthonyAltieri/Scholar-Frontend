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
import * as CourseSessionApi from '../../../../../api/CourseSession';
import AssessmentViewer from './AssessmentViewer';
import InstantAssessmentGraph from './Instant/Graph'

class Assess extends Component {
  async componentDidMount() {
    const {
      isCourseSessionActive,
      courseSessionId,
      foundActiveInstantAssessment,
      foundActiveReflectiveAssessment,
      assessmentId
    } = this.props;
    if (isCourseSessionActive) {
      try {
        const payload = await CourseSessionApi
          .getActiveAssessment(courseSessionId);
        if (!!payload.error) {
          return;
        }
        const { activeAssessmentType, activeAssessment } = payload;
        if (activeAssessmentType === 'INSTANT') {
          const {
            question,
            assessmentType,
            options,
            answers,
          } = activeAssessment;
          foundActiveInstantAssessment(
            activeAssessmentId,
            question,
            assessmentType,
            options,
            answers,
          );
        } else if (activeAssessmentType === 'REFLECTIVE') {
          const {
            question,
            assessmentType,
            numberAnswers,
            numberReviews,
          } = activeAssessment;
          foundActiveReflectiveAssessment(
            assessmentId,
            question,
            assessmentType,
            numberAnswers,
            numberReviews,
          );
        } else {
          throw new Error(
            `Invalid active assessment type ${activeAssessmentType}`
          );
        }
      } catch (e) {
        console.error('[ERROR] in Assess component > ComponentDidMount : ' + e);

      }
    }
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
            <div id="instantGraph"> 
              <InstantAssessmentGraph /> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getInstantAssessmentAnswers(answers = []) {
  return answers.reduce((a, c) => {
    switch (c.optionIndex) {
      case 0: return {...a, a: (a.a + 1) }
      case 1: return {...a, b: (a.b + 1) }
      case 2: return {...a, c: (a.c + 1) }
      case 3: return {...a, d: (a.d + 1) }
      case 4: return {...a, e: (a.e + 1) }
    }
  }, { a:0, b:0, c:0, d:0, e:0 });
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
  instantAssessmentAnswers: getInstantAssessmentAnswers(
    state.Assess.Instant.answers
  ),
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
  foundActiveInstantAssessment: (
    id,
    question,
    assessmentType,
    options,
    answers,
  ) => {
    dispatch(AssessActions.foundActiveInstantAssessment(
      id,
      question,
      assessmentType,
      options,
      answers,
    ))
  },
  foundActiveReflectiveAssessment: (
    id,
    question,
    assessmentType,
    numberAnswers,
    numberReviews,
  ) => {
    dispatch(AssessActions.foundActiveReflectiveAssessment(
      id,
      question,
      assessmentType,
      numberAnswers,
      numberReviews,
    ))
  }
});

Assess = connect(
  stateToProps,
  dispatchToProps,
)(Assess);

export default Assess;
