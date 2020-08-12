import React from 'react';
import styled from 'styled-components';
import Main from '../common/Main';
import palette from '../../lib/styles/palette';
import AreaRangeChart from '../charts/AreaRangeChart';
import BarChart from '../charts/BarChart';
import DonutChart from '../charts/DonutChart';

const DashboardViewerBlock = styled(Main)`
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
`;

const DashboardItem = styled.div`
  background: ${palette.indigo[1]};
`;

const DashboardViewer = ({ surveysAnswers, error, loading }) => {
  // if (error) {
  //   return <DashboardViewerBlock>에러가 발생했습니다</DashboardViewerBlock>;
  // }

  const bySurveyData = {
    x: 'x',
    columns: surveysAnswers.bySurvey,
    types: {
      total: 'area',
      survey1: 'area',
      survey2: 'area',
    },
  };

  const byAgeData = {
    json: surveysAnswers.byAge,
    type: 'pie',
  };

  const byGenderData = {
    columns: surveysAnswers.byGender.data,
    categories: surveysAnswers.byGender.categories,
    data: { groups: [['man', 'waman']] },
    type: 'bar',
    labels: {
      colors: 'white',
      centered: true,
    },
  };

  return (
    <DashboardViewerBlock>
      <>
        <h2>설문 현황</h2>
        <DashboardItem className="one">
          <AreaRangeChart data={bySurveyData} />
        </DashboardItem>
        <DashboardItem className="two">
          <DonutChart data={byAgeData} />
        </DashboardItem>
        <DashboardItem className="three">
          <BarChart data={byGenderData} />
        </DashboardItem>
      </>
    </DashboardViewerBlock>
  );
};

export default DashboardViewer;
