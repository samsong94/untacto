// external dependencies
import React, { useEffect } from 'react';
//import PropTypes from "prop-types";
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SIZE = {
  height: 400,
};
const CHART_AXIS = {
  //rotated: true,
  x: {
    categories: ['A', 'B', 'C', 'D', 'E'],
    type: 'category',
  },
};

const BarChart = ({ data }) => {
  // const displayName = 'areaRangeChart';
  useEffect(() => {});
  return (
    <BillboardChart
      axis={CHART_AXIS}
      size={SIZE}
      data={data}
      isPure
      // ref={this.getRef}
    />
  );
};

export default BarChart;
