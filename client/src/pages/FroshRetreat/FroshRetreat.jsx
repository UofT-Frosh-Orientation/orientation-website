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
import { getSlideshowImages, getTimelineEvents } from '../Home/functions'; // Change slideshow to relevant images
import waiverPDF from '../../assets/retreatWaiver/frosh-retreat-2T5-waiver.pdf';
import useAxios from '../../hooks/useAxios';
import { RetreatSingleAccordion } from '../../components/text/Accordion/SingleAccordion/RetreatSingleAccordion.jsx';
import retreatArrow from '../../assets/misc/backarrow.png';
import TV from '../../assets/retreat/retroTV.svg';
import star from '../../assets/retreat/star.svg';

const RetreatFilmStrip = () => {
  const images = getSlideshowImages();
  const looped = [...images, ...images];
  return (
    <div className="film-strip-container">
      <div className="film-strip-holes" />
      <div className="film-strip-track">
        {looped.map((img, i) => (
          <img key={i} src={img.src} className="film-strip-photo" alt="" />
        ))}
      </div>
      <div className="film-strip-holes" />
    </div>
  );
};

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

  console.log('Retreat tickets remaining: ', remainingTickets);

  return (
    <div className="frosh-retreat-page">
      {/*
        <div className="info-header">
          <h1>REMAINING TICKETS: {remainingTickets}</h1>
        </div>*/}
      <div className="retreat-banner">
        <div className="retreat-banner-checkers" />
        <div className="retreat-banner-checkers retreat-banner-checkers-shadow" />
        <div className="retreat-banner-text">
          <div className="retreat-banner-title">
            <h1 className="retreat-banner-title-frosh">F!rosh</h1>

            <h1 className="retreat-banner-title-retreat">Retreat</h1>
          </div>
          <h2 className="retreat-banner-subtitle">at Hart House Farm Sep 6 - Sep 7</h2>
          <img className="retreat-banner-star" src={star}></img>
          <div className="retreat-banner-star-text">Register below!</div>
        </div>
        <RetreatFilmStrip />
      </div>

      <div className="retreat-info">
        <h3 className="retreat-header">About</h3>
        <p className="retreat-text">
          The retreat is taking place on September 6th and 7th, 2026 at Hart House Farm. Get ready
          for a weekend of fun and relaxation with your new peers!
        </p>

        <h3 className="retreat-header">Ticket Information</h3>
        <p className="retreat-text">
          The available tickets for Retreat are $110.00 and include bus transportation. To purchase
          a ticket and guarantee your spot, you must download, sign and upload the waiver on this
          page and then complete your payment at the bottom of this page.
        </p>
        <br></br>
        <p className="retreat-text">
          Due to limited space, we are selling a limited number of tickets so purchase yours before
          they sell out! There are currently <b>{remainingTickets}</b> tickets left!
        </p>

        <h3 className="retreat-header">FAQ</h3>
        <FroshRetreatFAQ />

        <h3 className="retreat-header">Past Retreats</h3>
        <p className="retreat-registration-subheading">F!rosh Retreat Photos</p>
        {/*Need to add links to prev year photos*/}

        <div className="retreat-albums-div">
          <div className="retreat-album">
            <a href="https://photos.skule.ca/2T4-2T5/Frosh-Week-2T4/Frosh-Retreat">
              <strong>2T4</strong>
            </a>
            <div className="retreat-album-bookmark"></div>
          </div>
          <div className="retreat-album">
            <a href="https://photos.skule.ca/2T3-2T4/Frosh-week/Frosh-Retreat">
              <strong>2T3</strong>
            </a>
            <div className="retreat-album-bookmark"></div>
          </div>
          <div className="retreat-album">
            <a href="https://photos.skule.ca/2T2-2T3/Frosh-Week/Events/Retreat">
              <strong>2T2</strong>
            </a>
            <div className="retreat-album-bookmark"></div>
          </div>
        </div>
        <div className="retreat-video">
          <img className="retreat-video-frame" src={TV}></img>
          <iframe
            className="retreat-video-player"
            src="https://drive.google.com/file/d/1_lpjxS90MrYfqsgOosCd1gRf2xd7phoY/preview"
            title="F!rosh Retreat Info"
            // width="640"
            // height="480"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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
    title: 'What do I need to bring?*',
    sub: '*a more comprehensive list will be sent to attendees at a later date',
    description: [
      '• Sleeping bags, tents, pillows and blankets to sleep in',
      '• Bathing suits, towels, and comfy clothes to enjoy all the activities retreat has to offer',
      '• Water bottle, personal medications, and any extra snacks you want to bring to stay safe and hydrated during the trip',
      '• Anything appropriate for a 36-hour camping trip on a farm!',
    ],
  },
  {
    title: 'What time does the bus leave?',
    description: [
      'The bus leaves from campus at 10:00 AM on September 6th and returns to campus at 2:00 PM on September 7th.',
    ],
  },
  {
    title: 'Does my ticket include transportation?',
    description: [
      'If you previously purchased a ticket for $110.00, it does include transportation by bus to and from Hart House Farms. If you purchased a discounted, non-bus ticket for $100.00, it does not include transportation.',
    ],
  },
  {
    title: 'What will sleeping arrangements be like?',
    description: [
      'There is bunk space inside the cabins, though not enough for everyone, so we encourage you to bring a tent if you have one. You are free to sleep alone in your tent or share with friends. Definitely bring a blanket or sleeping bag regardless, as that will be needed even if you sleep on the bunk beds!',
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
          alignItems: 'start',
          justifyContent: 'start',
          textAlign: 'left',
          color: 'var(--white)',
          width: '100%',
          alignSelf: 'start',
        }}
      >
        {retreatFAQs.map((item, index) => {
          const [isOpen, setIsOpen] = useState(false);
          return (
            <React.Fragment key={item.title}>
              <RetreatSingleAccordion
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                canOpen={true}
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
                      {item.sub !== undefined ? (
                        <p className={'retreat-faq-sub'}>{item.sub}</p>
                      ) : null}
                      {item.description.map((listItem, index) => {
                        return (
                          <li className="retreat-bullet-text" key={listItem}>
                            {listItem}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="retreat-bullet-text">{item.description}</p>
                  </>
                )}
              </RetreatSingleAccordion>
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

  const waiverLink = '../../assests/retreatWaiver/frosh-retreat-2T5-waiver.pdf';

  const { user } = useSelector(userSelector);
  const { setSnackbar } = useContext(SnackbarContext);
  const { axios } = useAxios();
  const isRetreat = user?.isRetreat === true;
  const isWaiverUploaded = user?.waiver?.filename !== undefined;
  const [isFlipped, setIsFlipped] = useState(false);

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
    <div className="retreat-registration">
      <div className="retreat-registration-left-column">
        <h3 className="retreat-registration-subheading">F!rosh Retreat Profile</h3>
        <p className="retreat-text retreat-left-column-text">
          In order to register, the displayed information will be collected from your account.
          Please ensure this information is accurate and up to date. If any information needs to be
          modified, please edit your information{' '}
          <Link to={isRegistered ? '/profile-edit' : '/profile-edit-unregistered'}>here</Link>.
        </p>
        <div className="card-template">
          <div className="card-template__panel">
            <div className="retreat-registration-form">
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Full Name:</h4>{' '}
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {user?.firstName +
                    ' ' +
                    user?.lastName +
                    (user?.preferredName ? ' (' + user?.preferredName + ')' : '')}
                </p>
              </div>
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Email:</h4>{' '}
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {user?.email}
                </p>
              </div>
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Phone Number:</h4>{' '}
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {(!user?.phoneNumberCountryCode ? '' : user?.phoneNumberCountryCode) +
                    ' ' +
                    user?.phoneNumber}
                </p>
              </div>
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Dietary Restrictions:</h4>{' '}
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {!user?.allergies || user?.allergies.length <= 0
                    ? 'None'
                    : user?.allergies.join(', ')}
                </p>
                {!user?.allergiesOther ? (
                  <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                    {user?.allergiesOther}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Medical Info:</h4>{' '}
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {!user?.medicalInfo || user?.medicalInfo === '' ? 'None' : user?.medicalInfo}
                </p>
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {!user?.specficMedicalInfo || user?.specficMedicalInfo === ''
                    ? 'None'
                    : user?.specficMedicalInfo}
                </p>
              </div>
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Medication:</h4>{' '}
                <p className="retreat-registration-form-text" style={{ color: 'black' }}>
                  {!user?.medication || user?.medication === '' ? 'None' : user?.medication}
                </p>
              </div>
              <div className="display-field">
                <h4 className="retreat-registration-form-header">Emergency Contact:</h4>{' '}
                <p
                  className="retreat-registration-form-text"
                  style={{ color: 'black' }}
                >{`${user?.emergencyContactName} - ${user?.emergencyContactRelationship}: ${user?.emergencyContactNumber}`}</p>
              </div>
            </div>
          </div>
          <div className="card-template__footer"></div>
          <div className="card-template__seal"></div>
        </div>
      </div>
      <div className="retreat-registration-right-column">
        <h3 className="retreat-registration-subheading">F!rosh Retreat Waiver</h3>
        <p className="retreat-text">Read and download the F!rosh Retreat Waiver</p>

        <div className="radio-buttons-retreat">
          <Button
            label="Download"
            isSecondary
            onClick={() => {
              window.open(waiverPDF, '_blank').focus();
              setViewedWaiver(true);
            }}
            style={{
              backgroundColor: 'var(--bg-primary)',

              borderImage: 'none',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'var(--text-primary)',

              fontSize: '18px',
              fontWeight: '400',
              color: 'var(--text-primary)',

              padding: '4px 20px 5px 20px',
              borderRadius: '12px',
              marginLeft: '0px',
              boxShadow: 'none',
              WebkitBoxShadow: 'none',
              MozBoxShadow: 'none',
            }}
          />

          <div className="display-field">
            <h5 className="retreat-registration-subheading2">Upload Signed Waiver</h5>

            {viewedWaiver ? (
              <>
                <input
                  className="retreat-choose-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
                <p className="retreat-pdf-disclaimer">Only PDF files under 1 MB are accepted</p>
                <div className="retreat-upload-file-container">
                  <Button
                    label="Upload PDF"
                    isSecondary
                    onClick={handleUpload}
                    style={{
                      backgroundColor: 'var(--bg-primary)',

                      borderImage: 'none',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--text-primary)',

                      fontSize: '18px',
                      fontWeight: '400',
                      color: 'var(--text-primary)',

                      padding: '4px 20px 5px 20px',
                      borderRadius: '12px',
                      marginLeft: '0px',
                      boxShadow: 'none',
                      WebkitBoxShadow: 'none',
                      MozBoxShadow: 'none',
                    }}
                  />

                  {isWaiverUploaded ? (
                    <Button
                      label="View Uploaded Waiver"
                      isSecondary
                      onClick={handleViewWaiver}
                      style={{
                        marginBottom: '25px',
                        padding: '0',
                        color: 'var(--text-secondary)',
                        backgroundColor: 'transparent',
                        display: 'block',
                        marginTop: '15px',
                        marginLeft: '20px',
                        borderImage: 'none',
                        boxShadow: 'none',
                        WebkitBoxShadow: 'none',
                        MozBoxShadow: 'none',
                        fontSize: '18px',
                        borderRadius: '50px',
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <p className="retreat-text">
                Please view the waiver before uploading the signed copy.
              </p>
            )}
          </div>
        </div>

        {isRetreat ? (
          <h2 className="retreat-h2">You have already paid for F!rosh Retreat!</h2>
        ) : outOfTickets ? (
          <h2 className="retreat-h2">Sorry there are no more tickets available!</h2>
        ) : viewedWaiver ? (
          <div className="retreat-payment-container">
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
              style={{
                marginBottom: '25px',
                padding: '0',
                color: 'var(--text-dynamic)',
                backgroundColor: 'transparent',
                display: 'block',
                marginTop: '15px',
                textAlign: 'center',
                fontSize: '30px',
                borderImage: 'none',
                boxShadow: 'none',
                WebkitBoxShadow: 'none',
                MozBoxShadow: 'none',
                borderRadius: '50px',
                marginLeft: '0',
              }}
            />
            <img className="retreat-arrow" src={retreatArrow}></img>
          </div>
        ) : (
          <></>
        )}
        {isRetreat ? (
          <ErrorSuccessBox success content="You have already accepted the agreement!" />
        ) : viewedWaiver ? (
          <></>
        ) : (
          <ErrorSuccessBox
            error
            content="Please view the F!rosh Retreat Waiver before proceeding!"
          />
        )}
      </div>
    </div>
  );
};
