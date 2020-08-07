import React from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SUBCHART = {
  show: false,
};

const LineChart = ({ data }) => {
  return <BillboardChart data={data} subchart={SUBCHART} />;
};

export default LineChart;
