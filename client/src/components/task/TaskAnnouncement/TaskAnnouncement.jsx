import React from 'react';
import PropTypes from 'prop-types';
import './TaskAnnouncement.scss';
import Check from '../../../../assets/icons/check-solid-white.svg';

const TaskAnnouncement = ({ tasks, onDone }) => {
  const options = { weekday: undefined, year: 'numeric', month: 'long', day: 'numeric' };
  if (!tasks || tasks.length <= 0) {
    return (
      <div className="task-container">
        <h2 className="nothing-here">There is nothing here yet!</h2>
      </div>
    );
  }
  return (
    <>
      <div className="task-container">
        {tasks.map((task) => {
          let formattedDate = new Date(task.dateCreated).toLocaleDateString(undefined, options);
          return (
            <div key={formattedDate + task.id} className={'task-task-container'}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flexGrow: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div>
                      <div className="task-name">{task.name}</div>
                      <div className="task-date">{'Created: ' + formattedDate}</div>
                    </div>
                    <div className="mobile-only">
                      <div
                        onClick={() => {
                          onDone(task);
                        }}
                        className={
                          'task-check task-check-mobile' +
                          (task.completed ? '' : ' task-check-incomplete')
                        }
                      >
                        <img src={Check} className={'task-img'} />
                      </div>
                    </div>
                  </div>
                  {task.description ? (
                    <div className="task-description" style={{ overflowWrap: 'anywhere' }}>
                      {task.description}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="desktop-only">
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
