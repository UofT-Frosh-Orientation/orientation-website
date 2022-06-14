import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  capitalizeFirstLetter,
  getDaysFroshSchedule,
  getFroshScheduleData,
  getQRCodeString,
  getTasks,
  onDoneTask,
  parseQRCode,
  searchForFrosh,
  signInFrosh,
} from './functions';
import './Profile.scss';
import WaveReverseFlip from '../../assets/misc/wave-reverse-flip.png';
import { TaskAnnouncement } from '../../components/task/TaskAnnouncement/TaskAnnouncement';
import { QRNormal } from 'react-qrbtf';
import { ButtonBubble } from '../../components/button/ButtonBubble/ButtonBubble';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import SingleAccordionStories from '../../components/text/Accordion/SingleAccordion/SingleAccordion.stories';
import { SingleAccordion } from '../../components/text/Accordion/SingleAccordion/SingleAccordion';
import { ButtonSelector } from '../../components/buttonSelector/buttonSelector/ButtonSelector';
import QrScanner from 'qr-scanner';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { ButtonOutlined } from '../../components/button/ButtonOutlined/ButtonOutlined';

const PageProfileFrosh = () => {
  return (
    <>
      <div className="navbar-space-top" />
      <ProfilePageHeader />
      <div className="profile-info-row">
        <div>
          <ProfilePageAnnouncements />
          <ProfilePageSchedule />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfilePageQRCode />
          <ProfilePageResources />
        </div>
      </div>
    </>
  );
};

const PageProfile = () => {
  return (
    <>
      <div className="navbar-space-top" />
      <ProfilePageHeader />
      <div className="profile-info-row">
        <div style={{ marginTop: '-40px' }}>
          <ProfilePageSchedule />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ProfilePageQRScanner />
          <div style={{ height: '10px' }} />
          <ProfilePageQRCode />
        </div>
      </div>
    </>
  );
};

