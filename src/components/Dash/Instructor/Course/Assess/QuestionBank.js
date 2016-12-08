import React from 'react';
import Heading from '../../Heading/Heading';
import BankedQuestionList from '../QuestionBank/BankedQuestionList';
import Buttons from '../Assess/Buttons';

const ELEMENTS_PER_PAGE = 3;
const determineNumberPages = (numberBQ) => (
  numberBQ === 0 ? 1 : Math.ceil(numberBQ / ELEMENTS_PER_PAGE)
);

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
      page={page}
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
