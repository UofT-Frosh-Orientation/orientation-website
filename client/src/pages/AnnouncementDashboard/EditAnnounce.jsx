import './EditAnnounce.scss';
import ChevronUp from '../../assets/misc/chevron-up-solid.svg';
import TrashCan from '../../assets/misc/trash-can-solid.svg';
import EditPen from '../../assets/misc/pen-to-square-solid.svg';
import Save from '../../assets/misc/floppy-disk-solid.svg';
import ArrowRight from '../../assets/steps/arrow-right-solid-purple.svg';
import ArrowLeft from '../../assets/steps/arrow-left-solid-purple.svg';

import { React, useState, useEffect, useContext } from 'react';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnnouncements,
  editAnnouncement,
  deleteAnnouncement,
} from '../../state/announcements/saga';
import { announcementsSelector } from '../../state/announcements/announcementsSlice';

const EditAnnounce = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementList, setAnnouncementList] = useState([]);

  const { announcements } = useSelector(announcementsSelector);
  const { setSnackbar } = useContext(SnackbarContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

  useEffect(() => {
    setAnnouncementList(
      announcements.map((announcement) => {
        return {
          editMode: false,
          deleteConformation: false,
          id: announcement._id,
          name: announcement.name,
          dateCreated: announcement.dateCreated,
          description: announcement.description,
        };
      }),
    );
  }, [announcements]);

  let numResultsDisplayed = 10;
  let pageNumber = Math.ceil(announcementList.length / numResultsDisplayed); // the number of page numbers you will have
  let numCurrentlyDisplayed = 0;
  let nthAccount = numResultsDisplayed * (currentPage - 1); // the nth account that is the first to be displayed on the page

  // make an array that stores page numbers
  let pageNumberList = [];
  for (let i = 1; i <= pageNumber; i++) {
    pageNumberList.push(i); // add each page # to list
  }
  return (
    <div className="all-accounts-container">
      <table className="all-accounts-table">
        <tbody>
          <tr className="all-accounts-table-header-row">
            <th className="all-accounts-table-header">Name</th>
            <th className="all-accounts-table-header-left-align">Description</th>
            <th className="all-accounts-table-header">Operations</th>
          </tr>
          {announcementList.map((announcement, parentIndex) => {
            numCurrentlyDisplayed = numCurrentlyDisplayed + 1;

            // only display a certain number of accounts if the number is between the ranges
            if (
              numCurrentlyDisplayed >= nthAccount + 1 &&
              numCurrentlyDisplayed <= nthAccount + numResultsDisplayed
            ) {
              return (
                <tr className="all-accounts-row" key={announcement.id}>
                  <td className="all-account-data-verified-container" style={{ 'overflow-wrap': 'anywhere' }}>
                    <div>
                      {announcement.editMode ? (
                        <TextInput
                          onChange={(value) => {
                            announcement.name = value;
                          }}
                          initialValue={announcement.name}
                        />
                      ) : (
                        <p>{announcement.name}</p>
                      )}
                    </div>
                  </td>
                  <td className="all-account-data" style={{ 'overflow-wrap': 'anywhere' }}>
                    {announcement.editMode ? (
                      <TextInput
                        onChange={(value) => {
                          announcement.description = value;
                        }}
                        initialValue={announcement.description}
                      />
                    ) : (
                      <p className="all-account-data-email">{announcement.description}</p>
                    )}
                  </td>
                  <td className="all-account-data-checkboxes">
                    <div
                      className="operation-container"
                      style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    >
                      {/* up */}
                      <div
                        onClick={() => {
                          dispatch(
                            editAnnouncement({
                              setSnackbar,
                              announcementData: { id: announcement.id, dateCreated: Date.now() },
                            }),
                          );
                          setAnnouncementList(
                            announcementList
                              .map((announcement, childIndex) => {
                                if (childIndex == parentIndex) {
                                  announcement.dateCreated = new Date();
                                  return announcement;
                                } else {
                                  return announcement;
                                }
                              })
                              .sort((a, b) => {
                                if (new Date(a.dateCreated) > new Date(b.dateCreated)) {
                                  return -1;
                                } else if (new Date(a.dateCreated) < new Date(b.dateCreated)) {
                                  return 1;
                                } else {
                                  return 0;
                                }
                              }),
                          );
                        }}
                        className="operation"
                        style={{ pointerEvents: 'all' }}
                      >
                        <img className="operation-icon" src={ChevronUp} />
                      </div>

                      {/* edit*/}
                      <div
                        onClick={() => {
                          if (announcement.editMode === true) {
                            dispatch(
                              editAnnouncement({
                                setSnackbar,
                                announcementData: announcement,
                              }),
                            );
                          }
                          setAnnouncementList(
                            announcementList.map((announcement, childIndex) => {
                              if (childIndex == parentIndex) {
                                announcement.editMode = !announcement.editMode;

                                return announcement;
                              } else {
                                return announcement;
                              }
                            }),
                          );
                        }}
                        className="operation"
                        style={{ pointerEvents: 'all' }}
                      >
                        <img
                          className="operation-icon"
                          src={announcement.editMode ? Save : EditPen}
                        />
                      </div>
                      {/* delete*/}

                      <div
                        onClick={() => {
                          if (announcement.deleteConformation === true) {
                            dispatch(
                              deleteAnnouncement({
                                setSnackbar,
                                announcementData: announcement,
                              }),
                            );
                            setAnnouncementList(
                              announcementList
                                .map((announcement, childIndex) => {
                                  if (childIndex != parentIndex) {
                                    return announcement;
                                  }
                                })
                                .filter((element) => {
                                  return element !== undefined;
                                }),
                            );
                          } else {
                            setAnnouncementList(
                              announcementList.map((announcement, childIndex) => {
                                if (childIndex == parentIndex) {
                                  announcement.deleteConformation =
                                    !announcement.deleteConformation;

                                  return announcement;
                                } else {
                                  return announcement;
                                }
                              }),
                            );
                          }
                        }}
                        className="operation"
                        style={{ pointerEvents: 'all' }}
                      >
                        <img
                          className="operation-icon"
                          style={
                            announcement.deleteConformation
                              ? { backgroundColor: 'red', borderRadius: '3px' }
                              : {}
                          }
                          src={TrashCan}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>

      {/* page numbers thing */}

      <div className="accounts-page-number-container">
        <div
          className="page-number-arrow-container"
          style={currentPage > 1 ? {} : { pointerEvents: 'none', cursor: 'default' }}
        >
          <img
            className="page-number-arrow"
            src={ArrowLeft}
            alt="left arrow"
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          />
        </div>
        {pageNumberList.map((num) => {
          return (
            <div
              key={num}
              className={`accounts-page-number-box ${
                num === currentPage ? 'accounts-page-number-box-current' : ''
              }`}
              style={
                num === 1
                  ? { borderLeftWidth: '2px' }
                  : num === pageNumber
                  ? { borderRightWidth: '2px' }
                  : {}
              }
              onClick={() => {
                setCurrentPage(num);
              }}
            >
              <p>{num}</p>
            </div>
          );
        })}
        <div
          className="page-number-arrow-container"
          style={currentPage < pageNumber ? {} : { pointerEvents: 'none', cursor: 'default' }}
        >
          <img
            className="page-number-arrow"
            src={ArrowRight}
            alt="right arrow"
            onClick={() => {
              if (currentPage < pageNumber) {
                setCurrentPage(currentPage + 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { EditAnnounce };
