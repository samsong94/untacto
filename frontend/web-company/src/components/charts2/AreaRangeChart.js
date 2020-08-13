import React, { PureComponent } from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SIZE = {
  height: 400,
};
const CHART_AXIS = {
  x: {
    type: 'timeseries',
    tick: {
      format: '%Y-%m-%d',
    },
  },
};

class AreaRangeChart extends PureComponent {
  getRef = (ChartInstance) => {
    this.chartInstance = ChartInstance;
  };
  render() {
    return (
      <BillboardChart
        axis={CHART_AXIS}
        size={SIZE}
        data={this.props.data}
        isPure
        ref={this.getRef}
      />
    );
  }
}

export default AreaRangeChart;
