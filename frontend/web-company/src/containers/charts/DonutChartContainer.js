import React from 'react';
import DonutChart from '../../components/charts/DonutChart';

const DonutChartContainer = ({ jsonData }) => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: jsonData,
    type: 'pie',
  };
  return <DonutChart data={data} />;
};

export default DonutChartContainer;
