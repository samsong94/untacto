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
    padding: 1rem;
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
  }
  /* back, initially hidden pane */
  .back {
    position: relative;
    transform: rotateY(180deg);
    background: ${palette.indigo[5]} no-repeat;
    background-size: 100% 100%;
  }
  .back_box {
    position: absolute;
    top: 50%;
    left: 75%;
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    width: 200px;
    height: 200px;
    border-radius: 30%;
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

  .box {
    background: white;
    width: 200px;
    height: 200px;
    border-radius: 30%;
    overflow: hidden;
    border: 0.1px dashed ${palette.gray[5]};
  }
  .profile {
    margin-top: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

//내용은 나중에 바꿉시다..
const MeberPageViewer = ({ surveysAnswers, error, loading }) => {
  return (
    <>
      <HelpViewerBlock>
        <h2>Member</h2>
        <div className="trash"></div>

        <div class="t1" style={{ margin: '20px', display: 'inline-block' }}>
          <div
            class="flip-container"
            ontouchstart="this.classList.toggle('hover');"
            style={{ display: 'inline-block' }}
          >
            <div class="flipper">
              <div class="front">
                <div className="box">
                  <img className="profile" src="imgs/psw.jpg" alt="profile" />
                </div>
              </div>
              <div class="back">
                <div className="back_box">Backend</div>
              </div>
            </div>
          </div>
          <div className="trash">
            <text>팀장 박성우</text>
          </div>
        </div>

        <div class="t1" style={{ margin: '20px', display: 'inline-block' }}>
          <div
            class="flip-container"
            ontouchstart="this.classList.toggle('hover');"
            style={{ display: 'inline-block' }}
          >
            <div class="flipper">
              <div class="front">
                <div className="box">
                  <img className="profile" src="imgs/sjh.jpg" alt="profile" />
                </div>
              </div>
              <div class="back">
                <div className="back_box">Backend</div>
              </div>
            </div>
          </div>
          <div className="trash">
            <text>팀원 송재훈</text>
          </div>
        </div>

        <div class="t1" style={{ margin: '20px', display: 'inline-block' }}>
          <div
            class="flip-container"
            ontouchstart="this.classList.toggle('hover');"
            style={{ display: 'inline-block' }}
          >
            <div class="flipper">
              <div class="front">
                <div className="box">
                  <img className="profile" src="imgs/lsj.jpg" alt="profile" />
                </div>
              </div>
              <div class="back">
                <div className="back_box">Embedded</div>
              </div>
            </div>
          </div>
          <div className="trash">
            <text>팀원 이승진</text>
          </div>
        </div>

        <div class="t1" style={{ margin: '20px', display: 'inline-block' }}>
          <div
            class="flip-container"
            ontouchstart="this.classList.toggle('hover');"
            style={{ display: 'inline-block' }}
          >
            <div class="flipper">
              <div class="front">
                <div className="box">
                  <img className="profile" src="imgs/cyb.jpg" alt="profile" />
                </div>
              </div>
              <div class="back">
                <div className="back_box">Frontend</div>
              </div>
            </div>
          </div>
          <div className="trash">
            <text>팀원 차영부</text>
          </div>
        </div>

        <div class="t1" style={{ margin: '20px', display: 'inline-block' }}>
          <div
            class="flip-container"
            ontouchstart="this.classList.toggle('hover');"
            style={{ display: 'inline-block' }}
          >
            <div class="flipper">
              <div class="front">
                <div className="box">
                  <img className="profile" src="imgs/hsm.jpg" alt="profile" />
                </div>
              </div>
              <div class="back">
                <div className="back_box">Frontend</div>
              </div>
            </div>
          </div>
          <div className="trash">
            <text>팀원 하승민</text>
          </div>
        </div>
      </HelpViewerBlock>
    </>
  );
};

export default MeberPageViewer;
