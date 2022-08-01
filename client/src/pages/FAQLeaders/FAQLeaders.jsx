import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { deleteQuestion, submitEdit, submitQuestion } from './functions';
import './FAQLeaders.scss';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
// TODO: implement response with snackbar for both creating and editing questions
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

const PageFAQLeaders = () => {
  const [editMade, setEditMade] = useState(false);
  return (
    <div className={'faq-leaders-page'}>
      <div className={'faq-leaders-create-question-container'}>
        <h1 className={'faq-leaders-titles'}>Create a new question!</h1>
        <FAQLeadersNewPost editMade={editMade} setEditMade={setEditMade} />
      </div>
      <div className={'faq-leaders-edit-question-container'}>
        <h1 className={'faq-leaders-titles'}>Existing questions</h1>
        <div className={'faq-leaders-answered-questions'}>
          <FAQLeadersAnsweredQuestions editMade={editMade} setEditMade={setEditMade} />
        </div>
        <div className={'faq-leaders-unanswered-questions'}>
          <FAQLeadersUnansweredQuestions editMade={editMade} setEditMade={setEditMade} />
        </div>
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

FAQLeadersAnsweredQuestions.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
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

FAQLeadersUnansweredQuestions.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

const FAQLeadersQuestionWrapper = ({ question, editMade, setEditMade }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit');
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const [categoryText, setCategoryText] = useState(question.category);
  const [createdDate, setCreatedDate] = useState(question.createdAt);
  const [updatedDate, setUpdatedDate] = useState(question.updatedAt);
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
  }, [createdDate, updatedDate]);
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
    submitEdit(id, formData);
    setIsEdit(false);
    setEditButtonText('Edit');
    setEditMade(!editMade);
  };
  const options = {
    weekday: 'short',
    year: undefined,
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minutes: '2-digit',
    timeZone: 'America/Toronto',
  };
  let createdDateFormatted = new Date(
    createdDate.substring(0, createdDate.length - 1),
  ).toLocaleDateString('en-CA', options);
  let updatedDateFormatted = new Date(
    updatedDate.substring(0, updatedDate.length - 1),
  ).toLocaleDateString('en-CA', options);
  return (
    <div className={'faq-leaders-questions-container'}>
      <div className={`${isEdit ? 'faq-leaders-hide' : ''}`}>
        <h1 className={'faq-leaders-subtitles'}>{questionText}</h1>
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
                initialValue={question.question}
                style={{ height: '45px' }}
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
                initialValue={question.answer}
                style={{ height: '150px', resize: 'vertical' }}
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
                initialValue={question.category} //TODO: current category doesn't show, only placeholder shows
                style={{ height: '45px' }}
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
          }}
        />
      </span>
      <span className={isEdit ? 'faq-leaders-hide' : ''}>
        <Button
          label={'Delete'}
          onClick={async () => {
            deleteQuestion(question.id);
            setEditMade(!editMade);
          }}
        />
      </span>

      <span className={!isEdit ? 'faq-leaders-hide' : ''}>
        <Button label={'Save'} onClick={() => handleSubmit(question.id)} />
      </span>
    </div>
  );
};

FAQLeadersQuestionWrapper.propTypes = {
  question: PropTypes.object.isRequired,
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
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

const FAQLeadersNewPost = ({ editMade, setEditMade }) => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const [formState, setFormState] = useState('form');
  const [newPostError, setNewPostError] = useState('');
  const [errorColor, setErrorColor] = useState(false);
  const [clearText, setClearText] = useState(false);
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
        setNewPostError(result);
        setErrorColor(true);
        setFormState('form');
      } else {
        updateFormData(initialFormData);
        setClearText(true);
        setNewPostError('New Question and Answer Submitted Successfully');
        setErrorColor(false);
        setFormState('form');
        setEditMade(!editMade);
      }
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
      <ErrorSuccessBox content={newPostError} error={errorColor} success={!errorColor} />
      <label>
        <div className={''}>
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
        <div className={''}>
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
        <div className={''}>
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

export { PageFAQLeaders };
