import React, { Component } from 'react';
import { connect } from 'react-redux';
import Instant from './Instant/Instant';
import Reflective from './Reflective/Reflective';
import QuestionBank from './QuestionBank';
import * as InstantActions from '../../../../../actions/Assess/Instant'
//import * as ReflectiveActions from '../../../../../actions/Assess/Reflective'
import * as AssessActions from '../../../../../actions/Assess/Assess'

class Assess extends Component {
  componentDidMount() {
  }

  render() {
    const {
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
    } = this.props;

    let instantQuestion;

    return (
      <div className="assess r-between">
        <div className="left-pane c">
          <Instant
            options={instantOptions}
            isActive={isInstantActive}
            onOptionAdd={onOptionAdd}
            onOptionClear={onOptionClear}
            onOptionClearClick={onOptionClearClick}
            onOptionContentClick={onOptionContentClick}
            questionRef={(n) => {
              instantQuestion = n;
            }}
            onStartClick={async function() {
              try {
                // TODO: make api call
              } catch (e) {
                console.error('[ERROR] onStartClick', e);
              }
            }}
            onEndClick={async function() {
              try {
                // TODO: make api call
              } catch (e) {
                console.error('[ERROR] onEndClick', e);
              }
            }}
          />
          <Reflective
            isActive={isReflectiveActive}
            onStartClick={async function() {
              try {
                // TODO: make api call
              } catch (e) {
                console.error('[ERROR] onStartClick', e);
              }
            }}
            onEndClick={async function() {
              try {
                // TODO: make api call
              } catch (e) {
                console.error('[ERROR] onEndClick', e);
              }
            }}
          />
        </div>
        <div className="right-pane">
          //Question bank goes here
        </div>
      </div>
    );
  }
}

const stateToProps = (state) => ({
  isInstantActive: !!state.Assess.Instant.isActive,
  instantOptions: state.Assess.Instant.options || [],
  isReflectiveActive: !!state.Assess.Reflective.isActive,
});

const dispatchToProps = (dispatch) => ({
  onOptionAdd: (content) => {
    dispatch(InstantActions.addOption(content));
  },
  onOptionClearClick: (index) => {
    dispatch(InstantActions.removeOption(index))
  },
  activateInstant: () => {
    dispatch(AssessmentActions.activate('INSTANT'));
  },
  activateReflective: () => {
    dispatch(AssessmentActions.activate('REFLECTIVE'));
  },
  deactivate: () => {
    dispatch(AssessmentActions.deactivate());
  },
});

Assess = connect(
  stateToProps,
  dispatchToProps,
)(Assess);

export default Assess;
