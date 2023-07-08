import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './FroshRetreat.scss';
import { Header } from '../../components/text/Header/Header';
import { Button } from '../../components/button/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { registeredSelector, userSelector } from '../../state/user/userSlice';
import { useSelector } from 'react-redux';
import { RadioButtons } from '../../components/form/RadioButtons/RadioButtons';
import { ErrorSuccessBox } from '../../components/containers/ErrorSuccessBox/ErrorSuccessBox';
import { SnackbarContext } from '../../util/SnackbarProvider';
import waiverPDF from '../../assets/retreatWaiver/frosh-retreat-2T3-waiver.pdf';
import useAxios from '../../hooks/useAxios';

export const FroshRetreat = () => {
  const [remainingTickets, setRemainingTickets] = useState();
  const { setSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const isRegistered = useSelector(registeredSelector);

  const remainingTicketsSetter = async () => {
    setRemainingTickets(await getRemainingTickets(setSnackbar));
  };

  useEffect(() => {
    remainingTicketsSetter();
  }, []);

  useEffect(() => {
    // if (!isRegistered) {
    //   navigate('/profile');
    // }
  }, [isRegistered]);

  return (
    <div className="frosh-retreat-page">
      <Header text={'Retreat'} underlineDesktop={'260px'} underlineMobile={'185px'}>
        <div className="info-header">
          <h1>Remaining Tickets: {remainingTickets}</h1>
          <h3 style={{ color: 'var(--white)', margin: '20px 0', textAlign: 'center' }}>
            Escape the city to the lovely Hart House Farms for a weekend of wholesome camp vibes!
          </h3>
          <p style={{ color: 'var(--white)' }}>
            The retreat is taking place on September 9th and September 10th, 2023 at Hart House
            Farm.
          </p>
          <p style={{ color: 'var(--white)' }}>
            Due to limited spaces, we are selling a limited number of tickets so purchase yours
            before they sell out!{' '}
          </p>
          <p style={{ color: 'var(--white)' }}>
            Tickets to Retreat are $95.00 &#40;they include bus transportation; no tickets without
            bus transportation&#41;
          </p>
        </div>
      </Header>
      <div style={{ height: '20px' }} />
      <iframe
        className="frosh-retreat-video"
        src="https://www.youtube.com/embed/eGwsNvgroCI?autoplay=1"
        title="F!rosh Retreat Info"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <div style={{ height: '20px' }} />
      <h1>Registration</h1>
      <RetreatRegistration />
    </div>
  );
};

export async function getRemainingTickets(setSnackbar) {
  try {
    const { axios } = useAxios();
    const response = await axios.get('/payment/frosh-retreat-remaining-tickets');

    return response.data.count;
  } catch (e) {
    setSnackbar(e.toString(), true);
  }
}

const RetreatRegistration = () => {
  const [viewedWaiver, setViewedWaiver] = useState(false);
  const [waiverValue, setWaiverValue] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  const waiverLink = '../../assests/retreatWaiver/frosh-retreat-2T3-waiver.pdf';

  const { user } = useSelector(userSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const { axios } = useAxios();
  const isRetreat = user?.isRetreat === true;

  const [outOfTickets, setOutOfTickets] = useState(false);

  const outOfTicketsSetter = async () => {
    setOutOfTickets((await getRemainingTickets(setSnackbar)) <= 0);
  };

  useEffect(() => {
    outOfTicketsSetter();
  }, []);

  return (
    <div style={{ margin: '0 20px' }}>
      <p style={{ textAlign: 'center' }}>
        In order to register, the following information will be collected from your account. Please
        ensure this information is accurate and up to date. If any information needs to be modified,
        please edit your information <Link to={'/profile-edit'}>here</Link>.
      </p>
      <div className="retreat-registration-form">
        <div className="display-field">
          <h3>Full name:</h3>{' '}
          <p>
            {user?.firstName +
              ' ' +
              user?.lastName +
              (user?.preferredName ? ' (' + user?.preferredName + ')' : '')}
          </p>
        </div>
        <div className="display-field">
          <h3>Email:</h3> <p>{user?.email}</p>
        </div>
        <div className="display-field">
          <h3>Phone Number:</h3>{' '}
          <p>
            {(!user?.phoneNumberAreaCode ? '' : user?.phoneNumberAreaCode) +
              ' ' +
              user?.phoneNumber}
          </p>
        </div>
        <div className="display-field">
          <h3>Dietary Restrictions:</h3>{' '}
          <p>
            {!user?.allergies || user?.allergies.length <= 0 ? 'None' : user?.allergies.join(', ')}
          </p>
          {!user?.allergiesMore ? <p>{user?.allergiesMore}</p> : <></>}
        </div>
        <div className="display-field">
          <h3>Medical Info:</h3>{' '}
          <p>{!user?.medicalInfo || user?.medicalInfo === '' ? 'None' : user?.medicalInfo}</p>
        </div>
        <div className="display-field">
          <h3>Medication:</h3>{' '}
          <p>{!user?.medication || user?.medication === '' ? 'None' : user?.medication}</p>
        </div>
        <div className="display-field">
          <h3>Emergency Contact:</h3>{' '}
          <p>{`${user?.emergencyContactName} - ${user?.emergencyContactRelationship}: ${
            !user?.emergencyContactNumberAreaCode ? '' : user?.emergencyContactNumberAreaCode
          } ${user?.emergencyContactNumber}`}</p>
        </div>
        <div className="radio-buttons-retreat">
          <Button
            label="Read and Download the Frosh Retreat Waiver here"
            isSecondary
            onClick={() => {
              window.open(waiverPDF, '_blank').focus();
              setViewedWaiver(true);
            }}
            style={{ marginBottom: '25px' }}
          />
          <h3>
            I have read and agree to the Frosh Retreat Waiver. By selecting &apos;Yes&apos; I
            understand the terms laid out by this agreement.
          </h3>
          <h4>
            <i>
              Please bring a signed copy of the waiver to retreat. This can be a digital or physical
              and must be signed by your parent/guardian before retreat, you are still under 18.
            </i>
          </h4>
          <div style={{ height: '10px' }} />
          {viewedWaiver ? (
            <RadioButtons
              initialSelectedIndex={1}
              values={['Yes', 'No']}
              onSelected={(value) => {
                setWaiverValue(value);
                if (value === 'Yes')
                  setSnackbar('Please bring a signed copy of the waiver to retreat!');
              }}
            />
          ) : (
            <></>
          )}
        </div>
        {isRetreat ? (
          <h2>You have already payed for Frosh Retreat!</h2>
        ) : outOfTickets ? (
          <h2>Sorry there are no more tickets available!</h2>
        ) : viewedWaiver ? (
          <Button
            label={'Continue to Payment'}
            isDisabled={waiverValue !== 'Yes' || buttonClicked}
            onClick={() => {
              if (waiverValue === 'Yes') {
                setButtonClicked(true);
                axios
                  .post('/payment/frosh-retreat-payment')
                  .then((response) => {
                    const { url } = response.data;
                    window.location.href = url;
                  })
                  .catch((err) => {
                    console.error(err);
                    setSnackbar(
                      'Something went wrong! Please file a bug report on GitHub if this issue persists',
                      true,
                    );
                    setButtonClicked(false);
                  });
                // Redirect the user to the payment for Retreat here!
              } else {
                setSnackbar('Please accept the Frosh Waiver before proceeding!', true);
              }
            }}
          />
        ) : (
          <></>
        )}
      </div>
      {isRetreat ? (
        <ErrorSuccessBox success content="You have already accepted the agreement!" />
      ) : viewedWaiver ? (
        <></>
      ) : (
        <ErrorSuccessBox error content="Please view the Frosh Retreat Waiver before proceeding!" />
      )}
    </div>
  );
};
