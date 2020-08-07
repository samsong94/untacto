import React from 'react';
import AreaRangeChart from '../../components/charts/AreaRangeChart';

const AreaRangeChartContainer = ({ jsonData }) => {
  const data = {
    background: {
      color: '#ffffff',
    },
    x: 'x',
    json: jsonData,
    types: {
      total: 'area',
      survey1: 'area',
      survey2: 'area',
    },
  };
  return <AreaRangeChart data={data} />;
};

export default AreaRangeChartContainer;
