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
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion.jsx';
import dragon from '../../assets/mascots/dragon-retreat.svg';
import cardImage from '../../assets/retreatPhotos/cards.jpg';

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
      {/*
        <div className="info-header">
          <h1>REMAINING TICKETS: {remainingTickets}</h1>
        </div>*/}
      <div className="retreat-title">
        <div className="retreat-gradient"></div>
        <img src={cardImage} className='retreat-title-img'></img>
        <div className='retreat-title-container'>
          <h2 className='retreat-subtitle-large retreat-subtitle'>All about</h2>
          <h1 className="retreat-title-text">F!ROSH<br/>RETREAT </h1>
          
          <h2 className='retreat-subtitle'>August 31st - September 1st</h2>
          <h2 className='retreat-subtitle'>at Hart House Farm</h2>
        </div>
      </div>
    
      <div className='retreat-info-container'>
        <h3 className="retreat-header">About</h3>
        <p className="retreat-text">The retreat is taking place on August 31st and September 1st, 2024 at Hart House Farm.</p>

        <h3 className="retreat-header">Ticket Information</h3>
        <p className="retreat-text">Tickets to Retreat are $103.00 (they include bus transportation; no tickets without bus transportation). Due to limited spaces, we are selling a limited number of tickets so purchase yours before they sell out! </p>

        <h3 className="retreat-header">FAQ</h3>
        <FroshRetreatFAQ />

        <h3 className="retreat-header">Past Retreats</h3>
        <p className="retreat-text">2T5 Leedur Retreat Video</p>
        {/*Need to add new video*/}
        <iframe
          className="frosh-retreat-video"
          src="https://drive.google.com/file/d/1_lpjxS90MrYfqsgOosCd1gRf2xd7phoY/view?usp=sharing"
          title="F!rosh Retreat Info"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <p className="retreat-text">F!rosh Retreat Photos</p>
        {/*Need to add links to prev year photos*/}

        <div className="retreat-buttons-div">
          <a className='retreat-photos-button' href='https://photos.skule.ca/2T4-2T5/Frosh-Week-2T4/Frosh-Retreat'><strong>2T4</strong></a>
          <a className='retreat-photos-button' href='https://photos.skule.ca/2T3-2T4/Frosh-week/Frosh-Retreat'><strong>2T3</strong></a>
          <a className='retreat-photos-button' href='https://photos.skule.ca/2T2-2T3/Frosh-Week/Events/Retreat'><strong>2T2</strong></a>
        </div>

        <h3 className="retreat-header">Registration</h3>
        <RetreatRegistration />
      </div>
    </div>
      
  );
};

