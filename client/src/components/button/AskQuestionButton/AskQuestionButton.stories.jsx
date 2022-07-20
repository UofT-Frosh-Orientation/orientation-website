import { React, useState } from 'react';
import { AskQuestionButton } from './AskQuestionButton';

export default {
  title: 'AskQuestionButton',
  component: AskQuestionButton,
};

export const AskQuestionGlobal = () => {
  const [pageState, setPageState] = useState('form');
  const [showPopUp, setShowPopUp] = useState(false);
  const user = { email: 'test@mail.com' };
  return (
    <AskQuestionButton
      showPopUp={showPopUp}
      setShowPopUp={setShowPopUp}
      pageState={pageState}
      setPageState={setPageState}
      user={user}
    />
  );
};
