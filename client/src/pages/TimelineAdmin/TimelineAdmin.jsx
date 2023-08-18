import { React, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { deleteTimelineEvent, editTimelineEvent, createTimelineEvent } from './functions';
import { Button } from '../../components/button/Button/Button';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { SnackbarContext } from '../../util/SnackbarProvider';
import LoadingAnimation from '../../components/misc/LoadingAnimation/LoadingAnimation';
import './TimelineAdmin.scss';
import useAxios from '../../hooks/useAxios';
const { axios } = useAxios();

const PageTimelineAdmin = () => {
  const [editMade, setEditMade] = useState(false);
  return (
    <div className={'timeline-admin-page'}>
      <div className={'timeline-admin-create-event-container'}>
        <h1 className={'timeline-admin-titles'}>Create a new timeline event!</h1>
        <CreateNewTimelineEvent editMade={editMade} setEditMade={setEditMade} />
      </div>
      <div className={'timeline-admin-existing-events-container'}>
        <h1 className={'timeline-admin-titles'}>Existing events</h1>
        <ExistingTimelineEvents editMade={editMade} setEditMade={setEditMade} />
      </div>
    </div>
  );
};

const CreateNewTimelineEvent = ({ editMade, setEditMade }) => {
  const [eventNameText, setEventNameText] = useState('');
  const [date, setDate] = useState(new Date());
  const [descriptionText, setDescriptionText] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkLabelText, setLinkLabelText] = useState('');
  const [formState, setFormState] = useState('form');
  const [clearText, setClearText] = useState(false);
  const { setSnackbar } = useContext(SnackbarContext);
  const initialFormData = {
    eventName: '',
    date: new Date(),
    description: '',
    link: '',
    linkLabel: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  const handleEditEventName = (text) => {
    setEventNameText(text);
  };
  const handleEditDate = (date) => {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let newDate = new Date(year, month - 1, day);
    setDate(newDate);
  };
  const handleEditDescription = (text) => {
    setDescriptionText(text);
  };
  const handleEditLink = (text) => {
    setLinkText(text);
  };
  const handleEditLinkLabel = (text) => {
    setLinkLabelText(text);
  };
  const handleSubmit = async () => {
    if (formData.eventName.length > 0 && formData.description.length > 0) {
      setFormState('loading');
      const result = await createTimelineEvent(formData);
      if (result !== true) {
        setFormState('form');
        setSnackbar('Error', true);
      } else {
        updateFormData(initialFormData);
        setClearText(true);
        setFormState('form');
        setEditMade(!editMade);
        setEventNameText('');
        setDate(new Date());
        setDescriptionText('');
        setLinkText('');
        setLinkLabelText('');
        setSnackbar('New Timeline Event Submitted Successfully', false);
      }
    } else if (formData.eventName.length === 0) {
      setSnackbar('Event Name cannot be empty', true);
    } else if (formData.description.length === 0) {
      setSnackbar('Description cannot be empty', true);
    }
  };
  useEffect(() => {
    if (linkText !== '' && linkLabelText === '') {
      updateFormData({
        eventName: eventNameText,
        date: date,
        description: descriptionText,
        link: linkText,
        linkLabel: 'Click here!',
      });
    } else {
      updateFormData({
        eventName: eventNameText,
        date: date,
        description: descriptionText,
        link: linkText,
        linkLabel: linkLabelText,
      });
    }
  }, [eventNameText, date, descriptionText, linkText, linkLabelText]);
  return (
    <form>
      <label>
        <div>
          <h1 className={'timeline-admin-subtitles'}>Event Name</h1>
          <TextInput
            onChange={(text) => handleEditEventName(text)}
            inputType={'text'}
            placeholder={'Event Name'}
            initialValue={''}
            style={{ height: '45px' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div>
          <h1 className={'timeline-admin-subtitles'}>Date</h1>
          <TextInput
            onChange={(date) => handleEditDate(date)}
            inputType={'date'}
            placeholder={'1852-12-25'}
            initialValue={'2022-09-01'}
            hasRestrictedInput={true}
            style={{ height: '45px' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div>
          <h1 className={'timeline-admin-subtitles'}>Description</h1>
          <TextInput
            onChange={(text) => handleEditDescription(text)}
            inputType={'textArea'}
            placeholder={'This event is fun!'}
            initialValue={''}
            style={{ height: '150px', resize: 'vertical' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div>
          <h1 className={'timeline-admin-subtitles'}>Link</h1>
          <TextInput
            onChange={(text) => handleEditLink(text)}
            inputType={'text'}
            placeholder={'https://www.google.ca'}
            initialValue={''}
            style={{ height: '45px' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <label>
        <div>
          <h1 className={'timeline-admin-subtitles'}>Label for the link</h1>
          <TextInput
            onChange={(text) => handleEditLinkLabel(text)}
            inputType={'text'}
            placeholder={'Google'}
            initialValue={''}
            style={{ height: '45px' }}
            clearText={clearText}
            setClearText={setClearText}
          />
        </div>
      </label>
      <div
        style={{ textAlign: 'center' }}
        className={formState === 'form' ? '' : 'timeline-admin-hide'}
      >
        <Button label={'Submit'} onClick={() => handleSubmit()} />
      </div>
      <div className={formState === 'loading' ? '' : 'timeline-admin-hide'}>
        <LoadingAnimation size={'60px'} />
      </div>
    </form>
  );
};

const ExistingTimelineEvents = ({ editMade, setEditMade }) => {
  const [existingEvents, setExistingEvents] = useState([]);
  const getTimelineEvents = async () => {
    try {
      const response = await axios.get('/timeline');
      const existingEvents = await response.data.timelines;

      setExistingEvents(existingEvents);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTimelineEvents();
  }, [editMade]);
  return (
    <>
      {existingEvents === undefined || existingEvents?.length === 0 ? (
        <div className={'timeline-admin-no-result'}>No timeline events found.</div>
      ) : (
        existingEvents.map((event) => (
          <div key={event._id}>
            <TimelineEventWrapper event={event} editMade={editMade} setEditMade={setEditMade} />
          </div>
        ))
      )}
    </>
  );
};

const TimelineEventWrapper = ({ event, editMade, setEditMade }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editButtonText, setEditButtonText] = useState('Edit');
  const [eventNameText, setEventNameText] = useState('');
  const [date, setDate] = useState(new Date());
  const [descriptionText, setDescriptionText] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkLabelText, setLinkLabelText] = useState('');
  const [oldEventNameText, setOldEventNameText] = useState(event.eventName);
  const eventDateFormatted = new Date(event.date).toISOString().split('T')[0];
  const [oldDateText, setOldDateText] = useState(eventDateFormatted);
  const [oldDescriptionText, setOldDescriptionText] = useState(event.description);
  const [oldLinkText, setOldLinkText] = useState(event.link);
  const [oldLinkLabelText, setOldLinkLabelText] = useState(event.linkLabel);
  const [cancelEdit, setCancelEdit] = useState(false);
  const [createdDate, setCreatedDate] = useState(event.createdAt);
  const [updatedDate, setUpdatedDate] = useState(event.updatedAt);
  const { setSnackbar } = useContext(SnackbarContext);
  const initialFormData = {
    eventName: '',
    date: new Date(),
    description: '',
    link: '',
    linkLabel: '',
  };
  const [formData, updateFormData] = useState(initialFormData);
  const handleEditEventName = (text) => {
    setEventNameText(text);
  };
  const handleEditDate = (date) => {
    let year = date.substring(0, 4);
    let month = date.substring(5, 7);
    let day = date.substring(8, 10);
    let newDate = new Date(year, month - 1, day);
    setDate(newDate);
  };
  const handleEditDescription = (text) => {
    setDescriptionText(text);
  };
  const handleEditLink = (text) => {
    setLinkText(text);
  };
  const handleEditLinkLabel = (text) => {
    setLinkLabelText(text);
  };
  const handleSubmit = async (id) => {
    if (
      formData.eventName.length > 0 &&
      // formData.date.length > 0 &&
      formData.description.length > 0
    ) {
      const result = await editTimelineEvent(id, formData);
      if (result !== true) {
        setSnackbar('Error', true);
      } else {
        setIsEdit(false);
        setEditButtonText('Edit');
        setEditMade(!editMade);
        setSnackbar('Timeline Event Edited Successfully', false);
      }
    } else if (formData.eventName.length === 0) {
      setSnackbar('Event Name cannot be empty', true);
      // } else if (formData.date.length === 0) {
      //   setSnackbar('Date cannot be empty', true);
    } else if (formData.description.length === 0) {
      setSnackbar('Description cannot be empty', true);
    }
  };
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Toronto',
  };
  const createdDateFormatted = new Date(createdDate).toLocaleDateString('en-CA', options);
  const updatedDateFormatted = new Date(updatedDate).toLocaleDateString('en-CA', options);
  useEffect(() => {
    updateFormData({
      eventName: eventNameText,
      date: date,
      description: descriptionText,
      link: linkText,
      linkLabel: linkLabelText,
    });
  }, [eventNameText, date, descriptionText, linkText, linkLabelText]);
  useEffect(() => {
    setCreatedDate(event.createdAt);
    setUpdatedDate(event.updatedAt);
  }, [editMade]);
  return (
    <div className={'timeline-admin-event-container'}>
      <div className={`${isEdit ? 'timeline-admin-hide' : ''}`}>
        <h1 className={'timeline-admin-event-titles'}>{eventNameText}</h1>
        <p className={'timeline-admin-text'}>
          <b>Date:</b> {date.toISOString().split('T')[0]}
        </p>
        <p className={'timeline-admin-text'}>
          <b>Description:</b> {descriptionText}
        </p>
        <p className={'timeline-admin-text'}>
          <b>Link:</b> {linkText}
        </p>
        <p className={'timeline-admin-text'}>
          <b>Link Label:</b> {linkLabelText}
        </p>
        <p className={'timeline-admin-text'}>
          <b>Created at:</b> {createdDateFormatted}
        </p>
        <p className={'timeline-admin-text'}>
          <b>Last updated at:</b> {updatedDateFormatted}
        </p>{' '}
      </div>
      <div className={`${!isEdit ? 'timeline-admin-hide' : ''}`}>
        <form>
          <div className={'timeline-admin-edit-title-container'}>
            <div className={'timeline-admin-edit-title'}>Editing event:</div>
          </div>
          <label>
            <div className={''}>
              <h1 className={'timeline-admin-subtitles'}>Event Name</h1>
              <TextInput
                onChange={(text) => handleEditEventName(text)}
                inputType={'text'}
                placeholder={'Event Name'}
                initialValue={oldEventNameText}
                style={{ height: '45px' }}
                cancelEdit={cancelEdit}
                oldValue={oldEventNameText}
              />
            </div>
          </label>
          <label>
            <div className={''}>
              <h1 className={'timeline-admin-subtitles'}>Date</h1>
              <TextInput
                onChange={(date) => handleEditDate(date)}
                inputType={'date'}
                hasRestrictedInput={true}
                placeholder={'1852-12-25'}
                initialValue={oldDateText}
                style={{ height: '45px' }}
                cancelEdit={cancelEdit}
                oldValue={oldDateText}
              />
            </div>
          </label>
          <label>
            <div className={''}>
              <h1 className={'timeline-admin-subtitles'}>Description</h1>
              <TextInput
                onChange={(text) => handleEditDescription(text)}
                inputType={'textArea'}
                placeholder={'This event is fun!'}
                initialValue={oldDescriptionText}
                style={{ height: '150px', resize: 'vertical' }}
                cancelEdit={cancelEdit}
                oldValue={oldDescriptionText}
              />
            </div>
          </label>
          <label>
            <div className={''}>
              <h1 className={'timeline-admin-subtitles'}>Link</h1>
              <TextInput
                onChange={(text) => handleEditLink(text)}
                inputType={'text'}
                placeholder={'https://www.google.ca'}
                initialValue={oldLinkText}
                style={{ height: '45px' }}
                cancelEdit={cancelEdit}
                oldValue={oldLinkText}
              />
            </div>
          </label>
          <label>
            <div className={''}>
              <h1 className={'timeline-admin-subtitles'}>Link Label</h1>
              <TextInput
                onChange={(text) => handleEditLinkLabel(text)}
                inputType={'text'}
                placeholder={'Google'}
                initialValue={oldLinkLabelText}
                style={{ height: '45px' }}
                cancelEdit={cancelEdit}
                oldValue={oldLinkLabelText}
              />
            </div>
          </label>
        </form>
      </div>
      <span>
        <Button
          label={editButtonText}
          onClick={() => {
            setIsEdit(!isEdit);
            setEditButtonText(`${isEdit ? 'Edit' : 'Stop Edit'}`);
            if (!isEdit) {
              setOldEventNameText(eventNameText);
              setOldDateText(date);
              setOldDescriptionText(descriptionText);
              setOldLinkText(linkText);
              setOldLinkLabelText(linkLabelText);
            } else {
              setEventNameText(oldEventNameText);
              setDate(oldDateText);
              setDescriptionText(oldDescriptionText);
              setLinkText(oldLinkText);
              setLinkLabelText(oldLinkLabelText);
              setCancelEdit(!cancelEdit);
            }
          }}
        />
      </span>
      <span className={isEdit ? 'timeline-admin-hide' : ''}>
        <Button
          label={'Delete'}
          onClick={async () => {
            const result = await deleteTimelineEvent(event._id);
            if (result !== true) {
              setSnackbar('Error', true);
            } else {
              setEditMade(!editMade);
              setSnackbar('Event Deleted Successfully', false);
            }
          }}
        />
      </span>
      <span className={!isEdit ? 'timeline-admin-hide' : ''}>
        <Button
          label={'Save'}
          onClick={() => {
            handleSubmit(event._id);
          }}
        />
      </span>
    </div>
  );
};

CreateNewTimelineEvent.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

ExistingTimelineEvents.propTypes = {
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

TimelineEventWrapper.propTypes = {
  event: PropTypes.object.isRequired,
  editMade: PropTypes.bool.isRequired,
  setEditMade: PropTypes.func.isRequired,
};

export { PageTimelineAdmin };
