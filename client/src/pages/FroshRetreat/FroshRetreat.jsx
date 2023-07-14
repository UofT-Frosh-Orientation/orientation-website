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
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import egglinton from '../../assets/mascots/Egglinton-1.png';

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
        <FroshRetreatFAQ />
      </Header>
      <div style={{ height: '20px' }} />
      <h3 style={{ color: 'var(--white)', margin: '20px 0', textAlign: 'center' }}>
        See this video of Retreat 2T0 for a sense of the trip!
      </h3>
      <iframe
        className="frosh-retreat-video"
        src="https://www.youtube.com/embed/eGwsNvgroCI?autoplay=1"
        title="F!rosh Retreat Info"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <p style={{ color: 'var(--text-dynamic)', margin: '10px 0', textAlign: 'center' }}>
        Interested to see more of retreat? Retreat 2T2 was the perfect camping getaway after the
        rush of frosh week!{' '}
        <a
          href="https://photos.skule.ca/2T2-2T3/Frosh-Week/Events/Retreat"
          target="_blank"
          rel="noreferrer"
        >
          Check out the photos here!{' '}
        </a>
      </p>

      <div style={{ height: '20px' }} />
      <h1>Registration</h1>
      <RetreatRegistration />
    </div>
  );
};

const retreatFAQs = [
  {
    title: 'What is F!rosh Retreat?',
    description:
      'An overnight camping experience for Frosh at Hart House Farms that allows frosh to play games and immerse themselves in their new Skule community! Frosh week has a lot going on, so unwind with this engaging experience including activities, food, and fun!',
  },
  {
    title: 'What is provided?',
    description: [
      '• 3 healthy, diverse meals for Frosh (lunch, dinner, breakfast) as well as snacks to keep the fun-fuelled!',
      '• An assortment of engaging activities',
      '• Transportation to and from Hart House Farms',
    ],
  },
  {
    title:
      'What do I need to bring (a more comprehensive list will be sent to attendees at a later date)?',
    description: [
      '• Sleeping bags, tents, pillows and blankets to sleep in',
      '• Bathing suits, towels, and comfy clothes to enjoy all the activities retreat has to offer',
      '• Water bottle, personal medications, and any extra snacks you want to bring to stay safe and hydrated during the trip',
      '• Anything appropriate for a 36-hour camping trip on a farm!',
    ],
  },
];

const FroshRetreatFAQ = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'var(--white)',
          width: '70%',
          alignSelf: 'center',
        }}
      >
        <img src={egglinton} style={{ width: '200px', margin: '20px' }}></img>
        <h2 style={{ marginBottom: '20px' }}>
          Get Moo-ving with our FAQs: Prepare for a Good Time Down on the Farm!
        </h2>
        {retreatFAQs.map((item, index) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <React.Fragment key={item.title}>
              <SingleAccordion
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                header={<div className={'faq-search-result-question-accordion'}>{item.title}</div>}
                style={{
                  backgroundColor: 'var(--faq-answer-containers)',
                  margin: '10px',
                  padding: '0px 30px',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {Array.isArray(item.description) ? (
                  <>
                    <ul className="frosh-retreat-faq-bullet">
                      {item.description.map((listItem, index) => {
                        return <li key={listItem}>{listItem}</li>;
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <p style={{ margin: 0 }}>{item.description}</p>
                  </>
                )}
              </SingleAccordion>
            </React.Fragment>
          );
        })}
      </div>
    </>
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
  const isRetreat = user?.interestedInRetreat === true;

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
            {(!user?.phoneNumberCountryCode ? '' : user?.phoneNumberCountryCode) +
              ' ' +
              user?.phoneNumber}
          </p>
        </div>
        <div className="display-field">
          <h3>Dietary Restrictions:</h3>{' '}
          <p>
            {!user?.allergies || user?.allergies.length <= 0 ? 'None' : user?.allergies.join(', ')}
          </p>
          {!user?.allergiesOther ? <p>{user?.allergiesOther}</p> : <></>}
        </div>
        <div className="display-field">
          <h3>Medical Info:</h3>{' '}
          <p>{!user?.medicalInfo || user?.medicalInfo === '' ? 'None' : user?.medicalInfo}</p>
          <p>
            {!user?.specficMedicalInfo || user?.specficMedicalInfo === ''
              ? 'None'
              : user?.specficMedicalInfo}
          </p>
        </div>
        <div className="display-field">
          <h3>Medication:</h3>{' '}
          <p>{!user?.medication || user?.medication === '' ? 'None' : user?.medication}</p>
        </div>
        <div className="display-field">
          <h3>Emergency Contact:</h3>{' '}
          <p>{`${user?.emergencyContactName} - ${user?.emergencyContactRelationship}: ${user?.emergencyContactNumber}`}</p>
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
          <h3>I have read and agree to the Frosh Retreat Waiver.</h3>
          <h4>
            <i>
              By pressing &apos;Yes&apos; you/a guardian if you are under 18 have digitally signed
              the waiver.
            </i>
          </h4>
          <div style={{ height: '10px' }} />
          {viewedWaiver ? (
            <RadioButtons
              initialSelectedIndex={1}
              values={['Yes', 'No']}
              onSelected={(value) => {
                setWaiverValue(value);
                if (value === 'Yes') setSnackbar('Thanks for reading the waiver!');
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
