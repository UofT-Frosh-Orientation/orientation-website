import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScuntTransactions.scss';
import useAxios from '../../hooks/useAxios';
import { Dropdown } from '../../components/form/Dropdown/Dropdown';
import { getScuntTeamObjFromTeamName } from '../ScuntJudgeForm/ScuntJudgeForm';
import { Button } from '../../components/button/Button/Button';
const { axios } = useAxios();

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
      console.log(e.toString());
    }
  };

  useEffect(() => {
    if (refresh) {
      getScuntTeams();
      setRefresh(false);
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
              />
            </div>
          </div>
          <div className="transactions-list">
            {assignedTeam === 'All Teams' ? (
              teams.map((team) => {
                return (
                  <>
                    <ScuntTeamTransactions
                      key={{ team }}
                      teamObj={getScuntTeamObjFromTeamName(team, teamObjs)}
                    />
                  </>
                );
              })
            ) : (
              <>
                <ScuntTeamTransactions
                  teamObj={getScuntTeamObjFromTeamName(assignedTeam, teamObjs)}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ScuntTeamTransactions = ({ teamObj }) => {
  const [pointTransactions, setPointTransactions] = useState();
  const [teamDetails, setTeamDetails] = useState();

  useEffect(() => {
    getTeamTransactions(teamObj);
  }, [teamObj]);

  const getTeamTransactions = async (teamObjPassed) => {
    try {
      if (!teamObjPassed) {
        throw 'Team not defined';
      }
      const response = await axios.post('/scunt-teams/transactions', {
        teamNumber: teamObjPassed?.number,
      });
      const transactions = response?.data?.message?.transactions;
      setPointTransactions(transactions);
      setTeamDetails(response?.data?.message);
    } catch (e) {
      console.log(e.toString());
    }
  };

  if (!pointTransactions) return <></>;
  return (
    <>
      <h2>
        {teamDetails?.name}: {teamDetails?.points} points
      </h2>
      <div style={{ height: '10px' }}></div>
      {pointTransactions.map((pointTransaction, index) => {
        return (
          <div key={index.toString()}>
            <p>
              <b>{(index + 1).toString()}.</b> {pointTransaction?.name}: {pointTransaction?.points}{' '}
              points
            </p>
          </div>
        );
      })}
    </>
  );
};

ScuntTeamTransactions.propTypes = {
  teamObj: PropTypes.object,
};
