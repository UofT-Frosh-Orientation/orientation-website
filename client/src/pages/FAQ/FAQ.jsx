import React, { useState, useEffect, useContext } from 'react';
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
// import Dragon from '../../assets/faq/dragon.svg';

// Renders an answer string, turning any URLs into clickable links while
// preserving the surrounding text (and its line breaks via white-space: pre-wrap).
const renderAnswer = (answer) => {
  if (!answer) return answer;
  return answer.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      const [, url, trailing] = part.match(/^(.*?)([.,!?)]*)$/);
      return (
        <React.Fragment key={index}>
          <a href={url} target="_blank" rel="noreferrer" className="faq-answer-link">
            {url}
          </a>
          {trailing}
        </React.Fragment>
      );
    }
    return part;
  });
};

const PageFAQ = () => {
  const { darkMode } = useContext(DarkModeContext);
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
  const [isAdding, setIsAdding] = useState(false); // Controls form panel visibility
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadQuestions = async () => {
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
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeIndex]);

  const totalPages = Math.ceil((allQuestions[activeIndex]?.length || 0) / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentQuestions = allQuestions[activeIndex]?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleAddQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion || !newAnswer || !newCategory) {
      setSnackbar('Please fill out all fields');
      return;
    }

    // 1. Structure the new item payload
    const freshQuestion = {
      question: newQuestion,
      answer: newAnswer,
      category: newCategory.trim().toUpperCase(), // Keeping categories uniform
    };

    try {
      // 2. OPTIONAL: If you have an API route to save to a database, uncomment this:
      // await saveQuestionToBackend(freshQuestion, setSnackbar);

      // 3. Update local states so it shows up in the UI immediately without a page reload
      setUnsortedQuestions((prev) => [...prev, { ...freshQuestion, id: prev.length }]);

      // Re-trigger your existing loadQuestions pipeline to safely regenerate category mappings and pages
      await loadQuestions();

      // 4. Reset form fields and close the view
      setNewQuestion('');
      setNewAnswer('');
      setNewCategory('');
      setIsAdding(false);
      setSnackbar('Question added successfully!');
    } catch (err) {
      setSnackbar('Failed to add the question');
    }
  };

  return (
    <div className="bg-primary" data-theme={darkMode ? 'dark' : 'light'}>
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

        {/* --- ADD NEW QUESTION PANEL TRIGGER --- */}
        <div
          className="faq-add-trigger-container"
          style={{ maxWidth: '1000px', margin: '15px auto', padding: '0 20px' }}
        >
          {' '}
          <button className="faq-add-trigger-btn" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? '✕ Close Form' : '＋ Add New Question'}
          </button>
        </div>

        {isAdding && (
          <form onSubmit={handleAddQuestionSubmit} className="faq-add-form-panel">
            <h3>Create a New FAQ Entry</h3>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="e.g. REGISTRATION, GENERAL"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Question</label>
              <input
                type="text"
                placeholder="What is the question?"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Answer Text</label>
              <textarea
                placeholder="Provide the detailed answer here..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={4}
              />
            </div>

            <button type="submit" className="faq-submit-btn">
              Publish Question
            </button>
          </form>
        )}

        {errorLoading ? <h1 className="faq-error-text">There was an error loading FAQs</h1> : <></>}

        {loading ? (
          <LoadingAnimation size={'55px'} />
        ) : (
          /* Wrap sidebar and accordions together inside the flex row container */
          <div className="faq-content-row">
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

            <div
              className={`faq-accordion-container ${
                isSearch ? 'faq-hide-accordion' : 'faq-show-accordion'
              }`}
            >
              <FAQCategoryAccordions
                currentQuestions={currentQuestions}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />

              {/* Added missing pagination controls underneath the accordion list */}
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              )}
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
          </div>
        )}
      </div>
      <div className="fill bg-primary">filler</div>
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
  const { darkMode } = useContext(DarkModeContext);
  const filterQuestions = (questions, query) => {
    if (!query) {
      return questions;
    }
    return questions.filter((question) => {
      const questionName = question.question.toLowerCase() + question.answer.toLowerCase();
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
              {/* <img src={Dragon} alt="Dragon" className="dragon-design desktop-only" /> */}
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
  selectedSearchResult: PropTypes.bool.isRequired, // Changed from number to bool
  setSelectedSearchResult: PropTypes.func.isRequired, // Changed from bool to func
  setSelectedQuestions: PropTypes.func.isRequired,
  setIsMultiSearch: PropTypes.func.isRequired,
  setIsNoMatch: PropTypes.func.isRequired,
  setActiveIndex: PropTypes.func.isRequired, // Changed from number to func
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
        classNameSelector={'faq-button-selector'}
        classNameButton={'faq-button-selector-btn'}
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

const FAQCategoryAccordions = ({ currentQuestions, activeIndex }) => {
  if (!currentQuestions) return <></>;
  const questionsAccordion = currentQuestions.map((question, index) => (
    <div key={index} className={'faq-accordion-wrapper'}>
      <FAQAccordionWrapper scheduleData={question} openStatus={false} activeIndex={activeIndex} />
    </div>
  ));
  return <div>{questionsAccordion}</div>;
};

FAQCategoryAccordions.propTypes = {
  currentQuestions: PropTypes.array.isRequired,
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
      header={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <div className={'faq-search-result-question-accordion'}>{scheduleData.question}</div>
          {/* Plus / Minus sign swap match — --faq-accent is gold in dark mode, dark purple in light */}
          <span style={{ color: 'var(--faq-accent)', fontSize: '24px', fontWeight: 'bold' }}>
            {isOpen ? '−' : '+'}
          </span>
        </div>
      }
      style={{ backgroundColor: 'transparent' }}
      className="accordion-clickable"
      dark={true}
    >
      <div className={'faq-search-result-answer-accordion'}>
        {renderAnswer(scheduleData.answer)}
      </div>
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
  setIsNoMatch: PropTypes.func.isRequired, // Changed from bool to func
  setSelectedQuestions: PropTypes.func.isRequired,
};

const FAQDisplayAllSearchQuestion = ({ selectedQuestions }) => {
  const allSearchQuestions = selectedQuestions.map((question, index) => (
    <div key={index} className={'faq-search-result-container'}>
      <div className={'faq-search-result-question'}>{question.question}</div>
      <div className={'faq-search-result-answer'}>{renderAnswer(question.answer)}</div>
    </div>
  ));
  return <div>{allSearchQuestions}</div>;
};

FAQDisplayAllSearchQuestion.propTypes = {
  selectedQuestions: PropTypes.array.isRequired,
};

const PaginationControls = ({ currentPage, totalPages, handlePageChange }) => (
  <div className="pagination-controls">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => handlePageChange(i + 1)}
        className={currentPage === i + 1 ? 'active' : ''}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export { PageFAQ };
