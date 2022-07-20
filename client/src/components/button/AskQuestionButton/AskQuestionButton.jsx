import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AskQuestionButton.scss';
import { ErrorSuccessBox } from '../../containers/ErrorSuccessBox/ErrorSuccessBox';
import { Button } from '../Button/Button';
import { TextInput } from '../../input/TextInput/TextInput';
import LoadingAnimation from '../../misc/LoadingAnimation/LoadingAnimation';
import QuestionMark from '../../../../assets/icons/question-mark-solid.svg';
import { submitQuestion } from './functions';
import { PopupModal } from '../../popup/PopupModal';

const FAQAskQuestion = ({ pageState, setPageState, user }) => {
  const [signUpError, setSignUpError] = useState('');
  const [errorColor, setErrorColor] = useState(false);
  const initialFormData = {
    question: '',
    email: user?.email ?? '',
  };
  const [emailText, setEmailText] = useState({ email: user ? user.email : '' });
  const [questionText, setQuestionText] = useState({});
  const [formData, updateFormData] = useState(initialFormData);
  const [clearText, setClearText] = useState(false);
  useEffect(() => {
    updateFormData({ question: questionText.question, email: emailText.email });
  }, [emailText, questionText]);
  const handleChangeEmail = (text) => {
    let newEmailState = { ...emailText };
    newEmailState.email = text;
    setEmailText(newEmailState);
  };
  const handleChangeQuestion = (text) => {
    let newQuestionState = { ...questionText };
    newQuestionState.question = text;
    setQuestionText(newQuestionState);
  };
  async function handleSubmit(text) {
    // console.log(submitQuestion(formData));
    //console.log(formData);
    if (formData?.question?.length > 0 && formData?.email?.length > 0) {
      setPageState('loading');
      const result = await submitQuestion(formData);
      if (result !== true) {
        setSignUpError(result);
        setErrorColor(true);
        setPageState('form');
      } else {
        setPageState('success');
        updateFormData(initialFormData);
        setClearText(true);
        setSignUpError('Thank you for submitting your question!');
        setErrorColor(false);
        setPageState('form');
      }
    }
  }

  return (
    <div className={'faq-ask-question-container'}>
      <div className={'faq-ask-question-stacking'}>
        <div
          className={`faq-page-questions ${
            pageState !== 'form' ? 'faq-page-disappear' : 'faq-page-appear'
          }`}
        >
          <h1 className={'faq-ask-question-title'}>Can&apos;t Find Your Question?</h1>
          <ErrorSuccessBox content={signUpError} error={errorColor} success={!errorColor} />
          <form>
            <label>
              <div className={'faq-ask-question-email-box'}>
                <TextInput
                  onChange={(text) => handleChangeEmail(text)}
                  inputType={'text'}
                  placeholder={'Email'}
                  initialValue={emailText.email}
                  style={{ height: '45px' }}
                  clearText={clearText}
                  setClearText={setClearText}
                />
              </div>
            </label>
            <label>
              <div className={'faq-ask-question-box'}>
                <TextInput
                  onChange={(text) => handleChangeQuestion(text)}
                  inputType={'textArea'}
                  placeholder={'Type your question here...'}
                  style={{ height: '150px', resize: 'vertical' }}
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
        <div
          className={`faq-loading ${pageState === 'loading' ? 'faq-loading-appear' : ''} 
          ${pageState === 'success' ? 'faq-loading-disappear' : ''}`}
        >
          <LoadingAnimation size={'60px'} />
        </div>
      </div>
    </div>
  );
};

FAQAskQuestion.propTypes = {
  pageState: PropTypes.string.isRequired,
  setPageState: PropTypes.string.isRequired,
  user: PropTypes.object,
};

const AskQuestionButton = ({ showPopUp, setShowPopUp, pageState, setPageState, user }) => {
  return (
    <>
      <PopupModal
        trigger={showPopUp}
        setTrigger={setShowPopUp}
        blurBackground={false}
        exitIcon={true}
      >
        <div className="ask-question-popup">
          <div className={'faq-ask-question-outer-container'}>
            <FAQAskQuestion pageState={pageState} setPageState={setPageState} user={user} />
          </div>
        </div>
      </PopupModal>
      <div className={'faq-fab'}>
        <Button
          style={{ boxShadow: '5px 5px 20px #13131362' }}
          class_options={'faq-fab-button'}
          label={
            <div className={'faq-fab-container'}>
              <img
                className={'faq-fab-icon'}
                src={QuestionMark}
                alt="Question Button"
                height={30}
              />
              <span className={'faq-fab-content'}>Ask a Question</span>
            </div>
          }
          isSecondary
          onClick={() => {
            setShowPopUp(true);
          }}
        />
      </div>
    </>
  );
};

AskQuestionButton.propTypes = {
  showPopUp: PropTypes.bool.isRequired,
  setShowPopUp: PropTypes.func.isRequired,
  pageState: PropTypes.string.isRequired,
  setPageState: PropTypes.string.isRequired,
  user: PropTypes.object,
};

export { AskQuestionButton };
