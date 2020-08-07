import React from 'react';
import LineChart from '../../components/charts/LineChart';

const LineChartContainer = ({ jsonData }) => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: jsonData,
    type: 'line',
  };
  return <LineChart data={data} />;
};

export default LineChartContainer;
