// external dependencies
import React, { PureComponent } from 'react';
//import PropTypes from "prop-types";
import BillboardChart from 'react-billboardjs';
import 'react-billboardjs/lib/billboard.css';

const CHART_DATA = {
  json: {
    man: [],
    woman: [],
  },
  data: { groups: [['man', 'waman']] },
  type: 'bar',
  labels: {
    colors: 'white',
    centered: true,
  },
};

const SIZE = {
  height: 400,
};

const CHART_AXIS = {
  //rotated: true,
  x: {
    //categories: [],
    categories: ['A', 'B', 'C', 'D', 'E'],
    type: 'category',
  },
};

const DOM_PROPS = {
  'data-type': 'bar',
};

class BarChart extends PureComponent {
  static displayName = 'BarChart';

  state = {
    data: null,
    x: null,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState(
        () => ({
          data: CHART_DATA,
          x: CHART_AXIS,
        }),
        () => {
          setTimeout(() => {
            this.element.loadData({
              json: {
                man: [130, 90, 40, 200, 100],
                woman: [100, 110, 60, 200, 50],
              },
            });
            //this.element.loadData({
            //  x: {
            //    categories: ['A', 'B', 'C', 'D', 'E'],
            //  },
            //});
            //console.log(BillboardChart.getInstances());
          }, 1000);
        },
      );
    }, 1000);
  }

  element = null;

  getRef = (Instance) => {
    this.element = Instance;
  };

  render() {
    const { data } = this.state;

    if (!data) {
      return <p>Loading...</p>;
    }

    return (
      <BillboardChart
        axis={CHART_AXIS}
        size={SIZE}
        className="bar"
        data={data}
        domProps={DOM_PROPS}
        ref={this.getRef}
      />
    );
  }
}

export default BarChart;