const ProfilePageQRScanner = () => {
  const [isScanned, setIsScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const videoRef = useRef();

  let qrScanner = null;
  useEffect(() => {
    if (isScanning) {
      const videoElement = videoRef.current;
      qrScanner = new QrScanner(
        videoElement,
        (qrCode) => {
          if (qrCode) {
            setIsScanned(!isScanned);
            setScannedData(parseQRCode(qrCode.data));
          }
        },
        {
          onDecodeError: (error) => {},
          highlightScanRegion: true,
          highlightCodeOutline: true,
        },
      );
      qrScanner.setInversionMode('both');
      qrScanner.start();
    }
  }, [isScanning]);

  const [searchFor, setSearchFor] = useState('');
  const [results, setResults] = useState([]);

  const search = () => {
    setResults(searchForFrosh(searchFor));
  };

  return (
    <div className="profile-page-qr-code">
      <ButtonOutlined
        label={isScanning ? 'Stop Scanning' : 'Start Scanning'}
        onClick={() => {
          if (isScanning) {
            qrScanner?.stop();
            qrScanner?.destroy();
            qrScanner = null;
            document.getElementsByClassName('scan-region-highlight-svg')[0].style.display = 'none';
            document.getElementsByClassName('scan-region-highlight')[0].style.display = 'none';
            setIsScanning(false);
          } else {
            setIsScanning(true);
          }
        }}
      />
      <video ref={videoRef} style={{ width: '100%', borderRadius: '10px' }}></video>

      <div
        className={`profile-page-scanned-data ${
          submitSuccess ? 'profile-page-scanned-data-success' : ''
        } ${submitError !== false ? 'profile-page-scanned-data-error' : ''}`}
      >
        {scannedData === '' ? (
          'Nothing scanned yet!'
        ) : (
          <>
            {Object.keys(scannedData).map((key) => {
              return (
                <div key={key}>
                  <b>{capitalizeFirstLetter(key) + ': '}</b>
                  {scannedData[key]}
                </div>
              );
            })}
          </>
        )}
      </div>
      <Button
        label={'Submit'}
        onClick={() => {
          const result = signInFrosh(scannedData.email);
          if (result === true) {
            setScannedData(parseQRCode(''));
            setSubmitSuccess(true);
            setTimeout(() => {
              setSubmitSuccess(false);
            }, 450);
            if (submitError !== false) {
              setSubmitError(false);
            }
            if (results != []) {
              setResults([]);
            }
          } else {
            setSubmitError(result);
          }
        }}
      />
      <p>
        <i>{submitError !== false ? 'Error: ' + submitError : ''}</i>
      </p>
      <h2 className="profile-page-manual-entry-header">Manual Entry</h2>
      <div style={{ padding: '0px 10px', width: '100%' }}>
        <TextInput
          placeholder={'Frosh Name / Email'}
          onChange={(value) => {
            setSearchFor(value);
          }}
          onEnterKey={() => {
            search();
          }}
        />
      </div>
      <div className="manual-sign-in-frosh-search-result-container">
        {results.map((frosh, index) => {
          return (
            <ButtonOutlined
              onClick={() => {
                setScannedData(frosh);
              }}
              key={frosh.email + index}
              label={
                <div>
                  <h3>{frosh.name}</h3>
                  <p>{frosh.email}</p>
                </div>
              }
              className="manual-sign-in-frosh-search-result"
            />
          );
        })}
      </div>
    </div>
  );
};

const ProfilePageHeader = () => {
  return (
    <>
      <div className="profile-page-header">
        <div className="profile-page-header-group">
          <h1>λ</h1>
          <p>Lambda</p>
        </div>
        <div className="profile-page-header-info-wrap">
          <div className="profile-page-header-info">
            <p className="profile-page-name-title">
              <b>James</b> Kokoska
            </p>
            <p>Incoming Computer Engineering student</p>
            <p>
              <u>
                <b>test.email</b>@mail.utoronto.com
              </u>
            </p>
          </div>
          <div className="profile-page-header-class desktop-only">
            <p>Class of</p>
            <h2>2T6</h2>
          </div>
        </div>
      </div>
      <img src={WaveReverseFlip} className="wave-image home-page-bottom-wave-image" />
    </>
  );
};

const ProfilePageAnnouncements = () => {
  return (
    <div className="profile-page-announcements">
      <h2 className="profile-page-section-header">Tasks and Announcements</h2>
      <TaskAnnouncement tasks={getTasks()} onDone={onDoneTask} />
    </div>
  );
};

const ProfilePageQRCode = () => {
  return (
    <div className="profile-page-qr-code">
      <QRNormal
        value={getQRCodeString()}
        styles={{ svg: { width: '120%', margin: '-10%' } }}
        type="round"
        opacity={100}
        posType="round"
        otherColor="#320846"
        posColor="#28093A"
        backgroundColor="white"
      />
      <p>Your Sign-in QR Code</p>
    </div>
  );
};
const ProfilePageResources = () => {
  return (
    <div className="profile-page-resources">
      <h2>Resources</h2>
      <ButtonBubble
        label="Campus Food Guide"
        isSecondary
        style={{ margin: 0, marginTop: '10px' }}
      />
      <ButtonBubble
        label="Mental Health and Wellness Resources"
        isSecondary
        style={{ margin: 0, marginTop: '10px' }}
      />
    </div>
  );
};

const ProfilePageSchedule = () => {
  let days = getDaysFroshSchedule();
  let buttonList = days.map((item) => {
    return { name: item };
  });
  let scheduleData = getFroshScheduleData();
  const today = new Date();
  const options = { weekday: 'long' };
  const todayString = today.toLocaleDateString('en-US', options).replace(',', '');
  let count = 0;
  for (let day of days) {
    if (day === todayString) {
      break;
    }
    count++;
  }
  if (count >= scheduleData.length) {
    count = 0;
  }
  const [selectedDayIndex, setSelectedDayIndex] = useState(count);
  const [closeAll, setCloseAll] = useState(0);
  return (
    <div className="profile-page-schedule">
      <h2 className="profile-page-section-header profile-page-section-header-schedule">Schedule</h2>
      <ButtonSelector
        buttonList={buttonList}
        activeIndex={selectedDayIndex}
        setActiveIndex={(index) => {
          setSelectedDayIndex(index);
          setCloseAll(!closeAll);
        }}
        style={{ maxWidth: '250px', marginTop: '0px', marginBottom: '10px', padding: '11px 15px' }}
      />
      <div className="profile-page-schedule-accordions">
        {scheduleData[selectedDayIndex].events.map((scheduleDateObj, index) => {
          return (
            <ProfilePageAccordionWrapper
              key={scheduleDateObj.time + index}
              closeAll={closeAll}
              scheduleDateObj={scheduleDateObj}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

const ProfilePageAccordionWrapper = ({ scheduleDateObj, index, closeAll }) => {
  let currentTime = new Date();
  let hour = currentTime.getHours();
  const meridian = hour > 12 ? 'PM' : 'AM';
  hour = hour > 12 ? hour - 12 : hour;

  let scheduleTime = scheduleDateObj.time;
  const hourScheduleTime = scheduleTime.split(':')[0];
  const meridianScheduleTime = scheduleTime.split(' ')[1];

  const [isOpen, setIsOpen] = useState(
    hour === hourScheduleTime && meridian === meridianScheduleTime,
  );

  useEffect(() => {
    setIsOpen(hour === hourScheduleTime && meridian === meridianScheduleTime);
  }, [closeAll]);
  let accordionHeader = (
    <div className="profile-page-accordion-header">
      <h3>{scheduleDateObj.name}</h3>
      <h4>{scheduleDateObj.time}</h4>
    </div>
  );
  let accordionContent = (
    <div className="profile-page-accordion-content">
      <p>{scheduleDateObj.description}</p>
    </div>
  );
  return (
    <div className="profile-page-accordion-container">
      <SingleAccordion isOpen={isOpen} setIsOpen={setIsOpen} header={accordionHeader}>
        {accordionContent}
      </SingleAccordion>
    </div>
  );
};

ProfilePageAccordionWrapper.propTypes = {
  scheduleDateObj: PropTypes.object,
  index: PropTypes.number,
  closeAll: PropTypes.bool,
};

export { PageProfile };
