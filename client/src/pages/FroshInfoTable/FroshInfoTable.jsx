import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FroshInfoTable.scss';
import { fields } from '../Registration/RegistrationFields';
import { Button } from '../../components/button/Button/Button';
import exportFromJSON from 'export-from-json';
import { useDispatch, useSelector } from 'react-redux';
import { froshSelector } from '../../state/frosh/froshSlice';
import { getFrosh } from '../../state/frosh/saga';
import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { userSelector } from '../../state/user/userSlice';

function getUneditableFields() {
  let noEditFields = [];
  for (let key1 of Object.keys(fields)) {
    for (let key2 of Object.keys(fields[key1])) {
      if (fields[key1][key2].noEdit) {
        noEditFields.push(key2);
      }
    }
  }
  return noEditFields;
}

function downloadDataAsXML(data) {
  const fileName = 'froshData';
  let fields = [];
  const exportType = 'xml';
  exportFromJSON({ data, fileName, fields, exportType });
}

const PageFroshInfoTable = () => {
  const noEditFields = getUneditableFields();
  const { frosh } = useSelector(froshSelector);
  const [objectKeys, setObjectKeys] = useState([]);
  const [sortedParam, setSortedParam] = useState();
  const [sortedOrder, setSortedOrder] = useState(1);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortedFrosh, setSortedFrosh] = useState([]);
  const [searchedFrosh, setSearchedFrosh] = useState([]);
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFrosh({ showAllUsers }));
  }, [showAllUsers]);

  useEffect(() => {
    if (frosh?.length > 0) {
      setObjectKeys(Object.keys(Object.assign({}, ...frosh)));
    }
    setSortedFrosh(frosh);
  }, [frosh]);

  useEffect(() => {
    const froshData = [...sortedFrosh];
    if (sortedParam === '') return froshData;
    froshData.sort((a, b) => {
      if (a[sortedParam] === undefined) {
        return 1000000000;
      } else if (b[sortedParam] === undefined) {
        return -1000000000;
      }
      return a?.[sortedParam] > b?.[sortedParam]
        ? sortedOrder
        : b?.[sortedParam] > a?.[sortedParam]
        ? -1 * sortedOrder
        : 0;
    });
    if (searchTerm && searchTerm !== '') {
      const output = [];
      for (let singleton of froshData) {
        for (let key of Object.keys(singleton)) {
          if (singleton[key] !== undefined && singleton[key].toString().includes(searchTerm)) {
            output.push(singleton);
          }
        }
      }
      setSearchedFrosh(output);
    } else {
      setSortedFrosh(froshData);
    }
  }, [sortedParam, sortedOrder, showAllUsers, searchTerm]);

  useEffect(() => {
    if (user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') === false)
      setShowAllUsers(false);
  }, []);

  return (
    <div className="frosh-info-table">
      <div className="navbar-space-top" />
      <div className="header">
        <h1>Frosh Data</h1>
        <div className="buttons-container">
          {user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') ? (
            <Button
              isSecondary
              label={!showAllUsers ? 'Showing Complete Frosh Users' : 'Showing All Users'}
              onClick={() => {
                setShowAllUsers(!showAllUsers);
              }}
            />
          ) : (
            <></>
          )}
          <Button
            label="Download XML"
            onClick={() => {
              downloadDataAsXML(frosh);
            }}
          />
        </div>
      </div>
      {user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') === false ? (
        <p className="small-print" style={{ marginTop: '-14px', marginBottom: '16px' }}>
          ⚠️ Warning: Only showing registered Frosh (Paid users). If you want to see all users,
          please request &quot;froshData:unRegisteredUsers&quot; permission.
        </p>
      ) : (
        <></>
      )}
      {user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') === false &&
      !user?.authScopes?.approved?.find((scope) => {
        console.log(scope);
        return scope.includes('froshGroupData:');
      }) ? (
        <p className="small-print" style={{ marginTop: '-14px', marginBottom: '16px' }}>
          ⚠️ Warning: You don&apos;t have permission to access any Frosh&apos;s group&apos;s data.
          If you want to see Frosh data, please request &quot;froshGroupData:FROSHGROUP&quot;
          permissions.
        </p>
      ) : (
        <></>
      )}
      <div className="search">
        <TextInput
          onChange={(text) => {
            setSearchTerm(text);
            console.log(frosh);
          }}
          inputType={'text'}
          placeholder={'Search...'}
        />
      </div>
      <p className="small-print">
        Note: The search is cASe SeNsItIvE! If you want ALL users, including Leadurs and Frosh who
        haven&apos;t completed the registration form - make sure it says &quot;Showing All
        Users&quot; (the default). In &quot;All Users&quot; mode, it is handy to sort by
        &quot;userType&quot;. &quot;Showing Complete Frosh Users&quot; does not contain users who
        have only created an account. This info only contains all Frosh users who have created a
        FULL Frosh account - not everyone has paid in this list either. Paid users have isRegistered
        set to true. Also, Frosh are able to edit their information. This data is only accurate to
        the point it was loaded. Keep in mind, any data extracted from this page may be subject to
        change. If you want to filter, click a table header. To reverse the direction, click it
        again. To clear filters, click the &apos;#&apos; header.{' '}
        {noEditFields.length >= 0 ? (
          <>
            The fields that cannot be edited by the frosh currently:{' '}
            <b>{noEditFields.toString()}</b>
          </>
        ) : (
          <></>
        )}
      </p>
      <div className="table-wrap">
        {frosh?.length === 0 ? (
          <>
            <h2>It looks a bit empty here...</h2>
            <h2>Please read notes listed above and ensure you have the correct permissions.</h2>
            <br />
          </>
        ) : (
          <></>
        )}
        {frosh?.length >= 0 ? (
          <table>
            <tr>
              <th
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setSortedFrosh(frosh);
                  setSortedParam('');
                }}
              >
                #
              </th>
              {objectKeys.map((key) => {
                return (
                  <th
                    key={key}
                    onClick={() => {
                      if (sortedParam === key) setSortedOrder(sortedOrder * -1);
                      else setSortedParam(key);
                    }}
                  >
                    {sortedParam === key ? (
                      <i>{convertCamelToLabel(key)}</i>
                    ) : (
                      <>{convertCamelToLabel(key)}</>
                    )}
                  </th>
                );
              })}
            </tr>
            {(searchTerm && searchTerm !== '' ? searchedFrosh : sortedFrosh).map((datum, index) => {
              return (
                <tr key={index}>
                  <td>
                    <b>{index}</b>
                  </td>
                  {objectKeys.map((key) => {
                    return (
                      <td key={key + index} style={{ width: '500px' }}>
                        {datum?.[key]?.toString()}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </table>
        ) : (
          <h2>No data</h2>
        )}
      </div>
    </div>
  );
};

export { PageFroshInfoTable };
