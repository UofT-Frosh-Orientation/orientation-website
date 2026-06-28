import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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

// eslint-disable-next-line no-unused-vars
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
  // Ask-a-question popup functionality commented out; the CD now links to the FAQ page instead.
  // const [showPopUp, setShowPopUp] = useState(false);
  const { user } = useSelector(userSelector);

  const leader = user?.userType === 'leadur';

  if (leader || !user) {
    // don't show FAQ button if leadur or if not logged in
    return <></>;
  }
  // Spinning CD FAQ button hidden on both desktop and mobile.
  return <></>;
  // eslint-disable-next-line no-unreachable
  return (
    <>
      {/* <PopupModal
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
      </PopupModal> */}
      <Link to={'/faq'} className={'faq-fab'}>
        <Button
          label={
            <div className={'faq-fab-container'}>
              <div className={'faq-fab-cd'}>
                <div className={'faq-fab-cd-disc'} />
                <img className={'faq-fab-cd-label'} src={QuestionMark} alt="?" />
                <div className={'faq-fab-cd-hole'} />
              </div>
            </div>
          }
          isSecondary
          // onClick={() => {
          //   setShowPopUp(true);
          // }}
        />
      </Link>
    </>
  );
};

export { AskQuestionButton };
