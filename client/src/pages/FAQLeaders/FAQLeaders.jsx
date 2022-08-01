import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { deleteQuestion, submitEdit, submitQuestion } from './functions';
import './FAQLeaders.scss';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

export function getInformation() {
  return 'FAQ';
}

const PageFAQLeaders = () => {
  //const [isUnanswered, setIsUnanswered] = useState(false);
  const [editMade, setEditMade] = useState(false);
  return (
    <div className={'faq-leaders-page'}>
      <div className={'faq-leaders-create-question'}>
        <div className={'faq-leaders-titles'}>Create a new question:</div>
        <FAQLeadersNewPost editMade={editMade} setEditMade={setEditMade} />
      </div>
      <div className={'faq-leaders-edit-question'}>
        <div className={'faq-leaders-titles'}>Questions:</div>
        <div className={'faq-leaders-answered-questions'}>
          <FAQLeadersAnsweredQuestions editMade={editMade} setEditMade={setEditMade} />
        </div>
        <div className={'faq-leaders-unanswered-questions'}>
          <FAQLeadersUnansweredQuestions editMade={editMade} setEditMade={setEditMade} />
        </div>
        {/* <Checkboxes
          values={['Unanswered']}
          onSelected={() => {
            setIsUnanswered(!isUnanswered);
          }}
        />
        <div className={`${isUnanswered ? 'faq-leaders-hide' : ''}`}>
          <FAQLeadersAnsweredQuestions editMade={editMade} setEditMade={setEditMade} />
        </div>
        <div className={`${!isUnanswered ? 'faq-leaders-hide' : ''}`}>
          <FAQLeadersUnansweredQuestions editMade={editMade} setEditMade={setEditMade} />
        </div> */}
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
      //console.log(questions);
      for (let i = 0; i < questions.length; i++) {
        if (!questionsObject.hasOwnProperty(questions[i].category)) {
          questionsObject[questions[i].category] = [];
          questionsObject[questions[i].category].push({
            question: questions[i].question,
            email: questions[i].email,
            answer: questions[i].answer,
            category: questions[i].category,
            isAnswered: questions[i].isAnswered,
            id: questions[i]._id,
          });
          questionCategories.push({ name: questions[i].category });
        } else {
          questionsObject[questions[i].category].push({
            question: questions[i].question,
            email: questions[i].email,
            answer: questions[i].answer,
            category: questions[i].category,
            isAnswered: questions[i].isAnswered,
            id: questions[i]._id,
          });
        }
      }
      for (let i = 0; i < Object.keys(questionsObject).length; i++) {
        allQuestions.push(questionsObject[Object.keys(questionsObject)[i]]);
      }
      //console.log(allQuestions);
      setAllQuestions(allQuestions);
      setQuestionCategories(questionCategories);
    } catch (error) {
      //console.log(error);
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
        if (!questionsObject.hasOwnProperty(questions[i].category)) {
          //console.log(questions[i]);
          questionsObject[questions[i].category] = [];
          questionsObject[questions[i].category].push({
            question: questions[i].question,
            email: questions[i].email,
            answer: questions[i].answer,
            category: questions[i].category,
            isAnswered: questions[i].isAnswered,
            id: questions[i]._id,
          });
          questionCategories.push({ name: questions[i].category });
        } else {
          //console.log(questions[i]);
          questionsObject[questions[i].category].push({
            question: questions[i].question,
            email: questions[i].email,
            answer: questions[i].answer,
            category: questions[i].category,
            isAnswered: questions[i].isAnswered,
            id: questions[i]._id,
          });
        }
      }
      for (let i = 0; i < Object.keys(questionsObject).length; i++) {
        allQuestions.push(questionsObject[Object.keys(questionsObject)[i]]);
      }
      setAllQuestions(allQuestions);
      setQuestionCategories(questionCategories);
    } catch (error) {
      //console.log(error);
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
  const [isAnswered, setIsAnswered] = useState(!question.isAnswered);
  // console.log(question.category);
  const initialFormData = {
    question: '',
    answer: '',
    category: '',
    isAnswered: false,
  };
  const [formData, updateFormData] = useState(initialFormData);
  useEffect(() => {
    //console.log('change is made')
    updateFormData({
      question: questionText,
      answer: answerText,
      category: categoryText,
      isAnswered: isAnswered,
    });
  }, [questionText, answerText, categoryText, isAnswered]);
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
    //console.log(isAnswered);
    //console.log(formData);
    submitEdit(id, formData);
    setIsEdit(false);
    setEditButtonText('Edit');
    setEditMade(!editMade);
  };
  return (
    <div className={'faq-leaders-questions-container'}>
      <div className={`${isEdit ? 'faq-leaders-hide' : ''}`}>
        <div className={'faq-leaders-questions'}>{questionText}</div>
        <div className={'faq-leaders-answers'}>{answerText}</div>
        <div className={'faq-leaders-category'}>Category: {categoryText}</div>
        <div className={'faq-leaders-email'}>Email: {question.email}</div>
      </div>
      <div className={`${!isEdit ? 'faq-leaders-hide' : ''}`}>
        <form>
          <div className={'faq-leaders-edit-title-container'}>
            <div className={'faq-leaders-edit-title'}>Edit</div>
          </div>
          <label>
            <div className={''}>
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
          label={'Delete'}
          onClick={async () => {
            deleteQuestion(question.id);
            setEditMade(!editMade);
          }}
        />
      </span>
      <span className={isEdit ? 'faq-leaders-hide' : ''}>
        <Button
          label={editButtonText}
          onClick={() => {
            setIsEdit(!isEdit);
            // setEditButtonText(`${isEdit ? 'Edit' : 'Stop Edit'}`);
          }}
        />
      </span>
      <span className={!isEdit ? 'faq-leaders-hide' : ''}>
        <Button label={'Save'} onClick={() => handleSubmit(question.id)} />
      </span>
      <div className={`${!isEdit ? 'faq-leaders-hide-questions' : ''}`}>
        {/* <Checkboxes
          values={['Answered']}
          onSelected={() => {
            //console.log(isAnswered);
            setIsAnswered(!isAnswered);
            setEditMade(!editMade);
          }}
          initialSelectedIndices={!isAnswered ? [0] : []}
        /> */}
      </div>
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
          <TextInput
            onChange={(text) => handleEditAnswer(text)}
            inputType={'textArea'}
            placeholder={'Answer'}
            initialValue={''}
            style={{ height: '200px', resize: 'vertical' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div className={''}>
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
