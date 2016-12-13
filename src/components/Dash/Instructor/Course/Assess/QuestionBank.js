import React from 'react';
import Heading from '../../Heading/Heading';
import BankedQuestionList from '../QuestionBank/BankedQuestionList';
import Buttons from '../Assess/Buttons';


const QuestionBank = ({
  bankedQuestions,
  page,
  onBankedQuestionClick,
}) => (
  <div>
    <Heading
      text="Question Bank"
    />
    <BankedQuestionList
      bankedQuestions={bankedQuestions}
      onBankedQuestionClick={onBankedQuestionClick}
    />
    <Buttons
      page={page || 1}
      maxNumPages={determineNumberPages(bankedQuestions.length)}
      isPager
    />
  </div>
);

export default QuestionBank;
