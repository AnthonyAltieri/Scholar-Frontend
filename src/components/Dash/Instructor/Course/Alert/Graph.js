import React from 'react';
import NVD3Chart from 'react-nvd3';
import '../../../../../../node_modules/react-nvd3/node_modules/nvd3/build/nv.d3.min.css'
import { initAlertGraph } from '../../../../../util/Graph'

function getDatum() {
 return initAlertGraph();
}

var AlertGraph = React.createClass({
  getInitialState: function() {
    return { count: 1}
  },
  handleClick: function() {
    this.setState({count: this.state.count + 1})
  },
  render: function() {
    const data = getDatum();
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
            datum: data,
            x: 'label',
            y: 'value',
            callback: (graph) => {
              console.log(" Alert Chart Callback");
              console.log(" Alert Chart Callback");
              console.log(" Alert Chart Callback");
              console.log(" Alert Chart Callback");
              console.log(" Alert Chart Callback");
            },
            renderEnd: (graph) => {
              console.log(" render end");
              console.log(" render end");
              console.log(" render end");
              console.log(" render end");
            },

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

export default AlertGraph;
