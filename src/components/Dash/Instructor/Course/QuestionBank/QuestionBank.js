import React, { Component } from 'react';
import { connect } from 'react-redux';
import Heading from '../../Heading/Heading'
import Colors from '../../../../../util/Colors';
import BankedQuestion from './BankedQuestion';

class QuestionBank extends Component {
  render() {
    return (
      <div className="question-bank">
        <div className="full-pane c-between">
          <Heading
            text="Question Bank"
          />
          <div
            className="r fullwidth"
            style={{
              height: '100%',
            }}
          >
            <div className="c halfwidth fullheight">
              <div className="r-center fullwidth">
                <p className="bank-section">Storage</p>
              </div>
              <ul
                className="fullwidth"
                style={{
                  padding: '0px 8px',
                  margin: 0,
                  listStyle: 'none'
                }}
              >
                <BankedQuestion
                  content="This is a test question"
                  options={[
                    {
                      content: 'Option one here right now',
                    },
                    {
                      content: 'Option one here right now',
                    },
                    {
                      content: 'Option one here right now',
                    },
                    {
                      content: 'Option one here right now',
                    },
                    {
                      content: 'Option one here right now',
                    },
                  ]}
                />

              </ul>
            </div>
            <hr
              style={{
                height: '80%',
                width: 2,
                backgroundColor: Colors.lightGray,
                border: 'none'
              }}
            />
            <div className="c halfwidth fullheight">
              <div className="r-center fullwidth">
                <p className="bank-section">In Bank</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

const stateToProps = (state) => ({
});

const dispatchToProps = (dispatch) => ({
});

QuestionBank = connect(
  stateToProps,
  dispatchToProps,
)(QuestionBank);

export default QuestionBank;
