import React, { useContext } from 'react';
import './PaymentError.scss';
import MoneyChicken from '../../assets/paymenterror/money-chicken.svg';
import SweatDrop from '../../assets/paymenterror/sweat-drop.svg';
import Spotlight from '../../assets/paymenterror/spotlight.svg';
import QuestionMark from '../../assets/paymenterror/qmark.svg';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InstagramIconWhite from '../../assets/social/instagram-brands.svg';
import EmailIconWhite from '../../assets/social/envelope-regular.svg';
import InstagramIconPurple from '../../assets/social/instagram-brands-purple.svg';
import EmailIconPurple from '../../assets/social/envelope-regular-purple.svg';
import { DarkModeContext } from '../../util/DarkModeProvider';

const PaymentErrorGraphic = () => {
  return (
    <div className="payment-error-image">
      {' '}
      {/* new payment error visuals*/}
      <img className="spotlight" src={Spotlight} />
      <img className="chicken" src={MoneyChicken} />
      <img className="sweat" src={SweatDrop} />
      <img className="question-1" src={QuestionMark} />
      <img className="question-2" src={QuestionMark} />
      <img className="question-3" src={QuestionMark} />
    </div>
  );
};

const PagePaymentError = ({ link }) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);

  if (link === '/frosh-retreat') {
    console.log('Payment Error: F!rosh Retreat');
  }

  return (
    <>
      <div className="payment-error-page">
        <div className="payment-error-container">
          <PaymentErrorGraphic />

          <div className="payment-error-text-container">
            <h2 className="payment-error-text-container-title">Oops!</h2>
            <p className="payment-error-text-container-body">
              Sorry, we were unable to process your payment.<br></br>Please try again!
            </p>

            <Link to={link} className="no-link-style">
              <ButtonRound label={'Back to Payment'} onClick={() => {}} />
            </Link>

            <p className="payment-error-text-container-body">
              Tried multiple times and payment is still failing?
              <br></br>Send a message to our Instagram or email us about your issue!
            </p>
            <div className="no-link-style social-icons">
              <a
                href="https://www.instagram.com/froshweek/"
                className="no-link-style shrink"
                target="_blank"
                rel="noreferrer"
              >
                {darkMode ? (
                  <img alt="Instagram" src={InstagramIconWhite} className="icon-style"></img>
                ) : (
                  <img alt="Instagram" src={InstagramIconPurple} className="icon-style"></img>
                )}
              </a>
              <a
                href="mailto:tech@orientation.skule.ca"
                className="no-link-style shrink"
                target="_blank"
                rel="noreferrer"
              >
                {darkMode ? (
                  <img alt="Email" src={EmailIconWhite} className="icon-style"></img>
                ) : (
                  <img alt="Email" src={EmailIconPurple} className="icon-style"></img>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

PagePaymentError.propTypes = {
  link: PropTypes.string,
};

export { PagePaymentError };
