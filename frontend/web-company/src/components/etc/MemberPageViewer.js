import React from 'react';
import styled from 'styled-components';
import Main from '../common/Main';
import palette from '../../lib/styles/palette';

const HelpViewerBlock = styled(Main)`
  margin: 0 auto;
  padding: 4rem;

  h2 {
    font-size: 1.75rem;
    color: #373d51;
    padding: 1.3rem;
    margin: 0;
  }

  .trash {
    padding: 2rem;
  }
  .t1 {
    padding: 1.2rem;
    .front {
      background: url('https://user-images.githubusercontent.com/48918003/89265525-981d6a80-d66f-11ea-8d52-9f000338642c.jpg')
        no-repeat;
      background-size: 100% 100%;
    }
    .back {
    }
  }
  .t2 {
    padding: 1.2rem;
    .front {
      background: url('https://user-images.githubusercontent.com/48918003/89265586-af5c5800-d66f-11ea-86e0-fad5b630cedc.jpg')
        no-repeat;
      background-size: 100% 100%;
    }
    .back {
    }
  }
  .t3 {
    padding: 1.2rem;
    .front {
      background: url('https://user-images.githubusercontent.com/48918003/89265636-c1d69180-d66f-11ea-84d0-4726787309a7.jpg')
        no-repeat;
      background-size: 100% 100%;
    }
    .back {
    }
  }
  .t4 {
    padding: 1.2rem;
    .front {
      background: url('https://user-images.githubusercontent.com/48918003/89261383-ec711c00-d668-11ea-957c-dea3a5670f71.jpg')
        no-repeat;
      background-size: 100% 100%;
    }
    .back {
    }
  }
  .t5 {
    padding: 1.2rem;
    .front {
      background: url('https://user-images.githubusercontent.com/48918003/89260562-7c15cb00-d667-11ea-92bf-af8f5858395b.jpg')
        no-repeat;
      background-size: 100% 100%;
    }
    .back {
    }
  }

  .flip-container {
    perspective: 1000px;
    border: 2px solid rgba(0, 0, 0, 0) !important;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
    background-size: 100% 100%;
    border-radius: 70%;
  }
  /* back, initially hidden pane */
  .back {
    position: relative;
    transform: rotateY(180deg);
    background: ${palette.indigo[5]} no-repeat;
    background-size: 100% 100%;
    border-radius: 70%;
  }
  .back_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  /* flip the pane when hovered */
  .flip-container:hover .flipper,
  .flip-container.hover .flipper {
    transform: rotateY(180deg);
  }

  .flip-container,
  .front,
  .back {
    width: 250px;
    height: 350px;
    /*border:1px solid lightgray;*/
  }
  /* flip speed goes here */
  .flipper {
    transition: 0.6s;
    /* 하위요소에 3D 좌표값 지정 */
    transform-style: preserve-3d;
    position: relative;
  }
  /* hide back of pane during swap */
  .front,
  .back {
    position: absolute;
    backface-visibility: hidden;
  }
`;

//내용은 나중에 바꿉시다..
const MeberPageViewer = ({ surveysAnswers, error, loading }) => {
  return (
    <>
      <HelpViewerBlock>
        <h2>Member</h2>
        <div className="trash"></div>
        <div className="t1" style={{ display: 'inline-block' }}>
          <div
            className="flip-container"
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className="flipper">
              <div className="front"></div>
              <div className="back">
                <div className="back_box">박성우</div>
              </div>
            </div>
          </div>
        </div>
        <div className="t2" style={{ display: 'inline-block' }}>
          <div
            className="flip-container"
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className="flipper">
              <div className="front"></div>
              <div className="back">
                <div className="back_box">송재훈</div>
              </div>
            </div>
          </div>
        </div>
        <div className="t3" style={{ display: 'inline-block' }}>
          <div
            className="flip-container"
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className="flipper">
              <div className="front"></div>
              <div className="back">
                <div className="back_box">이승진</div>
              </div>
            </div>
          </div>
        </div>
        <div className="t4" style={{ display: 'inline-block' }}>
          <div
            className="flip-container"
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className="flipper">
              <div className="front"></div>
              <div className="back">
                <div className="back_box">차영부</div>
              </div>
            </div>
          </div>
        </div>
        <div className="t5" style={{ display: 'inline-block' }}>
          <div
            className="flip-container"
            ontouchstart="this.classList.toggle('hover');"
          >
            <div className="flipper">
              <div className="front"></div>
              <div className="back">
                <div className="back_box">하승민</div>
              </div>
            </div>
          </div>
        </div>
      </HelpViewerBlock>
    </>
  );
};

export default MeberPageViewer;
