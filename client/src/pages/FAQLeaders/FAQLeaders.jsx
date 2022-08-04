import { React, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { deleteQuestion, submitEdit, submitQuestion } from './functions';
import './FAQLeaders.scss';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { SnackbarContext } from '../../util/SnackbarProvider';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

const PageFAQLeaders = () => {
  const [editMade, setEditMade] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonList = [{ name: 'Answered' }, { name: 'Unanswered' }];
  useEffect(() => {
    setIsAnswered((isAnswered) => !isAnswered);
  }, [activeIndex]);
  //  const [toggleText, setToggleText] = useState('Unanswered');
  return (
    <div className={'faq-leaders-page'}>
      <div className={'faq-leaders-create-question-container'}>
        <h1 className={'faq-leaders-titles'}>Create a new question!</h1>
        <FAQLeadersNewPost editMade={editMade} setEditMade={setEditMade} />
      </div>
      <div className={'faq-leaders-edit-question-container'}>
        <h1 className={'faq-leaders-titles'}>Existing questions</h1>
        <div className={'faq-leaders-mobile'}>
          <ButtonSelector
            buttonList={buttonList}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            maxWidthButton={200}
          />
        </div>
        <span className={`${!isAnswered ? 'faq-leaders-mobile-hide' : ''}`}>
          <div className={'faq-leaders-answered-questions'}>
            <h1 className={'faq-leaders-subtitles'}>Answered</h1>
            <FAQLeadersAnsweredQuestions editMade={editMade} setEditMade={setEditMade} />
          </div>
        </span>
        <span className={`${isAnswered ? 'faq-leaders-mobile-hide' : ''}`}>
          <div className={'faq-leaders-unanswered-questions'}>
            <h1 className={'faq-leaders-subtitles'}>Unanswered</h1>
            <FAQLeadersUnansweredQuestions editMade={editMade} setEditMade={setEditMade} />
          </div>
        </span>
      </div>
    </div>
  );
};

const FAQLeadersAnsweredQuestions = ({ editMade, setEditMade }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState(undefined);
  const [questionCategories, setQuestionCategories] = useState([]);
  const tempQuestionCategories = [];
  const tempQuestionsObject = {};
  const tempAllQuestions = [];
  const getQuestions = async (questionCategories, questionsObject, allQuestions) => {
    try {
      const response = await axios.get('/faq/answered');
      const questions = await response.data.faqs;
      for (let i = 0; i < questions.length; i++) {
        let curQ = questions[i];
        if (!questionsObject.hasOwnProperty(curQ.category)) {
          questionsObject[curQ.category] = [];
          questionsObject[curQ.category].push({
            question: curQ.question,
            email: curQ.email,
            answer: curQ.answer,
            category: curQ.category,
            isAnswered: curQ.isAnswered,
            createdAt: curQ.createdAt,
            updatedAt: curQ.updatedAt,
            id: curQ._id,
          });
          questionCategories.push({ name: curQ.category });
        } else {
          questionsObject[curQ.category].push({
            question: curQ.question,
            email: curQ.email,
            answer: curQ.answer,
            category: curQ.category,
            isAnswered: curQ.isAnswered,
            createdAt: curQ.createdAt,
            updatedAt: curQ.updatedAt,
            id: curQ._id,
          });
        }
      }
      for (let i = 0; i < Object.keys(questionsObject).length; i++) {
        allQuestions.push(questionsObject[Object.keys(questionsObject)[i]]);
      }
      setAllQuestions(allQuestions);
      setQuestionCategories(questionCategories);
    } catch (error) {
      console.log(error);
      setAllQuestions(undefined);
    }
  };
  useEffect(() => {
    getQuestions(tempQuestionCategories, tempQuestionsObject, tempAllQuestions);
  }, [editMade]);
  return (
    <div>
      <FAQLeadersButtons
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        questionCategories={questionCategories}
      />
      {allQuestions === undefined ||
      allQuestions[activeIndex] === undefined ||
      allQuestions.length === 0 ||
      allQuestions[activeIndex].length === 0 ? (
        <div className={'faq-leaders-no-result'}>No answered questions found.</div>
      ) : (
        allQuestions[activeIndex].map((question, index) => (
          <div key={question.id}>
            <FAQLeadersQuestionWrapper
              question={question}
              editMade={editMade}
              setEditMade={setEditMade}
            />
          </div>
        ))
      )}
    </div>
  );
};

const FAQLeadersUnansweredQuestions = ({ editMade, setEditMade }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState(undefined);
  const [questionCategories, setQuestionCategories] = useState([]);
  const tempQuestionCategories = [];
  const tempQuestionsObject = {};
  const tempAllQuestions = [];
  const getQuestions = async (questionCategories, questionsObject, allQuestions) => {
    try {
      const response = await axios.get('/faq/unanswered');
      const questions = await response.data.faqs;
      for (let i = 0; i < questions.length; i++) {
        let curQ = questions[i];
        if (!questionsObject.hasOwnProperty(curQ.category)) {
          questionsObject[curQ.category] = [];
          questionsObject[curQ.category].push({
            question: curQ.question,
            email: curQ.email,
            answer: curQ.answer,
            category: curQ.category,
            isAnswered: curQ.isAnswered,
            createdAt: curQ.createdAt,
            updatedAt: curQ.updatedAt,
            id: curQ._id,
          });
          questionCategories.push({ name: curQ.category });
        } else {
          questionsObject[curQ.category].push({
            question: curQ.question,
            email: curQ.email,
            answer: curQ.answer,
            category: curQ.category,
            isAnswered: curQ.isAnswered,
            createdAt: curQ.createdAt,
            updatedAt: curQ.updatedAt,
            id: curQ._id,
          });
        }
      }
      for (let i = 0; i < Object.keys(questionsObject).length; i++) {
        allQuestions.push(questionsObject[Object.keys(questionsObject)[i]]);
      }
      setAllQuestions(allQuestions);
      setQuestionCategories(questionCategories);
    } catch (error) {
      console.log(error);
      setAllQuestions(undefined);
    }
  };
  useEffect(() => {
    getQuestions(tempQuestionCategories, tempQuestionsObject, tempAllQuestions);
  }, [editMade]);
  return (
    <div>
      <FAQLeadersButtons
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        questionCategories={questionCategories}
      />
      {allQuestions === undefined ||
      allQuestions[activeIndex] === undefined ||
      allQuestions.length === 0 ||
      allQuestions[activeIndex].length === 0 ? (
        <div className={'faq-leaders-no-result'}>No unanswered questions found.</div>
      ) : (
        allQuestions[activeIndex].map((question, index) => (
          <div key={question.id}>
            <FAQLeadersQuestionWrapper
              question={question}
              editMade={editMade}
              setEditMade={setEditMade}
            />
          </div>
        ))
      )}
    </div>
  );
};

const FAQLeadersQuestionWrapper = ({ question, editMade, setEditMade }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit');
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const [categoryText, setCategoryText] = useState(question.category);
  const [oldQuestionText, setOldQuestionText] = useState(question.question);
  const [oldAnswerText, setOldAnswerText] = useState(question.answer);
  const [oldCategoryText, setOldCategoryText] = useState(question.category);
  const [cancelEdit, setCancelEdit] = useState(false);
  const [createdDate, setCreatedDate] = useState(question.createdAt);
  const [updatedDate, setUpdatedDate] = useState(question.updatedAt);
  const { setSnackbar } = useContext(SnackbarContext);
  const initialFormData = {
    question: '',
    answer: '',
    category: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  useEffect(() => {
    updateFormData({
      question: questionText,
      answer: answerText,
      category: categoryText,
    });
  }, [questionText, answerText, categoryText]);
  useEffect(() => {
    setCreatedDate(question.createdAt);
    setUpdatedDate(question.updatedAt);
  }, [editMade]);
  const handleEditQuestion = (text) => {
    setQuestionText(text);
  };
  const handleEditAnswer = (text) => {
    setAnswerText(text);
  };
  const handleEditCategory = (text) => {
    setCategoryText(text);
  };
  const handleSubmit = async (id) => {
    if (formData.question.length > 0 && formData.category.length > 0) {
      const result = await submitEdit(id, formData);
      if (result !== true) {
        setSnackbar('Error', true);
      } else {
        setIsEdit(false);
        setEditButtonText('Edit');
        setEditMade(!editMade);
        setSnackbar('Question Successfully Edited', false);
      }
    } else if (formData.question.length === 0) {
      setSnackbar('Question cannot be empty', true);
    } else if (formData.category.length === 0) {
      setSnackbar('Category cannot be empty', true);
    }
  };
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Toronto',
  };
  const createdDateFormatted = new Date(createdDate).toLocaleDateString('en-CA', options);
  const updatedDateFormatted = new Date(updatedDate).toLocaleDateString('en-CA', options);
  return (
    <div className={'faq-leaders-questions-container'}>
      <div className={`${isEdit ? 'faq-leaders-hide' : ''}`}>
        <h1 className={'faq-leaders-questions-titles'}>{questionText}</h1>
        <p className={'faq-leaders-description'}>
          <span className={'faq-leaders-attribute'}>Answer:</span> {answerText}
        </p>
        <p className={'faq-leaders-description'}>
          <span className={'faq-leaders-attribute'}>Category:</span> {categoryText}
        </p>
        <p className={'faq-leaders-description'}>
          <span className={'faq-leaders-attribute'}>Email:</span> {question.email}
        </p>
        <p className={'faq-leaders-description'}>
          <span className={'faq-leaders-attribute'}>Created at:</span> {createdDateFormatted}
        </p>
        <p className={'faq-leaders-description'}>
          <span className={'faq-leaders-attribute'}>Last updated at:</span> {updatedDateFormatted}
        </p>{' '}
      </div>
      <div className={`${!isEdit ? 'faq-leaders-hide' : ''}`}>
        <form>
          <div className={'faq-leaders-edit-title-container'}>
            <div className={'faq-leaders-edit-title'}>Editing question:</div>
          </div>
          <label>
            <div className={''}>
              <h1 className={'faq-leaders-subtitles'}>Question</h1>
              <TextInput
                onChange={(text) => handleEditQuestion(text)}
                inputType={'text'}
                placeholder={'Question'}
                initialValue={oldQuestionText}
                style={{ height: '45px' }}
                cancelEdit={cancelEdit}
                oldValue={oldQuestionText}
              />
            </div>
          </label>
          <label>
            <div className={''}>
              <h1 className={'faq-leaders-subtitles'}>Answer</h1>
              <TextInput
                onChange={(text) => handleEditAnswer(text)}
                inputType={'textArea'}
                placeholder={'Answer'}
                initialValue={oldAnswerText}
                style={{ height: '150px', resize: 'vertical' }}
                cancelEdit={cancelEdit}
                oldValue={oldAnswerText}
              />
            </div>
          </label>
          <label>
            <div className={''}>
              <h1 className={'faq-leaders-subtitles'}>Category</h1>
              <TextInput
                onChange={(text) => handleEditCategory(text)}
                inputType={'text'}
                placeholder={'Category'}
                initialValue={oldCategoryText} //TODO: current category doesn't show, only placeholder shows
                style={{ height: '45px' }}
                cancelEdit={cancelEdit}
                oldValue={oldAnswerText}
              />
            </div>
          </label>
        </form>
      </div>
      <span>
        <Button
          label={editButtonText}
          onClick={() => {
            setIsEdit(!isEdit);
            setEditButtonText(`${isEdit ? 'Edit' : 'Stop Edit'}`);
            if (!isEdit) {
              setOldQuestionText(questionText);
              setOldAnswerText(answerText);
              setOldCategoryText(categoryText);
            } else {
              setQuestionText(oldQuestionText);
              setAnswerText(oldAnswerText);
              setCategoryText(oldCategoryText);
              setCancelEdit(!cancelEdit);
            }
          }}
        />
      </span>
      <span className={isEdit ? 'faq-leaders-hide' : ''}>
        <Button
          label={'Delete'}
          onClick={async () => {
            deleteQuestion(question.id);
            setEditMade(!editMade);
            setSnackbar('Question Deleted Successfully', false);
          }}
        />
      </span>

      <span className={!isEdit ? 'faq-leaders-hide' : ''}>
        <Button label={'Save'} onClick={() => handleSubmit(question.id)} />
      </span>
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
        style={{ minWidth: '200px', wordBreak: 'break-all' }}
      />
    </div>
  );
};

const FAQLeadersNewPost = ({ editMade, setEditMade }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [formState, setFormState] = useState('form');
  const [clearText, setClearText] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

  const initialFormData = {
    question: '',
    answer: '',
    category: '',
    isAnswered: true,
  };
  const [formData, updateFormData] = useState(initialFormData);
  const handleEditQuestion = (text) => {
    setQuestionText(text);
  };
  const handleEditAnswer = (text) => {
    setAnswerText(text);
  };
  const handleEditCategory = (text) => {
    setCategoryText(text);
  };
  const handleSubmit = async () => {
    if (
      formData.question.length > 0 &&
      formData.answer.length > 0 &&
      formData.category.length > 0
    ) {
      setFormState('loading');
      const result = await submitQuestion(formData);
      if (result !== true) {
        setFormState('form');
        setSnackbar('Error', true);
      } else {
        updateFormData(initialFormData);
        setClearText(true);
        setFormState('form');
        setEditMade(!editMade);
        setQuestionText('');
        setAnswerText('');
        setCategoryText('');
        setSnackbar('New Question and Answer Submitted Successfully', false);
      }
    } else if (formData.question.length === 0) {
      setSnackbar('Question cannot be empty', true);
    } else if (formData.answer.length === 0) {
      setSnackbar('Answer cannot be empty', true);
    } else if (formData.category.length === 0) {
      setSnackbar('Category cannot be empty', true);
    }
  };
  useEffect(() => {
    updateFormData({
      question: questionText,
      answer: answerText,
      category: categoryText,
      isAnswered: true,
    });
  }, [questionText, answerText, categoryText]);
  return (
    <form>
      <label>
        <div>
          <h1 className={'faq-leaders-subtitles'}>Question</h1>
          <TextInput
            onChange={(text) => handleEditQuestion(text)}
            inputType={'text'}
            placeholder={'Question'}
            initialValue={''}
            style={{ height: '45px' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div>
          <h1 className={'faq-leaders-subtitles'}>Answer</h1>
          <TextInput
            onChange={(text) => handleEditAnswer(text)}
            inputType={'textArea'}
            placeholder={'Answer'}
            initialValue={''}
            style={{ height: '150px', resize: 'vertical' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div>
          <h1 className={'faq-leaders-subtitles'}>Category</h1>
          <TextInput
            onChange={(text) => handleEditCategory(text)}
            inputType={'text'}
            placeholder={'Category'}
            initialValue={''}
            style={{ height: '45px' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <div
        style={{ textAlign: 'center' }}
        className={formState === 'form' ? '' : 'faq-leaders-hide'}
      >
        <Button label={'Submit'} onClick={() => handleSubmit()} />
      </div>
      <div className={formState === 'loading' ? '' : 'faq-leaders-hide'}>
        <LoadingAnimation size={'60px'} />
      </div>
    </form>
  );
};

FAQLeadersNewPost.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

FAQLeadersAnsweredQuestions.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

FAQLeadersUnansweredQuestions.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

FAQLeadersButtons.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  questionCategories: PropTypes.array.isRequired,
};

FAQLeadersQuestionWrapper.propTypes = {
  question: PropTypes.object.isRequired,
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

export { PageFAQLeaders };
