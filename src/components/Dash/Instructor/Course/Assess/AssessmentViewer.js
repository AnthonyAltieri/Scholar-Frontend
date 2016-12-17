import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Instant from './Instant/Instant';
import Reflective from './Reflective/Reflective';
import * as InstantApi from '../../../../../api/Assessment/Instant';
import * as ReflectiveApi from '../../../../../api/Assessment/Reflective';
import { toastr } from 'react-redux-toastr';


const AssessmentViewer = ({
  mode,
  setAssessmentViewMode,
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
  assessmentId,
}) => {
  let instantQuestion;
  let optionNodes = [];
  let reflectiveQuestion;

  let displayedAssessment = null;
  if (mode === 'INSTANT') {
    displayedAssessment = (
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
          console.log('optionsRef n', n);
          optionNodes = [
            ...optionNodes,
            n
          ];
        }}
        onStartClick={async function(
          correctOption,
        ) {
          const question = instantQuestion.value;
          console.log('optionNodes', optionNodes);
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
            activateInstant(payload.instantAssessmentId);
          } catch (e) {
            console.error('[ERROR] onStartClick', e);
            toastr.error('Something went wrong please try again');
          }
        }}
        onEndClick={async function() {
          try {
            const correct = correctOption || -1;
            const payload = await InstantApi
              .deactivate(courseSessionId, correct, assessmentId);
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
    )
  } else if (mode === 'REFLECTIVE') {
    displayedAssessment = (
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
            const payload = await ReflectiveApi.deactivate(courseSessionId);
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

    )
  } else {
    throw new Error(`Invalid assessment mode ${mode}`);
  }

  return (
    <div className="left-pane fullwidth two-thirds-pane">
      <div className="r-center">
        <div
          style={{
            width: '50%',
          }}
        >
          <RaisedButton
            label="reflective"
            primary={mode === 'REFLECTIVE'}
            onTouchTap={() => {
              if (mode === 'REFLECTIVE') return;
              setAssessmentViewMode('REFLECTIVE')
            }}
            fullWidth
          />
        </div>
        <div
          style={{
            width: '50%',
          }}
        >
          <RaisedButton
            label="instant"
            primary={mode === 'INSTANT'}
            onTouchTap={() => {
              if (mode === 'INSTANT') return;
              setAssessmentViewMode('INSTANT')
            }}
            fullWidth
          />
        </div>
      </div>
      {displayedAssessment}
    </div>
  );
};

export default AssessmentViewer;
