import React from 'react';
import PropTypes from 'prop-types';
import './TaskAnnouncement.scss';
import Check from '../../../../assets/icons/check-solid.svg';

const TaskAnnouncement = ({ tasks, onDone }) => {
  const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <>
      <div className="task-container">
        {tasks.map((task) => {
          let formattedDate = new Date(task.dateCreated).toLocaleDateString(undefined, options);
          return (
            <div key={formattedDate + task.name} className={'task-task-container'}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div className="task-name">{task.name}</div>
                  <div className="task-date">{'Created: ' + formattedDate}</div>
                  {task.description ? (
                    <div className="task-description">{task.description}</div>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  onClick={() => {
                    onDone(task);
                  }}
                  className={'task-check' + (task.completed ? '' : ' task-check-incomplete')}
                >
                  <img src={Check} className={'task-img'} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

TaskAnnouncement.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDone: PropTypes.func,
};

export { TaskAnnouncement };
