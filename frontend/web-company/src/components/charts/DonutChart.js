// external dependencies
import React, { useEffect } from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

//0~1 사이의 범위
const SIZE = {
  height: 400,
};
const STYLE = {
  display: 'inline-block',
};

const DonutChart = ({ data }) => {
  // const displayName = 'areaRangeChart';
  useEffect(() => {});
  return (
    <BillboardChart
      size={SIZE}
      style={STYLE}
      data={data}
      isPure
      // ref={this.getRef}
    />
  );
};

export default DonutChart;
