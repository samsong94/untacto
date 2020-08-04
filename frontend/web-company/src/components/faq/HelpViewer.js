import React from 'react';
import styled from 'styled-components';
import Main from '../common/Main';
import palette from '../../lib/styles/palette';

const HelpViewerBlock = styled(Main)`
  margin: 0 auto;
  padding: 4rem;
  width: 48rem;

  display: grid;
  grid-template-columns: repeat(2, 100%);
  grid-gap: 1rem;

  h2 {
    font-size: 1.75rem;
    color: #373d51;
    padding: 1.3rem;
    margin: 0;
  }

  .accordion a {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
    padding: 1rem 3rem 1rem 1rem;
    color: #7288a2;
    font-size: 1.15rem;
    font-weight: 400;
    border-bottom: 1px solid #e5e5e5;
  }

  .accordion a:hover,
  .accordion a:hover::after {
    cursor: pointer;
    color: ${palette.indigo[5]};
  }

  .accordion a:hover::after {
    border: 1px solid ${palette.indigo[5]};
  }

  .accordion a.active {
    color: ${palette.indigo[5]};
    border-bottom: 1px solid ${palette.indigo[5]};
  }

  .accordion a::after {
    font-family: 'Ionicons';
    content: '\f218';
    position: absolute;
    float: right;
    right: 1rem;
    font-size: 1rem;
    color: #7288a2;
    padding: 5px;
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 1px solid #7288a2;
    text-align: center;
  }

  .accordion a.active::after {
    font-family: 'Ionicons';
    content: '\f209';
    color: #ff5353;
    border: 1px solid #ff5353;
  }

  @media (max-width: 1024px) {
    grid-template-rows: 50px 400px 400px 400px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

//content 관련 css (넣고 싶은데 잘 안되네요...고민 좀 더 해볼게요)
/*
.accordion .content {
  opacity: 0;
  padding: 0 1rem;
  max-height: 0;
  border-bottom: 1px solid #e5e5e5;
  overflow: hidden;
  clear: both;
  -webkit-transition: all 0.2s ease 0.15s;
  -o-transition: all 0.2s ease 0.15s;
  transition: all 0.2s ease 0.15s;
}
.accordion .content p {
  font-size: 1rem;
  font-weight: 300;
}
.accordion .content.active {
  opacity: 1;
  padding: 1rem;
  max-height: 100%;
  -webkit-transition: all 0.35s ease 0.15s;
  -o-transition: all 0.35s ease 0.15s;
  transition: all 0.35s ease 0.15s;
}
*/

//javascript 파일 내용인데 적용이 안되는거 같아요,,
const items = document.querySelectorAll('.accordion a');

function toggleAccordion() {
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
}

items.forEach((item) => item.addEventListener('click', toggleAccordion));

//내용은 나중에 바꿉시다..
const HelpViewer = ({ surveysAnswers, error, loading }) => {
  return (
    <>
      <HelpViewerBlock>
        <h2>Frequently Asked Questions</h2>

        <div className="accordion">
          <div className="accordion-item">
            <a>What can JavaScript Do?</a>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                viverra suspendisse potenti.
              </p>
            </div>
          </div>
          <div className="accordion-item">
            <a>How JavaScript Can Modify HTML and CSS Values?</a>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                viverra suspendisse potenti.
              </p>
            </div>
          </div>
          <div className="accordion-item">
            <a>What Is SVG?</a>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                viverra suspendisse potenti.
              </p>
            </div>
          </div>
          <div className="accordion-item">
            <a>Is FAQ Section Matters In Website?</a>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                viverra suspendisse potenti.
              </p>
            </div>
          </div>
          <div className="accordion-item">
            <a>How To Create a Light FAQ Element?</a>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Elementum sagittis vitae et leo duis ut. Ut tortor pretium
                viverra suspendisse potenti.
              </p>
            </div>
          </div>
        </div>
      </HelpViewerBlock>
    </>
  );
};

export default HelpViewer;
