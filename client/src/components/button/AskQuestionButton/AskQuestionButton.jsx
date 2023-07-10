import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './AskQuestionButton.scss';
import { ErrorSuccessBox } from '../../containers/ErrorSuccessBox/ErrorSuccessBox';
import { Button } from '../Button/Button';
import { TextInput } from '../../input/TextInput/TextInput';
import LoadingAnimation from '../../misc/LoadingAnimation/LoadingAnimation';
import QuestionMark from '../../../../assets/icons/question-mark-solid.svg';
import { submitQuestion } from './functions';
import { PopupModal } from '../../popup/PopupModal';
import { userSelector } from '../../../state/user/userSlice';
import { useSelector } from 'react-redux';
import { SnackbarContext } from '../../../util/SnackbarProvider';

const FAQAskQuestion = () => {
  const { user } = useSelector(userSelector);

  const [pageState, setPageState] = useState('form');
  const initialFormData = {
    question: '',
    email: user?.email ?? '',
  };
  const [emailText, setEmailText] = useState({ email: user ? user.email : '' });
  const [questionText, setQuestionText] = useState({});
  const [formData, updateFormData] = useState(initialFormData);
  const [clearText, setClearText] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);

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
    if (formData?.question?.length > 0 && formData?.email?.length > 0) {
      setPageState('loading');
      const result = await submitQuestion(formData);
      if (result !== true) {
        setPageState('form');
        setSnackbar('There was an error submitting your question. ' + result, true);
      } else {
        setPageState('success');
        updateFormData(initialFormData);
        setClearText(true);
        setSnackbar('Thank you for submitting your question!', false);
        setPageState('form');
      }
    } else {
      setSnackbar('Please fill in the form.', true);
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
          <h1 className={'faq-ask-question-title'}>Ask a Question</h1>
          <p className="faq-ask-question-paragraph">We will get back to you in an email soon!</p>
          <form>
            <label>
              <div className={'faq-ask-question-email-box'}>
                <TextInput
                  onChange={(text) => handleChangeEmail(text)}
                  inputType={'text'}
                  placeholder={'Email'}
                  initialValue={emailText.email}
                  style={{ height: '45px' }}
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

const AskQuestionButton = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const { user } = useSelector(userSelector);

  const leader = user?.userType === 'leadur';
  if (leader) {
    return <></>;
  }
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
            <FAQAskQuestion />
          </div>
        </div>
      </PopupModal>
      <div className={'faq-fab'}>
        <Button
          style={{ boxShadow: '5px 5px 20px #13131362' }}
          class_options="faq-fab-button"
          label={
            <div className={'faq-fab-container'}>
              <img
                className={'faq-fab-icon'}
                src={QuestionMark}
                alt="Question Button"
                height={30}
              />
              <div className="desktop-only">
                <span className={'faq-fab-content'}>Ask a Question</span>
              </div>
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

export { AskQuestionButton };
