import React from 'react';
import NVD3Chart from 'react-nvd3';

function calculateData(graphData, threshold) {
  const values = graphData.reduce((acc, cur, i, arr) => (
    [
      ...acc,
      {
        label: i + 1,
        value: cur,
      },
    ]
  ), []);
  return [
    {
      values,
      key: 'Active Alerts',
    },
    {
      key: 'Confusion Threshold',
      values: graphData.map(d => ({ value: d })),
    }
  ]
}

const Graph = ({
  graphData,
}) => (
  <div
    style={{
      width: "100%",

    }}

  >
    <NVD3Chart
      type="lineChart"
      datum={calculateData(graphData)}
      x="Minutes Past"
      y="% Of Students"
    />
  </div>
)

export default Graph;
