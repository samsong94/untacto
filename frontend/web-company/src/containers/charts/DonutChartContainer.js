import React from 'react';
import DonutChart from '../../components/charts/DonutChart';

const DonutChartContainer = () => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: {
        '~20': [2, 3, 1],
        '20~29': [1, 5, 5],
        '30~39': [3, 2, 6],
        '40~49': [5, 3, 6],
        '50~59': [3, 1, 2],
        '60~': [1, 2, 3],
    },
    type: 'pie',
  };
  return <DonutChart data={data} />;
};

export default DonutChartContainer;
