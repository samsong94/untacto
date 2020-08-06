import React from 'react';
import AreaRangeChart from '../../components/charts/AreaRangeChart';

const AreaRangeChartContainer = () => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: {
      x: [
        '2013-01-01',
        '2013-01-02',
        '2013-01-03',
        '2013-01-04',
        '2013-01-05',
        '2013-01-06',
      ],
      total: [130, 240, 200, 500, 250, 350],
      survey1: [60, 120, 40, 50, 100, 120],
      survey2: [70, 120, 160, 450, 150, 230],
    },
    types: {
      total: 'area',
      survey1: 'area',
      survey2: 'area',
    },
  };
  return <AreaRangeChart data={data} />;
};

export default AreaRangeChartContainer;
