import React from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SIZE = {
  height: 400,
};
const STYLE = {
  display: 'inline-block',
};

const DonutChart = ({ data }) => {
  return <BillboardChart data={data} size={SIZE} style={STYLE} />;
};

export default DonutChart;
