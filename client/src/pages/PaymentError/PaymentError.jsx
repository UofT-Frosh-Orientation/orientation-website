import { React, useState } from 'react';
import './PaymentError.scss';
import ArcheologyDig from '../../assets/paymenterror/archeology-dig.svg';
import { Button } from '../../components/button/Button/Button';
import { Link } from 'react-router-dom';

const PagePaymentError = () => {
  return (
    <>
      <div className="payment-error-page">
        <div className="payment-error-container">
          <img className="payment-error-image" src={ArcheologyDig}></img>

          <div className="payment-error-text-container">
            <h2 className="payment-error-text-container-title">Oops!</h2>
            <p className="payment-error-text-container-body">
              Sorry, we were unable to process your payment.<br></br>Please try again!
            </p>

            <Link to={'/registration'}>
              <Button label={'Back to Payment'} onClick={() => {}} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { PagePaymentError };
