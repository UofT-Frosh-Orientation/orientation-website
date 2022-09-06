import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './ScuntTransactions.scss';
import useAxios from '../../hooks/useAxios';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { getScuntTeamObjFromTeamName } from '../ScuntJudgeForm/ScuntJudgeForm';
import { Button } from '../../components/button/Button/Button';
const { axios } = useAxios();
import DeleteIcon from '../../assets/misc/circle-xmark-solid.svg';
import { DarkModeContext } from '../../util/DarkModeProvider';
import { SnackbarContext } from '../../util/SnackbarProvider';

export const ScuntTransactions = () => {
  const [assignedTeam, setAssignedTeam] = useState('');
  const [teams, setTeams] = useState(['All Teams']);
  const [teamObjs, setTeamObjs] = useState();
  const [refresh, setRefresh] = useState(true);

  const getScuntTeams = async () => {
    try {
      const response = await axios.get('/scunt-teams');
      const { teamPoints } = response.data;
      if (teamPoints.length > 0 && teamPoints) {
        setTeamObjs(teamPoints);
        setTeams([
          'All Teams',
          ...teamPoints.map((team) => {
            return team?.name;
          }),
        ]);
      }
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    if (refresh) {
      getScuntTeams();
      setTimeout(() => {
        setRefresh(false);
      }, 5000);
    }
  }, [refresh]);

  return (
    <>
      <div className="navbar-space-top"></div>
      <div className="scunt-point-transactions-page">
        <div className="scunt-point-transactions-container">
          <h1>Point Transactions</h1>
          <div className="separator" />
          <p>Transactions of all points that have been distributed to teams</p>
          <p>When displaying all teams, only the latest 50 transactions are shown</p>
          <div className="separator" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h2>Team:</h2>
              <div style={{ width: '10px' }}></div>
              <Dropdown
                initialSelectedIndex={0}
                values={teams}
                onSelect={(value) => {
                  setAssignedTeam(value);
                }}
                isDisabled={false}
                localStorageKey={'scunt-team-choice'}
              />
            </div>
            <div>
              <Button
                label={'Refresh'}
                onClick={() => {
                  setRefresh(true);
                }}
                isDisabled={refresh}
              />
            </div>
          </div>
          <div className="transactions-list">
            <>
              <ScuntTeamTransactions
                teamObj={getScuntTeamObjFromTeamName(assignedTeam, teamObjs)}
                refresh={refresh}
                showMostRecentOnly={assignedTeam === 'All Teams'}
              />
            </>
          </div>
        </div>
      </div>
    </>
  );
};

const ScuntTeamTransactions = ({ teamObj, showMostRecentOnly, refresh }) => {
  const { darkMode, setDarkModeStatus } = useContext(DarkModeContext);
  const { setSnackbar } = useContext(SnackbarContext);
  const [allTeamPointTransactions, setAllTeamPointTransactions] = useState();
  const [pointTransactions, setPointTransactions] = useState();
  const [teamDetails, setTeamDetails] = useState();
  const [deletedTransactionIDs, setDeletedTransactionIDs] = useState([]);

  useEffect(() => {
    getTeamTransactions(teamObj);
  }, [teamObj]);

  useEffect(() => {
    setDeletedTransactionIDs([]);
  }, [refresh]);

  const getTeamTransactions = async (teamObjPassed) => {
    try {
      if (!teamObjPassed && !showMostRecentOnly) {
        // showMostRecentOnly doesn't require a team
        throw 'Team not defined';
      }
      const response = await axios.post('/scunt-teams/transactions', {
        teamNumber: teamObjPassed?.number,
        showMostRecent: showMostRecentOnly,
      });
      if (!showMostRecentOnly) {
        const transactions = response?.data?.transactions?.transactions;
        setPointTransactions(transactions);
        setTeamDetails(response?.data?.transactions);
      } else {
        const transactions = response?.data?.transactions;
        setAllTeamPointTransactions(transactions);
      }
    } catch (e) {
      return 0;
    }
  };

  const deleteTransaction = async (pointTransaction, teamNumber) => {
    try {
      const response = await axios.post('/scunt-teams/transaction/delete', {
        teamNumber: teamNumber ? teamNumber : teamObj?.number,
        id: pointTransaction?._id,
      });
      setDeletedTransactionIDs([...deletedTransactionIDs, pointTransaction?._id]);
    } catch (e) {
      setSnackbar(
        'Could not remove transaction. Ensure you have the proper permissions and try again later.',
        true,
      );
    }
  };

  if (
    (!pointTransactions && !showMostRecentOnly) ||
    (showMostRecentOnly && !allTeamPointTransactions)
  ) {
    return <></>;
  }

  if (showMostRecentOnly) {
    return (
      <>
        {allTeamPointTransactions.map((pointTransaction, index) => {
          if (deletedTransactionIDs?.includes(pointTransaction?.transactions?._id)) return <></>;
          return (
            <div
              style={{ display: 'flex', alignItems: 'flex-start' }}
              key={pointTransaction?.transactions?._id}
            >
              <img
                onClick={() => {
                  deleteTransaction(pointTransaction?.transactions, pointTransaction?.number);
                }}
                src={DeleteIcon}
                style={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                  filter: darkMode ? 'invert(1)' : 'invert(0.5)',
                  cursor: 'pointer',
                }}
              />
              <div>
                <p>
                  <b>{(index + 1).toString()}.</b> {pointTransaction?.name}:{' '}
                  {pointTransaction?.transactions?.points} points
                </p>
                <p style={{ marginLeft: '25px' }}>{pointTransaction?.transactions?.name}</p>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  if (!showMostRecentOnly) {
    return (
      <>
        <h2>
          {teamDetails?.name}: {teamDetails?.points} points
        </h2>
        <div style={{ height: '10px' }}></div>
        {pointTransactions.map((pointTransaction, index) => {
          if (deletedTransactionIDs?.includes(pointTransaction?._id)) return <></>;
          return (
            <div style={{ display: 'flex', alignItems: 'flex-start' }} key={pointTransaction?._id}>
              <img
                onClick={() => {
                  deleteTransaction(pointTransaction);
                }}
                src={DeleteIcon}
                style={{
                  width: '25px',
                  height: '25px',
                  marginRight: '10px',
                  filter: darkMode ? 'invert(1)' : 'invert(0.5)',
                  cursor: 'pointer',
                }}
              />
              <div>
                <p>
                  <b>{(index + 1).toString()}.</b> {pointTransaction?.name}:{' '}
                  {pointTransaction?.points} points
                </p>
              </div>
            </div>
          );
        })}
      </>
    );
  }
};

ScuntTeamTransactions.propTypes = {
  teamObj: PropTypes.object,
  showMostRecentOnly: PropTypes.bool,
  refresh: PropTypes.bool,
};
