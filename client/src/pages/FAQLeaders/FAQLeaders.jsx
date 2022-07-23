import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAnsweredQuestions, sortQuestions, getUnansweredQuestions } from './functions';
import './FAQLeaders.scss';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';

const PageFAQLeaders = () => {
  const [isUnanswered, setIsUnanswered] = useState(false);
  // <FAQLeadersAnsweredQuestions/>
  return (
    <div className={'faq-leaders-page'}>
      <Checkboxes
        values={['Unanswered']}
        onSelected={() => {
          setIsUnanswered(!isUnanswered);
        }}
      />
      <div className={`${!isUnanswered ? 'faq-leaders-hide-questions' : ''}`}>HELLO</div>
      <div className={`${isUnanswered ? 'faq-leaders-hide-questions' : ''}`}>
        <FAQLeadersUnansweredQuestions />
      </div>
    </div>
  );
};

const FAQLeadersAnsweredQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const answeredQuestions = getAnsweredQuestions();
  console.log(answeredQuestions);
  const questionCategories = [];
  const processedAnsweredQuestions = {};
  const allQuestions = [];
  sortQuestions(answeredQuestions, questionCategories, processedAnsweredQuestions);
  for (let i = 0; i < Object.keys(processedAnsweredQuestions).length; i++) {
    allQuestions.push(processedAnsweredQuestions[Object.keys(processedAnsweredQuestions)[i]]);
  }
  const selectedQuestions = allQuestions[activeIndex].map((question, index) => (
    <div key={index} className={'faq-leaders-questions-container'}>
      <div className={'faq-leaders-questions'}>{question.question}</div>
      <div className={'faq-leaders-answers'}>{question.answer}</div>
    </div>
  ));
  return (
    <div>
      <FAQLeadersButtons
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        questionCategories={questionCategories}
      />
      {selectedQuestions}
    </div>
  );
};

const FAQLeadersUnansweredQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const unansweredQuestions = getUnansweredQuestions();
  console.log(unansweredQuestions);
  const questionCategories = [];
  const processedAnsweredQuestions = {};
  const allQuestions = [];
  sortQuestions(unansweredQuestions, questionCategories, processedAnsweredQuestions);
  for (let i = 0; i < Object.keys(processedAnsweredQuestions).length; i++) {
    allQuestions.push(processedAnsweredQuestions[Object.keys(processedAnsweredQuestions)[i]]);
  }
  const selectedQuestions = allQuestions[activeIndex].map((question, index) => (
    <div key={index} className={'faq-leaders-questions-container'}>
      <div className={'faq-leaders-questions-smaller'}>{question.question}</div>
    </div>
  ));
  return (
    <div>
      <FAQLeadersButtons
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        questionCategories={questionCategories}
      />
      {selectedQuestions}
    </div>
  );
};

const FAQLeadersButtons = ({ activeIndex, setActiveIndex, questionCategories }) => {
  return (
    <div>
      <ButtonSelector
        buttonList={questionCategories}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        maxWidthButton={200}
      />
    </div>
  );
};

FAQLeadersButtons.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  questionCategories: PropTypes.array.isRequired,
};

export { PageFAQLeaders };
