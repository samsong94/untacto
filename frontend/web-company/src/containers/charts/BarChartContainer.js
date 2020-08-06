import React from 'react';
import BarChart from '../../components/charts/BarChart';

const BarChartContainer = () => {
    const data = {
      background: {
        color: '#ffffff',
      },
      x:'x',
      json: {
        man: [130, 90, 40, 200, 100],
        woman: [100, 110, 60, 200, 50],
      },
      groups: [['man', 'waman']],
      type: 'bar',
    };
    return <BarChart data={data} />;
  };
  
  export default BarChartContainer;
  