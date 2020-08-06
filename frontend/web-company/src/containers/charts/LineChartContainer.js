import React from 'react';
import LineChart from '../../components/charts/LineChart';

const LineChartContainer = () => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: {
        anger: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        contemp: [0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        disqust: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        neutral: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    type: 'line',
  };
  return <LineChart data={data} />;
};

export default LineChartContainer;