const retreatFAQs = [
  {
    title: 'What is F!rosh Retreat?',
    description:
      'An overnight camping experience for Frosh at Hart House Farms that allows Frosh to play games and immerse themselves in their new Skule community! F!rosh week has a lot going on, so unwind with this engaging experience including activities, food, and fun!',
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
      'What do I need to bring?*',
    description: [
      '*(a more comprehensive list will be sent to attendees at a later date)',
      '• Sleeping bags, tents, pillows and blankets to sleep in',
      '• Bathing suits, towels, and comfy clothes to enjoy all the activities retreat has to offer',
      '• Water bottle, personal medications, and any extra snacks you want to bring to stay safe and hydrated during the trip',
      '• Anything appropriate for a 36-hour camping trip on a farm!',
    ],
  },
  {
    title: 'What time does the bus leave?',
    description: [
      'The bus leaves from campus at 11:00am on August 31st and returns to campus at 1:00pm on September 1st.',
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
        {retreatFAQs.map((item, index) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <React.Fragment key={item.title}>
              <SingleAccordion
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                header={<div className={'retreat-faq-question'}>{item.title}</div>}
                style={{
                  backgroundColor: 'red',
                  width: '100%',
                  textAlign: 'left',
                  color: 'var(--text-dynamic)',
                }}
              >
                {Array.isArray(item.description) ? (
                  <>
                    <ul className="frosh-retreat-faq-bullet">
                      {item.description.map((listItem, index) => {
                        return <li className="retreat-text" key={listItem}>{listItem}</li>;
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
    <div style={{  }}>
      <p style={{ textAlign: 'left' }}>
        In order to register, the following information will be collected from your account. Please
        ensure this information is accurate and up to date. If any information needs to be modified,
        please edit your information{' '}
        <Link to={isRegistered ? '/profile-edit' : '/profile-edit-unregistered'}>here</Link>.
      </p>
      <div className="retreat-registration-form">
        <div className="display-field">
          <h4 className="retreat-subheading">Full Name:</h4>{' '}
          <p className="retreat-text">
            {user?.firstName +
              ' ' +
              user?.lastName +
              (user?.preferredName ? ' (' + user?.preferredName + ')' : '')}
          </p>
        </div>
        <div className="display-field">
          <h4 className="retreat-subheading">Email:</h4> <p className="retreat-text">{user?.email}</p>
        </div>
        <div className="display-field">
          <h4 className="retreat-subheading">Phone Number:</h4>{' '}
          <p className="retreat-text">
            {(!user?.phoneNumberCountryCode ? '' : user?.phoneNumberCountryCode) +
              ' ' +
              user?.phoneNumber}
          </p>
        </div>
        <div className="display-field">
          <h4 className="retreat-subheading">Dietary Restrictions:</h4>{' '}
          <p className="retreat-text">
            {!user?.allergies || user?.allergies.length <= 0 ? 'None' : user?.allergies.join(', ')}
          </p>
          {!user?.allergiesOther ? <p className="retreat-text">{user?.allergiesOther}</p> : <></>}
        </div>
        <div className="display-field">
          <h4 className="retreat-subheading">Medical Info:</h4>{' '}
          <p className="retreat-text">{!user?.medicalInfo || user?.medicalInfo === '' ? 'None' : user?.medicalInfo}</p>
          <p className="retreat-text">
            {!user?.specficMedicalInfo || user?.specficMedicalInfo === ''
              ? 'None'
              : user?.specficMedicalInfo}
          </p>
        </div>
        <div className="display-field">
          <h4 className="retreat-subheading">Medication:</h4>{' '}
          <p className="retreat-text">{!user?.medication || user?.medication === '' ? 'None' : user?.medication}</p>
        </div>
        <div className="display-field">
          <h4 className="retreat-subheading">Emergency Contact:</h4>{' '}
          <p className="retreat-text">{`${user?.emergencyContactName} - ${user?.emergencyContactRelationship}: ${user?.emergencyContactNumber}`}</p>
        </div>
        
        <h3 className="retreat-header">Frosh Retreat Waiver</h3>
        <p className="retreat-text">Read and download the Frosh Retreat Waiver</p>

        <div className="radio-buttons-retreat">
          <Button
            label="Download"
            isSecondary
            onClick={() => {
              window.open(waiverPDF, '_blank').focus();
              setViewedWaiver(true);
            }}
            style={{ marginBottom: '25px', padding: '15px 25px 15px 25px', backgroundColor: '#d9d9d9', borderImage: 'none', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none',fontSize: '18px', borderRadius: '50px', marginLeft: '0' }}
          />

          <div className="display-field">
            <h5 className="retreat-subheading2">Upload Signed Waiver</h5>
            
            {viewedWaiver ? (
              <>
                <input className='retreat-choose-file' type="file" accept=".pdf" onChange={handleFileChange} />
                <p className="retreat-pdf-disclaimer">Only PDF files under 1 MB are accepted</p>
                <div className='retreat-upload-file-container'>
                  <Button
                    label="Upload PDF"
                    isSecondary
                    onClick={handleUpload}
                    style={{ marginTop: '10px', backgroundColor:'var(--mikado)', padding:'20px 30px 20px 30px', fontSize:'20px', display:'block', borderImage: 'none', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', borderRadius: '50px', marginLeft: '0' }}
                  />

                  {isWaiverUploaded ? (
                    <Button
                      label="View Uploaded Waiver"
                      isSecondary
                      onClick={handleViewWaiver}
                      style={{ marginBottom: '25px', padding:'0', color:'var(--text-secondary)', backgroundColor:'transparent', display:'block', marginTop:'15px', marginLeft:'20px', borderImage: 'none', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none',fontSize: '18px', borderRadius: '50px'}}
                    />
                  ) : (
                    <></>
                  )}
                </div>

              </>
            ) : (
              <p className="retreat-text">Please view the waiver before uploading the signed copy.</p>
            )}
          
            
          </div>
        </div>

        {isRetreat ? (
          <h2 className='retreat-h2'>You have already paid for F!rosh Retreat!</h2>
        ) : outOfTickets ? (
          <h2 className='retreat-h2'>Sorry there are no more tickets available!</h2>
        ) : viewedWaiver ? (
          <div className='retreat-payment-container'>
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
                  setSnackbar('Please accept the F!rosh Waiver before proceeding!', true);
                }
              }}
              style={{ marginBottom: '25px', padding:'0', color:'var(--text-dynamic)', backgroundColor:'transparent', display:'block', marginTop:'15px', textAlign:'center', fontSize:'30px',  borderImage: 'none', boxShadow: 'none', webkitBoxShadow: 'none', mozBoxShadow: 'none', borderRadius: '50px', marginLeft: '0'}}
            />
            <img className='retreat-arrow' src='../../src/assets/misc/backarrow.png'></img>
          </div>
        ) : (
          <></>
        )}

      </div>
      {isRetreat ? (
        <ErrorSuccessBox success content="You have already accepted the agreement!" />
      ) : viewedWaiver ? (
        <></>
      ) : (
        <ErrorSuccessBox error content="Please view the F!rosh Retreat Waiver before proceeding!" />
      )}
    </div>
  );
};
