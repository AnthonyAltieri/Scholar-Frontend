import React from 'react';
import NVD3Chart from 'react-nvd3';
import { selectAll } from 'd3-selection';
import '../../../../../../node_modules/react-nvd3/node_modules/nvd3/build/nv.d3.min.css'
import { initInstructorAlertGraph } from '../../../../../util/AlertGraph'
import { connect } from 'react-redux';

function getDatum() {
 return initInstructorAlertGraph();
}

var AlertGraph = React.createClass({
  getInitialState: function() {
    return { count: 1}
  },
  handleClick: function() {
    this.setState({count: this.state.count + 1})
  },
  componentWillReceiveProps: function(nextProps){
    let graph = selectAll("#lineChart");
    let circles = graph.selectAll("path");
    circles.remove();
  },
  componentDidMount: function() {

  },
  render: function() {
    return (
      <div id="lineChart">
        {
          React.createElement(NVD3Chart, {
            xAxis: {
              tickFormat: function(d){ return d; },
              axisLabel: 'Time (minutes)'
            },
            yAxis: {
              tickFormat: function(d) {return parseFloat(d).toFixed(2); },
              axisLabel: 'Percentage Of Students',
              axisLabelDistance: -10
            },
            yDomain: [0, 100],
            type:'lineChart',
            datum: this.props.data,
            tooltip: {
              enabled : false
            },
            x: 'label',
            y: 'value',
            duration: 1,
            margin: {
              left: 200
            }
          })
        }
      </div>
    )
  }
});


const stateToProps = (state) => ({
  data: state.Graph.Alert.graph,
  activeAlerts : state.Graph.Alert.activeAlerts,
  attendance : state.Course.Attendance.numberAttendees
});

const dispatchToProps = (dispatch) => ({

});

AlertGraph = connect(
  stateToProps,
  dispatchToProps,
)(AlertGraph);


export default AlertGraph;
