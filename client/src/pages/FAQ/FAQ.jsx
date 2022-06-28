import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { getQuestions, submitQuestion } from './functions';
import './FAQ.scss';
import Wave from '../../assets/misc/wave-reverse.png';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import SearchIcon from '../../assets/misc/magnifying-glass-solid.svg';
import DeleteIcon from '../../assets/misc/circle-xmark-solid.svg';

const PageFAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isMultiSearch, setIsMultiSearch] = useState(false);
  const [isNoMatch, setIsNoMatch] = useState(false);
  const [selectedSearchResult, setSelectedSearchResult] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const data = getQuestions();
  const unsortedQuestions = [];
  const questionsObjects = {};
  const questionCategories = [];
  for (let i = 0; i < data.length; i++) {
    if (!questionsObjects.hasOwnProperty(data[i].category)) {
      questionsObjects[data[i].category] = [];
      questionsObjects[data[i].category].push({
        question: data[i].question,
        answer: data[i].answer,
      });
      questionCategories.push({ name: data[i].category });
      console.log(data[i].category);
    } else {
      questionsObjects[data[i].category].push({
        question: data[i].question,
        answer: data[i].answer,
      });
    }
    unsortedQuestions.push({
      question: data[i].question,
      answer: data[i].answer,
      id: i,
      category: data[i].category,
    });
  }
  const allQuestions = [];
  for (let i = 0; i < Object.keys(questionsObjects).length; i++) {
    allQuestions.push(questionsObjects[Object.keys(questionsObjects)[i]]);
  }
  return (
    <div>
      <FAQPageHeader
        questions={unsortedQuestions}
        setIsSearch={setIsSearch}
        setIsMultiSearch={setIsMultiSearch}
        setSelectedQuestion={setSelectedQuestion}
        setSelectedQuestions={setSelectedQuestions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSearchResult={selectedSearchResult}
        setSelectedSearchResult={setSelectedSearchResult}
        setIsNoMatch={setIsNoMatch}
        setActiveIndex={setActiveIndex}
      />
      <img src={Wave} className={'faq-wave-image faq-page-top-wave-image'} />
      <div className={'faq-button-selector-container'}>
        <FAQButtons
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          setIsSearch={setIsSearch}
          setIsMultiSearch={setIsMultiSearch}
          setSearchQuery={setSearchQuery}
          questionCategories={questionCategories}
        />
      </div>
      <div className={`faq-accordion-container ${isSearch ? 'faq-hide-accordion' : ''}`}>
        <FAQCategoryAccordions
          allQuestions={allQuestions}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
      <div className={`faq-display-questions-container ${isSearch ? '' : 'faq-hide-accordion'}`}>
        <div className={`${!isMultiSearch && !isNoMatch ? '' : 'faq-hide-accordion'}`}>
          <FAQDisplaySearchQuestion
            selectedQuestion={selectedQuestion}
            questions={unsortedQuestions}
          />
        </div>
        <div className={`${isMultiSearch && !isNoMatch ? '' : 'faq-hide-accordion'}`}>
          <FAQDisplayAllSearchQuestion selectedQuestions={selectedQuestions} />
        </div>
        <div className={`faq-no-results ${isNoMatch ? '' : 'faq-hide-accordion'}`}>
          <h1>No results</h1>
        </div>
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
  selectedSearchResult,
  setSelectedSearchResult,
  setSelectedQuestions,
  setIsMultiSearch,
  setIsNoMatch,
  setActiveIndex,
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
  const handleSearchIconClick = () => {
    setIsSearch(true);
    setSelectedQuestions(filteredQuestions);
    setIsMultiSearch(true);
    setSelectedSearchResult(true);
    if (filteredQuestions.length == 0 || searchQuery == '') {
      setIsNoMatch(true);
    } else {
      setIsNoMatch(false);
    }
  };
  return (
    <>
      <div className="navbar-space-top" />
      <div className={'faq-page-header'}>
        <div className={'faq-page-header-container'}>
          <div className="faq-page-header-text">
            <h1>FAQ</h1>
            <p>How can we help you?</p>
          </div>
          <div className="faq-page-header-search">
            <div
              className="searchIcon"
              style={{
                borderRadius:
                  searchQuery.length > 0 && !selectedSearchResult && filteredQuestions.length > 0
                    ? '15px 0px 0px 0px'
                    : '',
              }}
              onClick={() => handleSearchIconClick()}
            >
              <img src={SearchIcon} alt="Search Button" height={30} />
            </div>
            <div className={'faq-page-header-searchbar'}>
              <FAQSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsSearch={setIsSearch}
                setIsMultiSearch={setIsMultiSearch}
                setSelectedQuestion={setSelectedQuestion}
                questions={filteredQuestions}
                selectedSearchResult={selectedSearchResult}
                setSelectedSearchResult={setSelectedSearchResult}
                setIsNoMatch={setIsNoMatch}
                setSelectedQuestions={setSelectedQuestions}
                setActiveIndex={setActiveIndex}
              />
            </div>
            <div
              className="deleteIcon"
              style={{
                borderRadius:
                  searchQuery.length > 0 && !selectedSearchResult && filteredQuestions.length > 0
                    ? '0px 15px 0px 0px'
                    : '',
              }}
            >
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
      </div>
    </>
  );
};

FAQPageHeader.propTypes = {
  questions: PropTypes.array.isRequired,
  setIsSearch: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedSearchResult: PropTypes.number.isRequired,
  setSelectedSearchResult: PropTypes.bool.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  setIsMultiSearch: PropTypes.func.isRequired,
  setIsNoMatch: PropTypes.bool.isRequired,
  setActiveIndex: PropTypes.number.isRequired,
};

const FAQButtons = ({
  activeIndex,
  setActiveIndex,
  setIsSearch,
  setSearchQuery,
  questionCategories,
}) => {
  return (
    <div
      onClick={() => {
        setIsSearch(false);
        setSearchQuery('');
      }}
    >
      <ButtonSelector
        buttonList={questionCategories}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        maxWidthButton={200}
      />
    </div>
  );
};

FAQButtons.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setIsSearch: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  questionCategories: PropTypes.array.isRequired,
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
      header={<div className={'faq-search-result-question-accordion'}>{scheduleData.question}</div>}
      style={{ backgroundColor: '#ecd6ff' }}
    >
      <div className={'faq-search-result-answer-accordion'}>{scheduleData.answer}</div>
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
  setIsMultiSearch,
  setSelectedQuestion,
  questions,
  selectedSearchResult,
  setSelectedSearchResult,
  setIsNoMatch,
  setSelectedQuestions,
  setActiveIndex,
}) => {
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedSearchResult(false);
  };
  const handleSearchResultSelect = () => {
    setSelectedSearchResult(false);
  };
  const onKeyPress = (target) => {
    if (target.charCode === 13) {
      setIsSearch(true);
      setSelectedQuestions(questions);
      setIsMultiSearch(true);
      setSelectedSearchResult(true);
      if (questions.length == 0 || searchQuery == '') {
        setIsNoMatch(true);
      } else {
        setIsNoMatch(false);
      }
    }
  };
  return (
    <div className={'faq-search'}>
      <div className={'faq-search-input'}>
        <input
          value={searchQuery}
          onInput={(e) => handleQueryChange(e)}
          onKeyPress={onKeyPress}
          onClick={() => handleSearchResultSelect()}
          type="text"
          placeholder={'Search for a question'}
        />
      </div>
      {searchQuery.length != 0 && (
        <div
          className={`faq-data-result ${selectedSearchResult ? 'faq-search-results-hide' : ''}`}
          style={{ height: questions.length * 50 < 200 ? questions.length * 50 : 200 }}
        >
          {questions.map((value, index) => {
            return (
              <div key={index} className={'faq-data-item'}>
                <FAQSearchResult
                  setIsSearch={setIsSearch}
                  setSelectedQuestion={setSelectedQuestion}
                  setSearchQuery={setSearchQuery}
                  question={value}
                  setSelectedSearchResult={setSelectedSearchResult}
                  setIsMultiSearch={setIsMultiSearch}
                  setIsNoMatch={setIsNoMatch}
                  setActiveIndex={setActiveIndex}
                />
              </div>
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
  setIsMultiSearch: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  selectedSearchResult: PropTypes.bool.isRequired,
  setSelectedSearchResult: PropTypes.func.isRequired,
  setIsNoMatch: PropTypes.bool.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  setActiveIndex: PropTypes.number.isRequired,
};

const FAQSearchResult = ({
  setIsSearch,
  setSelectedQuestion,
  setSearchQuery,
  question,
  setSelectedSearchResult,
  setIsMultiSearch,
  setIsNoMatch,
  setActiveIndex,
}) => {
  function FAQReturnQuestions() {
    setIsSearch(true);
    setSelectedQuestion(question.id);
    setSearchQuery(question.question);
    setSelectedSearchResult(true);
    setIsMultiSearch(false);
    setIsNoMatch(false);
    if (question.category == 'General') {
      setActiveIndex(0);
    }
    if (question.category == 'F!rosh Kits') {
      setActiveIndex(1);
    }
    if (question.category == 'F!rosh Group') {
      setActiveIndex(2);
    }
  }
  return (
    <div className={'faq-search-result-wrapper'} onClick={() => FAQReturnQuestions()}>
      {question.question}
    </div>
  );
};

FAQSearchResult.propTypes = {
  setIsSearch: PropTypes.func.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setSelectedSearchResult: PropTypes.func.isRequired,
  setIsMultiSearch: PropTypes.func.isRequired,
  setIsNoMatch: PropTypes.func.isRequired,
  setActiveIndex: PropTypes.number.isRequired,
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

const FAQDisplayAllSearchQuestion = ({ selectedQuestions, questions }) => {
  const allSearchQuestions = selectedQuestions.map((question, index) => (
    <div key={index} className={'faq-search-result-container'}>
      <div className={'faq-search-result-question'}>{question.question}</div>
      <div className={'faq-search-result-answer'}>{question.answer}</div>
    </div>
  ));
  return <div>{allSearchQuestions}</div>;
};

FAQDisplayAllSearchQuestion.propTypes = {
  selectedQuestions: PropTypes.array.isRequired,
  questions: PropTypes.array.isRequired,
};

const FAQAskQuestion = () => {
  const [textValue, updateTextValue] = useState('');
  const initialFormData = {
    question: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  const [clearText, setClearText] = useState(false);
  const handleChange = (text) => {
    // console.log(text);
    updateFormData({ question: text });
  };

  const handleSubmit = (text) => {
    console.log(submitQuestion(formData));
    updateFormData(initialFormData);
    text = '';
    setClearText(true);
    // ... submit to API or something
  };

  return (
    <div className={'faq-ask-question-container'}>
      <h1 className={'faq-ask-question-title'}>Can&apos;t Find Your Question?</h1>
      <form>
        <label>
          <div className={'faq-ask-question-box'}>
            <TextInput
              value={textValue}
              onChange={(text) => handleChange(text)}
              inputType={'textArea'}
              placeholder={'Type your question here'}
              style={{ height: '150px' }}
              clearText={clearText}
              setClearText={setClearText}
            />
          </div>
        </label>
        <div style={{ textAlign: 'center' }}>
          <Button label={'Submit'} onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export { PageFAQ };
