import React, { PureComponent } from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SIZE = {
  height: 400,
};
const CHART_AXIS = {
  x: {
    categories: ['A', 'B', 'C', 'D', 'E'],
    type: 'category',
  },
};

class BarChart extends PureComponent {
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

export default BarChart;
