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
import waiverPDF from '../../assets/retreatWaiver/frosh-retreat-2T4-waiver.pdf';
import useAxios from '../../hooks/useAxios';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import dragon from '../../assets/mascots/dragon-retreat.svg';

export const FroshRetreat = () => {
  const [remainingTickets, setRemainingTickets] = useState();
  const { setSnackbar } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const isRegistered = useSelector(registeredSelector);
  const { user } = useSelector(userSelector);
  const accountObj = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    preferredName: user.preferredName || '',
    phoneNumber: user.phoneNumber || '',
    phoneNumberCountryCode: user.phoneNumberCountryCode || '',
    emergencyContactName: user.emergencyContactName || '',
    emergencyContactRelationship: user.emergencyContactRelationship || '',
    emergencyContactCountryCode: user.emergencyContactCountryCode || '',
    emergencyContactNumber: user.emergencyContactNumber || '',
    email: user.email || '',
    allergies: user.allergies || [],
    allergiesOther: user.allergiesOther || '',
    medicalInfo: user.medicalInfo || '',
    specficMedicalInfo: user.specficMedicalInfo || '',
    medication: user.medication || '',
  };

  const remainingTicketsSetter = async () => {
    setRemainingTickets(await getRemainingTickets(setSnackbar));
  };

  useEffect(() => {
    remainingTicketsSetter();
  }, []);

  // useEffect(() => {
  //   if (!isRegistered) {
  //     navigate('/profile');
  //   }
  // }, [isRegistered]);

  return (
    <div className="frosh-retreat-page">
      <Header text={'RETREAT'} underlineDesktop={'260px'} underlineMobile={'185px'}>
        <div className="info-header">
          <h1>REMAINING TICKETS: {remainingTickets}</h1>
          <h3 style={{ color: 'var(--white)', margin: '20px 0', textAlign: 'center' }}>
            ESCAPE THE CITY TO THE LOVELY HART HOUSE FARMS FOR A WEEKEND OF WHOLESOME CAMP VIBES!
          </h3>
          <p style={{ color: 'var(--white)' }}>
            The retreat is taking place on August 31st and September 1st, 2024 at Hart House Farm.
          </p>
          <p style={{ color: 'var(--white)' }}>
            Due to limited spaces, we are selling a limited number of tickets so purchase yours
            before they sell out!{' '}
          </p>
          <p style={{ color: 'var(--white)' }}>
            Tickets to Retreat are $103.00 &#40;they include bus transportation; no tickets without
            bus transportation&#41;
          </p>
        </div>
        <FroshRetreatFAQ />
      </Header>
      <div style={{ height: '20px' }} />
      <h3 style={{ color: 'var(--white)', margin: '20px 0', textAlign: 'center' }}>
        SEE THIS VIDEO OF RETREAT 2T0 FOR A SENSE OF THE TRIP!
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
      <h1>REGISTRATION</h1>
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
  {
    title:
      'What time does the bus leave?',
    description: [
      'The bus leaves from campus at 11:00am on August 31st and returns to campus at 1:00pm on September 1st.',
    ],
  }
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
        <img src={dragon} style={{ width: '350px', margin: '20px' }}></img>
        <h2 style={{ marginBottom: '20px' }}>
          FAQS: PREPARE FOR A GOOD TIME DOWN ON THE FARM!
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
  const isRegistered = useSelector(registeredSelector);

  const waiverLink = '../../assests/retreatWaiver/frosh-retreat-2T4-waiver.pdf';

  const { user } = useSelector(userSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const { axios } = useAxios();
  const isRetreat = user?.isRetreat === true;
  const isWaiverUploaded = user?.waiver?.filename !== undefined;

  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const [outOfTickets, setOutOfTickets] = useState(false);

  const outOfTicketsSetter = async () => {
    setOutOfTickets((await getRemainingTickets(setSnackbar)) <= 0);
  };

  useEffect(() => {
    outOfTicketsSetter();
  }, []);

  useEffect(() => {
    if (isWaiverUploaded) {
      setViewedWaiver(true);
      setIsUploaded(true);
    }
  }, [isWaiverUploaded]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setSnackbar('Please select a PDF file to upload.');
      return;
    }
    const formData = new FormData();
    formData.append('waiver', file);
    formData.append('username', user.firstName);

    try {
      const response = await axios.post('/frosh/upload-waiver', formData, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      setSnackbar('File uploaded successfully!');
      setIsUploaded(true);
    } catch (error) {
      console.error('File upload failed:', error);
      setSnackbar('File upload failed. Please try again.');
      setIsUploaded(false);
    }
  };

  const handleViewWaiver = async () => {
    try {
      const { axios } = useAxios();
      const response = await axios.get(`/frosh/view-waiver/`, {
        responseType: 'blob', //  handling binary data
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (e) {
      console.error(e);
      setSnackbar('Error viewing waiver', true);
    }
  };

  return (
    <div style={{ margin: '0 20px' }}>
      <p style={{ textAlign: 'center' }}>
        In order to register, the following information will be collected from your account. Please
        ensure this information is accurate and up to date. If any information needs to be modified,
        please edit your information{' '}
        <Link to={isRegistered ? '/profile-edit' : '/profile-edit-unregistered'}>here</Link>.
      </p>
      <div className="retreat-registration-form">
        <div className="display-field">
          <h3>FULL NAME:</h3>{' '}
          <p>
            {user?.firstName +
              ' ' +
              user?.lastName +
              (user?.preferredName ? ' (' + user?.preferredName + ')' : '')}
          </p>
        </div>
        <div className="display-field">
          <h3>EMAIL:</h3> <p>{user?.email}</p>
        </div>
        <div className="display-field">
          <h3>PHONE NUMBER:</h3>{' '}
          <p>
            {(!user?.phoneNumberCountryCode ? '' : user?.phoneNumberCountryCode) +
              ' ' +
              user?.phoneNumber}
          </p>
        </div>
        <div className="display-field">
          <h3>DIETARY RESTRICTIONS:</h3>{' '}
          <p>
            {!user?.allergies || user?.allergies.length <= 0 ? 'None' : user?.allergies.join(', ')}
          </p>
          {!user?.allergiesOther ? <p>{user?.allergiesOther}</p> : <></>}
        </div>
        <div className="display-field">
          <h3>MEDICAL INFO:</h3>{' '}
          <p>{!user?.medicalInfo || user?.medicalInfo === '' ? 'None' : user?.medicalInfo}</p>
          <p>
            {!user?.specficMedicalInfo || user?.specficMedicalInfo === ''
              ? 'None'
              : user?.specficMedicalInfo}
          </p>
        </div>
        <div className="display-field">
          <h3>MEDICATION:</h3>{' '}
          <p>{!user?.medication || user?.medication === '' ? 'None' : user?.medication}</p>
        </div>
        <div className="display-field">
          <h3>EMERGENCY CONTACT:</h3>{' '}
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

          <div className="display-field">
            <h3>UPLOAD SIGNED WAIVER:</h3>
            <p>Only PDF files under 1 MB are accepted</p>
            {viewedWaiver ? (
              <>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <Button
                  label="Upload PDF"
                  isSecondary
                  onClick={handleUpload}
                  style={{ marginTop: '10px' }}
                />
              </>
            ) : (
              <p>Please view the waiver before uploading the signed copy.</p>
            )}
          </div>

          {isWaiverUploaded ? (
            <Button
              label="View Uploaded Waiver"
              isSecondary
              onClick={handleViewWaiver}
              style={{ marginBottom: '25px' }}
            />
          ) : (
            <></>
          )}
        </div>

        {isRetreat ? (
          <h2>You have already paid for Frosh Retreat!</h2>
        ) : outOfTickets ? (
          <h2>Sorry there are no more tickets available!</h2>
        ) : viewedWaiver ? (
          <Button
            label={'Continue to Payment'}
            isDisabled={!isUploaded || buttonClicked}
            onClick={() => {
              if (isUploaded) {
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
