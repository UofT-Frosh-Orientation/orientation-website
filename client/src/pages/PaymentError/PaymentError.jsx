import React, { useState, useEffect, useContext } from 'react';

import './PaymentError.scss';
import MoneyChicken from '../../assets/paymenterror/money-chicken.svg';
import SweatDrop from '../../assets/paymenterror/sweat-drop.svg';
import Spotlight from '../../assets/paymenterror/spotlight.svg';
import QuestionMark from '../../assets/paymenterror/qmark.svg';
import { Button } from '../../components/button/Button/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PaymentErrorGraphic = () => {
  return (
    <div className="payment-error-image">
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
              <Button label={'Back to Payment'} onClick={() => {}} />
            </Link>
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
