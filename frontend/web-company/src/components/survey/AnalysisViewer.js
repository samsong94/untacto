import React from 'react';
import styled, { css } from 'styled-components';
import Main from '../common/Main';
import palette from '../../lib/styles/palette';
import AreaRangeChart from '../charts/AreaRangeChart';
import DonutChart from '../charts/DonutChart';
import BarChart from '../charts/BarChart';

const AnalysisViewerBlock = styled(Main)`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: 50px 400px 400px;
  grid-gap: 1rem;
  h2 {
    grid-column: 1 / 3;
    grid-row: 1/ 2;
  }
  .one {
    grid-column: 1 / 3;
    grid-row: 2/ 3;
  }
  .two {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }
  .three {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }

  @media (max-width: 1024px) {
    grid-template-rows: 50px 400px 400px 400px;
    padding-left: 2rem;
    padding-right: 2rem;
    .one {
      grid-column: 1 / 3;
      grid-row: 2/ 3;
    }
    .two {
      grid-column: 1 / 3;
      grid-row: 3 / 4;
    }
    .three {
      grid-column: 1 / 3;
      grid-row: 4 / 5;
    }
  }

  ${(props) =>
    props.more &&
    css`
      left: 0;
      margin-top: 300px;
      background: white;
      grid-template-rows: 50px 400px 400px 400px;
      .four {
        grid-column: 1 / 2;
        grid-row: 4 / 5;
      }
      .five {
        grid-column: 2 / 3;
        grid-row: 4 / 5;
      }
      @media (max-width: 1024px) {
        grid-template-rows: 50px 400px 400px 400px 400px 400px;
        padding-left: 2rem;
        padding-right: 2rem;
        .one {
          grid-column: 1 / 3;
          grid-row: 2/ 3;
        }
        .two {
          grid-column: 1 / 3;
          grid-row: 3 / 4;
        }
        .three {
          grid-column: 1 / 3;
          grid-row: 4 / 5;
        }
        .four {
          grid-column: 1 / 3;
          grid-row: 5/ 6;
        }
        .five {
          grid-column: 1 / 3;
          grid-row: 6 / 7;
        }
      }
    `}
`;

const AnalysisItem = styled.div`
  background: ${palette.indigo[1]};
`;

// 여기 밑에 one, two, three 적혀있는 안에다가 넣으면 됩니당
const AnalysisViewer = (props) => {
  return props.more ? (
    <>
      <AnalysisViewerBlock {...props}>
        <h2>설문 분석</h2>
        <AnalysisItem className="one">
          <AreaRangeChart />
        </AnalysisItem>
        <AnalysisItem className="two">
          <DonutChart />
        </AnalysisItem>
        <AnalysisItem className="three">
          <BarChart />
        </AnalysisItem>
        <AnalysisItem className="four">
          <DonutChart />
        </AnalysisItem>
        <AnalysisItem className="five">
          <BarChart />
        </AnalysisItem>
      </AnalysisViewerBlock>
    </>
  ) : (
    <>
      <AnalysisViewerBlock {...props}>
        <h2>설문 현황</h2>
        <AnalysisItem className="one">
          <AreaRangeChart />
        </AnalysisItem>
        <AnalysisItem className="two">
          <DonutChart />
        </AnalysisItem>
        <AnalysisItem className="three">
          <BarChart />
        </AnalysisItem>
      </AnalysisViewerBlock>
    </>
  );
};

export default AnalysisViewer;
