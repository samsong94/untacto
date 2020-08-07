import React from 'react';
import BarChart from '../../components/charts/BarChart';

const BarChartContainer = ({ jsonData }) => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: jsonData,
    groups: [['man', 'waman']],
    type: 'bar',
  };
  return <BarChart data={data} />;
};

export default BarChartContainer;
