// external dependencies
import React, { PureComponent } from 'react';
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

//0~1 사이의 범위
const LINE_CHART_DATA = {
  json: {
    anger: [],
    contemp: [],
    disqust: [],
    fear: [],
    happiness: [],
    neutral: [],
    sadness: [],
    surprise: [],
  },
  type: 'line',
};

const SUBCHART = {
  show: false,
};

class LineChart extends PureComponent {
  static displayName = 'LineChart';

  state = {
    data: LINE_CHART_DATA,
  };

  componentDidMount() {
    setTimeout(() => {
      this.element.loadData({
        json: {
          anger: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          contemp: [0.1, 0.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          disqust: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          fear: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          happiness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          neutral: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          sadness: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          surprise: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      });
      //this.setState(
      //  ({ data }) => {
      //    return {
      //      data: {
      //        ...data,
      //        columns: data.columns.map((values) => {
      //          return values[0] === 'data3'
      //            ? ['data3', 130, 150, 200, 300, 200, 100]
      //           : values;
      //        }),
      //     },
      //    };
      //  },
      //() => {
      //  setTimeout(() => {
      //    this.element.unloadData({
      //      ids: "data1",
      //    });
      //  }, 1000);
      //}
      //);
    }, 1000);
  }

  element = null;

  getRef = (Instance) => {
    this.element = Instance;
  };

  render() {
    return (
      <BillboardChart
        data={this.state.data}
        isPure
        ref={this.getRef}
        subchart={SUBCHART}
      />
    );
  }
}

export default LineChart;
