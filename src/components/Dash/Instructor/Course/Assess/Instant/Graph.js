/**
 * Created by bharatbatra on 12/16/16.
 */
import React from 'react';
import NVD3Chart from 'react-nvd3';
import { selectAll, select } from 'd3-selection';
import '../../../../../../../node_modules/react-nvd3/node_modules/nvd3/build/nv.d3.min.css'
import { initGraph, reduceAnswersToCounts, countsToDatum } from '../../../../../../util/InstantAssessmentGraph'
import { connect } from 'react-redux';

function getDatum(counts, numberAnswered) {
  return countsToDatum(counts, numberAnswered);
}

var InstantAssessmentGraph = React.createClass({
  componentDidMount: function() {
  },
  render: function() {
    const {
      answerCounts, numberAnswered
    } = this.props;
    return (
      <div id="instantGraph">
        {
          React.createElement(NVD3Chart, {
            type: 'discreteBarChart',
            yDomain : [0,100],
            x: function(d){return d.label;},
            y: function(d){return d.value;},
            showValues: true,
            duration: 500,
            xAxis: {
              axisLabel: 'Options'
            },
            yAxis: {
              axisLabel: '% of students',
              axisLabelDistance: -10
            },
            datum: getDatum(answerCounts, numberAnswered)
          })
        }
      </div>
    )
  }
});


const stateToProps = (state) => ({
  answerCounts :  reduceAnswersToCounts(state.Assess.Instant.answers),
  numberAnswered : state.Assess.Instant.answers.length
});

const dispatchToProps = (dispatch) => ({

});

InstantAssessmentGraph = connect(
  stateToProps,
  dispatchToProps,
)(InstantAssessmentGraph);


export default InstantAssessmentGraph;
