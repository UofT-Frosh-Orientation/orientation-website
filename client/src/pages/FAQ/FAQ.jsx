import { React, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { getQuestions } from './functions';
import './FAQ.scss';
import Wave from '../../assets/misc/wave-reverse.png';
import WaveDarkMode from '../../assets/darkmode/misc/wave-reverse.png';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import SearchIcon from '../../assets/misc/magnifying-glass-solid.svg';
import DeleteIcon from '../../assets/misc/circle-xmark-solid.svg';
import SearchIconDarkMode from '../../assets/darkmode/misc/magnifying-glass-solid.svg';
import DeleteIconDarkMode from '../../assets/darkmode/misc/circle-xmark-solid.svg';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';

const PageFAQ = () => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [isMultiSearch, setIsMultiSearch] = useState(false);
  const [isNoMatch, setIsNoMatch] = useState(false);
  const [selectedSearchResult, setSelectedSearchResult] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [unsortedQuestions, setUnsortedQuestions] = useState([]);
  const [questionsObjects, setQuestionsObjects] = useState({});
  const [questionCategories, setQuestionCategories] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  useEffect(async () => {
    const data = await getQuestions(setSnackbar);
    if (!data) {
      setSnackbar('There was an error getting FAQ questions');
      setErrorLoading(true);
    }
    const unsortedQuestionsLocal = [];
    const questionsObjectsLocal = {};
    const questionCategoriesLocal = [];
    for (let i = 0; i < data.length; i++) {
      if (!questionsObjectsLocal.hasOwnProperty(data[i].category)) {
        questionsObjectsLocal[data[i].category] = [];
        questionsObjectsLocal[data[i].category].push({
          question: data[i].question,
          answer: data[i].answer,
        });
        questionCategoriesLocal.push({ name: data[i].category });
      } else {
        questionsObjectsLocal[data[i].category].push({
          question: data[i].question,
          answer: data[i].answer,
        });
      }
      unsortedQuestionsLocal.push({
        question: data[i].question,
        answer: data[i].answer,
        id: i,
        category: data[i].category,
      });
    }
    const allQuestionsLocal = [];
    for (let i = 0; i < Object.keys(questionsObjectsLocal).length; i++) {
      allQuestionsLocal.push(questionsObjectsLocal[Object.keys(questionsObjectsLocal)[i]]);
    }
    setUnsortedQuestions(unsortedQuestionsLocal);
    setQuestionsObjects(questionsObjectsLocal);
    setQuestionCategories(questionCategoriesLocal);
    setAllQuestions(allQuestionsLocal);

    setLoading(false);
    setIsSearch(false);
  }, []);

  return (
    <div>
      <div>
        <FAQPageHeader
          questions={unsortedQuestions}
          setIsSearch={setIsSearch}
          setIsMultiSearch={setIsMultiSearch}
          setSelectedQuestions={setSelectedQuestions}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSearchResult={selectedSearchResult}
          setSelectedSearchResult={setSelectedSearchResult}
          setIsNoMatch={setIsNoMatch}
          setActiveIndex={setActiveIndex}
          questionCategories={questionCategories}
        />
        {darkMode ? (
          <img src={WaveDarkMode} className={'faq-wave-image faq-page-top-wave-image'} />
        ) : (
          <img src={Wave} className={'faq-wave-image faq-page-top-wave-image'} />
        )}
        {errorLoading ? <h1 className="faq-error-text">There was an error loading FAQs</h1> : <></>}
        {loading ? (
          <LoadingAnimation size={'55px'} />
        ) : (
          <div
            className={`faq-button-selector-container ${
              isSearch ? 'faq-hide-button-selector' : 'faq-show-button-selector'
            }`}
          >
            <FAQButtons
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              setIsSearch={setIsSearch}
              setIsMultiSearch={setIsMultiSearch}
              setSearchQuery={setSearchQuery}
              questionCategories={questionCategories}
            />
          </div>
        )}
        {loading ? (
          <></>
        ) : (
          <>
            <div
              className={`faq-accordion-container ${
                isSearch ? 'faq-hide-accordion' : 'faq-show-accordion'
              }`}
            >
              <FAQCategoryAccordions
                allQuestions={allQuestions}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
            <div
              className={`faq-display-questions-container ${
                isSearch ? 'faq-show-accordion' : 'faq-hide-accordion'
              }`}
            >
              <div
                className={`${
                  isMultiSearch && !isNoMatch ? 'faq-show-accordion' : 'faq-hide-accordion'
                }`}
              >
                <h1 className="faq-all-search-results">Search results...</h1>
                <FAQDisplayAllSearchQuestion selectedQuestions={selectedQuestions} />
              </div>
              <div
                className={`faq-no-results ${
                  isNoMatch ? 'faq-show-accordion' : 'faq-hide-accordion'
                }`}
              >
                <h1>No results</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const FAQPageHeader = ({
  questions,
  setIsSearch,
  searchQuery,
  setSearchQuery,
  selectedSearchResult,
  setSelectedSearchResult,
  setSelectedQuestions,
  setIsMultiSearch,
  setIsNoMatch,
  setActiveIndex,
  questionCategories,
}) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
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
  const handleDeleteIconClick = () => {
    setSearchQuery('');
    setIsSearch(false);
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
            >
              {!darkMode ? (
                <img src={SearchIcon} alt="Search Button" height={30} />
              ) : (
                <img src={SearchIconDarkMode} alt="Search Button" height={30} />
              )}
            </div>
            <div className={'faq-page-header-searchbar'}>
              <FAQSearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setIsSearch={setIsSearch}
                setIsMultiSearch={setIsMultiSearch}
                questions={filteredQuestions}
                selectedSearchResult={selectedSearchResult}
                setSelectedSearchResult={setSelectedSearchResult}
                setIsNoMatch={setIsNoMatch}
                setSelectedQuestions={setSelectedQuestions}
                setActiveIndex={setActiveIndex}
                questionCategories={questionCategories}
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
                !darkMode ? (
                  <img
                    onClick={() => handleDeleteIconClick()}
                    src={DeleteIcon}
                    alt="Search Button"
                    height={30}
                  />
                ) : (
                  <img
                    onClick={() => handleDeleteIconClick()}
                    src={DeleteIconDarkMode}
                    alt="Search Button"
                    height={30}
                  />
                )
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
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  selectedSearchResult: PropTypes.number.isRequired,
  setSelectedSearchResult: PropTypes.bool.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
  setIsMultiSearch: PropTypes.func.isRequired,
  setIsNoMatch: PropTypes.func.isRequired,
  setActiveIndex: PropTypes.number.isRequired,
  questionCategories: PropTypes.array.isRequired,
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
  if (allQuestions[activeIndex] === undefined) return <></>;
  const questionsAccordion = allQuestions[activeIndex].map((question, index) => (
    <div key={index} className={'faq-accordion-wrapper'}>
      <FAQAccordionWrapper scheduleData={question} openStatus={false} activeIndex={activeIndex} />
    </div>
  ));
  return <div>{questionsAccordion}</div>;
};

FAQCategoryAccordions.propTypes = {
  allQuestions: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

const FAQAccordionWrapper = ({ scheduleData, openStatus, activeIndex }) => {
  const [isOpen, setIsOpen] = useState(openStatus);
  useEffect(() => {
    setIsOpen(false);
  }, [activeIndex]);
  return (
    <SingleAccordion
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={<div className={'faq-search-result-question-accordion'}>{scheduleData.question}</div>}
      style={{ backgroundColor: 'var(--faq-answer-containers)', padding: '0px 30px 0px 30px' }}
    >
      <div className={'faq-search-result-answer-accordion'}>{scheduleData.answer}</div>
    </SingleAccordion>
  );
};

FAQAccordionWrapper.propTypes = {
  scheduleData: PropTypes.object.isRequired,
  openStatus: PropTypes.bool.isRequired,
  activeIndex: PropTypes.number.isRequired,
};

const FAQSearchBar = ({
  searchQuery,
  setSearchQuery,
  setIsSearch,
  setIsMultiSearch,
  questions,
  setSelectedSearchResult,
  setIsNoMatch,
  setSelectedQuestions,
}) => {
  useEffect(() => {
    setIsSearch(true);
    setSelectedQuestions(questions);
    setIsMultiSearch(true);
    setSelectedSearchResult(true);
    if (questions.length == 0) {
      setIsNoMatch(true);
    } else if (searchQuery == '') {
      setIsSearch(false);
    } else {
      setIsNoMatch(false);
    }
  }, [searchQuery]);
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedSearchResult(false);
    if (e.target.value == '') {
      setIsSearch(false);
    }
  };
  return (
    <div className={'faq-search'}>
      <div className={'faq-search-input'}>
        <input
          className="faq-search-input-container"
          value={searchQuery}
          onInput={(e) => handleQueryChange(e)}
          type="text"
          placeholder={'Search for a question'}
        />
      </div>
    </div>
  );
};

FAQSearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setIsSearch: PropTypes.func.isRequired,
  setIsMultiSearch: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  selectedSearchResult: PropTypes.bool.isRequired,
  setSelectedSearchResult: PropTypes.func.isRequired,
  setIsNoMatch: PropTypes.bool.isRequired,
  setSelectedQuestions: PropTypes.func.isRequired,
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

export { PageFAQ };
