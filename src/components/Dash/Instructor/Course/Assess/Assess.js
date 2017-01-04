import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionBank from './QuestionBank';
import Heading from '../../Heading/Heading';
import { toastr } from 'react-redux-toastr';
import StatBlock from '../StatBlock';
import * as InstantActions from '../../../../../actions/Assess/Instant'
//import * as ReflectiveActions from '../../../../../actions/Assess/Reflective'
import * as BankedAssessmentApi from '../../../../../api/BankedAssessment';
import * as AssessmentBankActions from '../../../../../actions/AssessmentBank';
import * as AssessActions from '../../../../../actions/Assess/Assess'
import * as InstantApi from '../../../../../api/Assessment/Instant';
import * as ReflectiveApi from '../../../../../api/Assessment/Reflective';
import * as CourseSessionApi from '../../../../../api/CourseSession';
import * as ReflectiveActions from '../../../../../actions/Assess/Reflelctive';
import AssessmentViewer from './AssessmentViewer';
import InstantAssessmentGraph from './Instant/Graph'
import BankedQuestionList from '../QuestionBank/BankedQuestionList';

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
      hasReviewStarted,
      startReflectiveReview,
      reflectiveNumberAnswered,
      reflectiveNumberReviewed,
      visible,
      bankId,
      removeOption,
      editOptionMode,
      editQuestionMode,
      hideOptions,
      showOptions,
      showOverlay,
      hideOverlay,
      isOverlayVisible,
      overlayType,
      clearAddDialoge,
      addOptionAddDialoge,
      addOptions,
      removeOptionAddDialoge,
      addTags,
      addTagAddDialoge,
      removeTagAddDialoge,
      addToAssessmentBank,
      editOptionClear,
      editQuestionClear,
      enterAddTagMode,
      cancelAddTagMode,
      saveEdit,
      saveTag,
      removeTag,
      remove,
      moveToBank,
      moveToQueue,
      numberInstantAssessmentAnswers,
      answersWithReviews,
    } = this.props;
    const isAssessmentActive = !!activeAssessmentType;

    let answers = 0;
    if (isInstantActive) {
      answers = numberInstantAssessmentAnswers;
    }
    if (isReflectiveActive) {
      answers = reflectiveNumberAnswered;
    };

    return (
      <div className="assess r-between">
        <div className="left-pane c">
          <AssessmentViewer
            {...this.props}
          />
          <div
            className="one-fourth-pane"
            style={{
              marginTop: '1%',
            }}
          >
            <Heading text="Stats" />
            <div
              className="r-center"
              style={{
                height: '64%',
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
                      number={answers}
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
                      number={reflectiveNumberReviewed}
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
              overflowY: 'auto',
            }}
          >
            {
              (visible.filter(ba => !!ba.inQueue).length === 0)
                ? (
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'rgba(0,0,0,0.2)',
                      marginTop: '140px',
                    }}
                    className="fullwidth no-text-sel"
                  >
                    No Assessments in Queue
                  </p>
                )
                : (
                  <BankedQuestionList
                    inAssess
                    isAssessmentActive={isAssessmentActive}
                    onUseForReflectiveClick={async (question) => {
                        try {
                          document
                            .getElementById('questiontext-reflective')
                            .value = question;
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

                          console.log("Gonna use this for assessment " + payload.reflectiveAssessmentId);
                          console.log(JSON.stringify(payload, null, 2));
                          activateReflective(payload.reflectiveAssessmentId);
                        } catch (e) {
                          console.error('[ERROR] onUseForReflectiveClick', e);
                        }
                      }}
                    onUseForInstantClick={async (question, options) => {
                        try {
                          options.forEach(o => onOptionAdd(o));
                          document
                            .getElementById('questiontext-instant')
                            .value = question;
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
                          activateInstant(payload.instantAssessmentId);
                        } catch (e) {
                          console.error('[ERROR] onStartClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    bankedAssessments={visible.filter(ba => !!ba.inQueue)}
                    onQuestionClick={(questionEditMode, baId) => {
                        if (!questionEditMode) {
                          editQuestionMode(baId);
                          return;
                        }
                      }}
                    onOptionsDropdownClick={(isOptionsVisible, baId) => {
                        console.log("isOptionsVisible", isOptionsVisible);
                        if (!!isOptionsVisible) {
                          hideOptions(baId);
                          return;
                        }
                        showOptions(baId);
                      }}
                    onOptionClick={(isOptionInEditMode, index, baId) => {
                        if (!isOptionInEditMode) {
                          editOptionMode(index, baId)
                          return;
                        }
                      }}
                    onOptionClearClick={async (index, baId) => {
                        try {
                          const payload = await BankedAssessmentApi
                            .clearOption(index, baId);
                           if (!!payload.error) {
                            toastr.error('Something went wrong please try again');
                            return;
                           }
                          removeOption(index, baId)
                        } catch (e) {
                          console.error('[ERROR] onOptionClearClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    editOptionClear={editOptionClear}
                    editQuestionClear={editQuestionClear}
                    enterAddTagMode={enterAddTagMode}
                    cancelAddTagMode={cancelAddTagMode}
                    onTagSaveClick={async function(content, tags, baId) {
                        try {
                          const payload = await BankedAssessmentApi
                            .editTags([...tags, content], baId);
                          const { error } = payload;
                          if (!!error) {
                            toastr.error('Something went wrong please try again');
                            return;
                          }
                          saveTag(baId, content)
                        } catch(e) {
                          console.error('[ERROR] onTagSaveClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    onTagRemoveClick={async function(index, tags, baId) {
                        try {
                          const payload = await BankedAssessmentApi
                            .editTags(
                              [
                                ...tags.slice(0, index),
                                ...tags.slice(index + 1),
                              ],
                              baId
                            );
                          const { error } = payload;
                          if (!!error) {
                            toastr.error('Something went wrong please try again');
                            return;
                          }
                          removeTag(baId, index);
                        } catch (e) {
                          console.error('[ERROR] onTagRemoveClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    onRemoveClick={async function(baId) {
                        try {
                          const payload = await BankedAssessmentApi.remove(baId);
                          if (!!payload.error) {
                            toastr.error('Something went wrong please try again');
                            return;
                          }
                          remove(baId);

                        } catch (e) {
                          console.error('[ERROR] onRemoveClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    onSaveClick={async function(question, options, baId) {
                        try {
                          const payload = await BankedAssessmentApi
                            .editById(baId, question, options);
                          const { error } = payload;
                          if (!!error) {
                            toastr.error('Something went wrong please try again');
                            return;
                          }
                          saveEdit(baId, payload.question, payload.options);
                        } catch (e) {
                          console.error('[ERROR] onSaveClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    onToBankClick={async (id) => {
                        try {
                          const payload = await BankedAssessmentApi.moveToBank(id)
                          if (!!payload.error) {
                            toastr.error('Something went wrong please try again');
                            return;
                          }
                          moveToBank(id);
                        } catch (e) {
                          console.error('[ERROR] onToBankClick', e);
                          toastr.error('Something went wrong please try again');
                        }
                      }}
                    onToQueueClick={async (id) => {
                        try {
                          const payload = await BankedAssessmentApi.moveToQueue(id)
                          if (!!payload.error) {
                            toastr.error('Something went wrong please try again');
                            return;
                          }
                          moveToQueue(id);
                        } catch (e) {
                          console.error('[ERROR] onToBankQueue', e);
                          toastr.error('Something went wrong please try again');
                        }

                      }}
                  />
                  )
            }
          </div>
          <div
            className="half-pane"
            style={{
              marginTop: '1%',
            }}
          >
            {mode === 'INSTANT'
            ? (
              <div id="instantGraph"> 
                <InstantAssessmentGraph /> 
              </div>
            )
            : (
              <ul
                style={{
                  padding: 8,
                  overflowY: 'auto',
                }}
              >
                {answersWithReviews.map((r) => (
                  <div className="r-between">
                    <p
                      className="reflective-answer-content"
                      style={{
                        padding: '0 9px',
                      }}
                    >
                      {r.content}
                    </p>
                    <div className="c-center">
                      <p style={{ margin: 3 }}>Agree</p>
                      <p
                        style={{
                          fontSize: 32,
                          margin: 0,
                          fontWeight: 700,
                        }}
                      >
                      {r.reviews.filter(r => r.type === 'AGREE').length}
                      </p>
                    </div>
                    <div className="c-center">
                      <p style={{ margin: 3 }}>Disagree</p>
                      <p
                        style={{
                          fontSize: 32,
                          margin: 0,
                          fontWeight: 700,
                        }}
                      >
                      {r.reviews.filter(r => r.type === 'DISAGREE').length}
                      </p>
                    </div>
                  </div>
                ))}
              </ul>
            )}
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
  bankId: state.AssessmentBank.id,
  addOptions: !!state.AssessmentBank.add
    ? state.AssessmentBank.add.options
    : [],
  addTags: !!state.AssessmentBank.add
    ? state.AssessmentBank.add.tags
    : [],
  visible: state.AssessmentBank.visible,
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
  numberInstantAssessmentAnswers: state.Assess.Instant.answers.length || 0,
  hasReviewStarted: !!state.Assess.Reflective.hasStartedReview,
  reflectiveNumberAnswered: state.Assess.Reflective.numberAnswers,
  reflectiveNumberReviewed: state.Assess.Reflective.numberReviews,
  answersWithReviews: state.Assess.Reflective.answersWithReviews || [],
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
  },
  startReflectiveReview: () => {
    dispatch(ReflectiveActions.startReview([]));
  },
  removeOption: (index, id) => {
    dispatch(AssessmentBankActions.removeOption(id, index))
  },
  editOptionMode: (index, id) => {
    dispatch(AssessmentBankActions.editOptionMode(id, index))
  },
  editQuestionMode: (id) => {
    dispatch(AssessmentBankActions.editQuestionMode(id))
  },
  hideOptions: (id) => {
    dispatch(AssessmentBankActions.hideOptions(id))
  },
  showOptions: (id) => {
    dispatch(AssessmentBankActions.showOptions(id))
  },
  receivedBankedAssessments: (bankedAssessments) => {
    dispatch(AssessmentBankActions.retrieved(bankedAssessments));
  },
  clearAddDialoge: () => {
    dispatch(AssessmentBankActions.addClear());
  },
  addOptionAddDialoge: () => {
    dispatch(AssessmentBankActions.addAnotherOption());
  },
  removeOptionAddDialoge: (options) => {
    dispatch(AssessmentBankActions.addRemoveOption(options));
  },
  addTagAddDialoge: (tag) => {
    dispatch(AssessmentBankActions.addAnotherTag(tag))
  },
  removeTagAddDialoge: (tags) => {
    dispatch(AssessmentBankActions.addRemoveTag(tags));
  },
  addToAssessmentBank: (id, tags, question, options, created) => {
    dispatch(AssessmentBankActions
      .add(
          id,
          tags,
          question,
          options,
          created
        )
    )
  },
  editOptionClear: (id) => {
    dispatch(AssessmentBankActions.editOptionClear(id));
  },
  editQuestionClear: (id) => {
    dispatch(AssessmentBankActions.editQuestionClear(id))
  },
  saveEdit: (id, question, options) => {
    dispatch(AssessmentBankActions.saveEdit(id, question, options));
  },
  enterAddTagMode: (id) => {
    dispatch(AssessmentBankActions.enterAddTagMode(id));
  },
  cancelAddTagMode: (id) => {
    dispatch(AssessmentBankActions.cancelAddTagMode(id));
  },
  saveTag: (id, tag) => {
    dispatch(AssessmentBankActions.addTag(id, tag));
  },
  removeTag: (id, index) => {
    dispatch(AssessmentBankActions.removeTag(id, index));
  },
  remove: (id) => {
    dispatch(AssessmentBankActions.remove(id));
  },
  moveToBank: (id) => {
    dispatch(AssessmentBankActions.moveToBank(id));
  },
  moveToQueue: (id) => {
    dispatch(AssessmentBankActions.moveToQueue(id));
  },
  recievedAnswersWithReviews: (answersWithReviews) => {
    dispatch(ReflectiveActions
        .recievedAnswersWithReviews(answersWithReviews))
  },
});

Assess = connect(
  stateToProps,
  dispatchToProps,
)(Assess);

export default Assess;
