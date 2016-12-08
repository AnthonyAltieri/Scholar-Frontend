import React, { Component } from 'react';
import Instant from './Instant/Instant';
import Reflective from './Reflective/Reflective';
import QuestionBank from './QuestionBank';

class Assess extends Component {
  componentDidMount() {
  }

  render() {
    const { bankedQuestions } = this.props;

    return (
      <div className="assess r-between">
        <div className="left-pane c">
          <Instant />
          <Reflective />
        </div>
        <div className="right-pane">
          <QuestionBank
            bankedQuestions={bankedQuestions || []}
            onBankedQuestionClick={async function(bankedQuestion) {
              const { id, content, options } = bankedQuestion;
            }}
            page={0}
          />
        </div>
      </div>
    );
  }
}

export default Assess;
