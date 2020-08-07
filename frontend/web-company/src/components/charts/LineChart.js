import React, { PureComponent } from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const SIZE = {
  height: 400,
};

class LineChart extends PureComponent {
  getRef = (ChartInstance) => {
    this.chartInstance = ChartInstance;
  };
  render() {
    return (
      <BillboardChart
        size={SIZE}
        data={this.props.data}
        isPure
        ref={this.getRef}
      />
    );
  }
}

export default LineChart;
