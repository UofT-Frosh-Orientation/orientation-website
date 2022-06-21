import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { getInformation } from './functions';
import './FAQ.scss';
import Wave from '../../assets/misc/wave_bg.png';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import { Button } from '../../components/button/Button/Button';
import SearchIcon from '../../assets/misc/magnifying-glass-solid.svg';
import DeleteIcon from '../../assets/misc/circle-xmark-solid.svg';

const PageFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const data = [
    {
      question: 'Test Question 1',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'Test Question 2',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'General',
    },
    {
      question: 'Test Question 3',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
    {
      question: 'Test Question 4',
      answer: 'Test Answer 1',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Kits',
    },
    {
      question: 'Test Question 5',
      answer: 'Test Answer 2',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
    {
      question: 'Test Question 6',
      answer: 'Test Answer 3',
      lastUpdated: '2:00 pm',
      category: 'F!rosh Group',
    },
  ];
  const unsortedQuestions = [];
  const generalQuestions = [];
  const FroshKitsQuestions = [];
  const FroshGroupQuestions = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].category == 'General') {
      generalQuestions.push({ question: data[i].question, answer: data[i].answer });
    }
    if (data[i].category == 'F!rosh Kits') {
      FroshKitsQuestions.push({ question: data[i].question, answer: data[i].answer });
    }
    if (data[i].category == 'F!rosh Group') {
      FroshGroupQuestions.push({ question: data[i].question, answer: data[i].answer });
    }
    unsortedQuestions.push({ question: data[i].question, answer: data[i].answer, id: i });
  }
  const allQuestions = [generalQuestions, FroshKitsQuestions, FroshGroupQuestions];
  return (
    <div>
      <FAQPageHeader
        questions={unsortedQuestions}
        setIsSearch={setIsSearch}
        setSelectedQuestion={setSelectedQuestion}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className={'faq-button-selector-container'}>
        <FAQButtons
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setIsSearch={setIsSearch}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className={`faq-accordion-container ${isSearch ? 'faq-hide-accordion' : ''}`}>
        <FAQCategoryAccordions
          allQuestions={allQuestions}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className={`${isSearch ? '' : 'faq-hide-accordion'}`}>
        <FAQDisplaySearchQuestion
          selectedQuestion={selectedQuestion}
          questions={unsortedQuestions}
        />
      </div>
      <div className={'faq-ask-question-outer-container'}>
        <FAQAskQuestion />
      </div>
    </div>
  );
};

const FAQPageHeader = ({
  questions,
  setIsSearch,
  setSelectedQuestion,
  searchQuery,
  setSearchQuery,
}) => {
  const filterQuestions = (questions, query) => {
    if (!query) {
      return questions;
    }
    return questions.filter((question) => {
      const questionName = question.question.toLowerCase();
      return questionName.includes(query.toLowerCase());
    });
  };

  const filteredQuestions = filterQuestions(questions, searchQuery);
  return (
    <div className={'faq-page-header'}>
      <div className={'faq-page-header-container'}>
        <div className="faq-page-header-text">
          <h1>FAQ</h1>
          <p>How can we help you?</p>
        </div>
        <div className="faq-page-header-search">
          <div className="searchIcon">
            <img src={SearchIcon} alt="Search Button" height={30} />
          </div>
          <div className={'faq-page-header-searchbar'}>
            <FAQSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setIsSearch={setIsSearch}
              setSelectedQuestion={setSelectedQuestion}
              questions={filteredQuestions}
            />
          </div>
          <div className="deleteIcon">
            {searchQuery.length > 0 ? (
              <img
                onClick={() => setSearchQuery('')}
                src={DeleteIcon}
                alt="Search Button"
                height={30}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <img src={Wave} className="faq-wave-image faq-page-top-wave-image" />
    </div>
  );
};

FAQPageHeader.propTypes = {
  questions: PropTypes.array.isRequired,
  setIsSearch: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

const FAQButtons = ({ activeIndex, setActiveIndex, setIsSearch, setSearchQuery }) => {
  const data = [{ name: 'General' }, { name: 'F!rosh Kits' }, { name: 'F!rosh Group' }];
  return (
    <div
      onClick={() => {
        setIsSearch(false);
        setSearchQuery('');
      }}
    >
      <ButtonSelector buttonList={data} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
  );
};

FAQButtons.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setIsSearch: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

const FAQCategoryAccordions = ({ allQuestions, activeIndex }) => {
  const questionsAccordion = allQuestions[activeIndex].map((question, index) => (
    <div key={index} className={'faq-accordion-wrapper'}>
      <FAQAccordionWrapper scheduleData={question} openStatus={false} />
    </div>
  ));
  return <div>{questionsAccordion}</div>;
};

FAQCategoryAccordions.propTypes = {
  allQuestions: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

const FAQAccordionWrapper = ({ scheduleData, openStatus }) => {
  const [isOpen, setIsOpen] = useState(openStatus);
  return (
    <SingleAccordion
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={scheduleData.question}
      style={{ backgroundColor: '#ecd6ff' }}
    >
      {scheduleData.answer}
    </SingleAccordion>
  );
};

FAQAccordionWrapper.propTypes = {
  scheduleData: PropTypes.object.isRequired,
  openStatus: PropTypes.bool.isRequired,
};

const FAQSearchBar = ({
  searchQuery,
  setSearchQuery,
  setIsSearch,
  setSelectedQuestion,
  questions,
}) => {
  return (
    <div className={'faq-search'}>
      <div>
        <input
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder={'Search for a question'}
        />
      </div>
      {searchQuery.length != 0 && (
        <div className="faq-data-result">
          {questions.map((value, index) => {
            return (
              <a
                key={index}
                className="faq-data-item"
                href={value.link}
                target="_blank"
                rel="noreferrer"
              >
                <FAQSearchResult
                  setIsSearch={setIsSearch}
                  setSelectedQuestion={setSelectedQuestion}
                  question={value}
                />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

FAQSearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setIsSearch: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
};

const FAQSearchResult = ({ setIsSearch, setSelectedQuestion, question }) => {
  function FAQReturnQuestions() {
    setIsSearch(true);
    setSelectedQuestion(question.id);
  }
  return <div onClick={() => FAQReturnQuestions()}>{question.question}</div>;
};

FAQSearchResult.propTypes = {
  setIsSearch: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
};

const FAQDisplaySearchQuestion = ({ selectedQuestion, questions }) => {
  return (
    <div className={'faq-search-result-container'}>
      <div className={'faq-search-result-question'}>{questions[selectedQuestion].question}</div>
      <div className={'faq-search-result-answer'}>{questions[selectedQuestion].answer}</div>
    </div>
  );
};

FAQDisplaySearchQuestion.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

const FAQAskQuestion = () => {
  const [textValue, updateTextValue] = useState('');
  const initialFormData = {
    question: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  const handleChange = (e) => {
    updateTextValue(e.target.value);
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    updateFormData(initialFormData);
    updateTextValue('');
    // ... submit to API or something
  };

  return (
    <div className={'faq-ask-question-container'}>
      <h1 className={'faq-ask-question-title'}>Can`&apos;`t Find Your Question?</h1>
      <form>
        <label>
          <textarea
            className={'faq-ask-question-box'}
            name="question"
            value={textValue}
            wrap="soft"
            onChange={handleChange}
            placeholder={'Type your question here'}
          ></textarea>
        </label>
        <div>
          <Button label={'Submit'} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PageFAQ };
