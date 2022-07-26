import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getAnsweredQuestions,
  sortQuestions,
  getUnansweredQuestions,
  deleteQuestion,
  submitEdit,
  submitQuestion,
  getQuestionCategories,
} from './functions';
import './FAQLeaders.scss';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import { Checkboxes } from '../../components/form/Checkboxes/Checkboxes';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';

const PageFAQLeaders = () => {
  const [isUnanswered, setIsUnanswered] = useState(false);
  return (
    <div className={'faq-leaders-page'}>
      <div className={'faq-leaders-titles'}>Create a new question:</div>
      <FAQLeadersNewPost />
      <div className={'faq-leaders-titles'}>Toggle for answered and unanwered questions:</div>
      <Checkboxes
        values={['Unanswered']}
        onSelected={() => {
          setIsUnanswered(!isUnanswered);
        }}
      />
      <div className={'faq-leaders-titles'}>Questions:</div>
      <div className={`${isUnanswered ? 'faq-leaders-hide-questions' : ''}`}>
        <FAQLeadersAnsweredQuestions />
      </div>
      <div className={`${!isUnanswered ? 'faq-leaders-hide-questions' : ''}`}>
        <FAQLeadersUnansweredQuestions />
      </div>
    </div>
  );
};

const FAQLeadersAnsweredQuestions = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allQuestions, setAnsweredQuestions] = useState([]);
  const [questionCategories, setQuestionCategories] = useState([]);
  useEffect(async () => {
    setAnsweredQuestions(await getAnsweredQuestions());
    setQuestionCategories(await getQuestionCategories()); //TODO: link with backend
  }, []);
  const selectedQuestions = allQuestions[activeIndex].map((question, index) => (
    <div key={index}>
      <FAQLeadersQuestionWrapper question={question} />
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
  //const [unansweredQuestions, setUnansweredQuestions] = useState();
  const questionCategories = [];
  const questionsObject = {};
  const allQuestions = [];
  // useEffect(async () => {
  //   setUnansweredQuestions(await getUnansweredQuestions()); //TODO: link with backend
  // }, []);
  const unansweredQuestions = getUnansweredQuestions();
  sortQuestions(unansweredQuestions, questionCategories, questionsObject);
  for (let i = 0; i < Object.keys(questionsObject).length; i++) {
    allQuestions.push(questionsObject[Object.keys(questionsObject)[i]]);
  }
  const selectedQuestions = allQuestions[activeIndex].map((question, index) => (
    <div key={index}>
      <FAQLeadersQuestionWrapper question={question} />
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

const FAQLeadersQuestionWrapper = ({ question }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit');
  const [questionText, setQuestionText] = useState(question.question);
  const [answerText, setAnswerText] = useState(question.answer);
  const initialFormData = {
    question: '',
    answer: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  useEffect(() => {
    updateFormData({ question: questionText, answer: answerText });
  }, [questionText, answerText]);
  const handleEditQuestion = (text) => {
    setQuestionText(text);
  };
  const handleEditAnswer = (text) => {
    setAnswerText(text);
  };
  const handleSubmit = async (id) => {
    submitEdit(id, formData); //TODO: Link with backend
  };
  return (
    <div className={'faq-leaders-questions-container'}>
      <div className={'faq-leaders-questions'}>{question.question}</div>
      <div className={'faq-leaders-answers'}>{question.answer}</div>
      <div className={`${!isEdit ? 'faq-leaders-hide-questions' : ''}`}>
        <div className={'faq-leaders-edit-title'}>Edit</div>
        <form>
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
          <div style={{ textAlign: 'center' }}>
            <Button label={'Save'} onClick={() => handleSubmit(question.id)} />
          </div>
        </form>
      </div>

      <Button
        label={'Delete'}
        onClick={async () => {
          deleteQuestion(question.id); //TODO: Link to backend
        }}
      />
      <Button
        label={editButtonText}
        onClick={() => {
          setIsEdit(!isEdit);
          setEditButtonText(`${isEdit ? 'Edit' : 'Stop Edit'}`);
        }}
      />
    </div>
  );
};

FAQLeadersQuestionWrapper.propTypes = {
  question: PropTypes.object.isRequired,
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

const FAQLeadersNewPost = () => {
  const [questionText, setQuestionText] = useState('');
  const [answerText, setAnswerText] = useState('');
  const [categoryText, setCategoryText] = useState('');
  const initialFormData = {
    question: '',
    answer: '',
    category: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  useEffect(() => {
    updateFormData({ question: questionText, answer: answerText, category: categoryText });
  }, [questionText, answerText, categoryText]);
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
    submitQuestion(formData); //TODO: Link with backend
  };
  return (
    <form>
      <label>
        <div className={''}>
          <TextInput
            onChange={(text) => handleEditQuestion(text)}
            inputType={'text'}
            placeholder={'Question'}
            initialValue={''}
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
            initialValue={''}
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
            initialValue={''}
            style={{ height: '45px' }}
          />
        </div>
      </label>
      <div>
        <Button label={'Create Question and Answer'} onClick={() => handleSubmit()} />
      </div>
    </form>
  );
};

export { PageFAQLeaders };
