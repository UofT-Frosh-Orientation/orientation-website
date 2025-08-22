import React, { useState, useEffect, useContext, useMemo } from 'react';
import './FroshInfoTable.scss';
// import { fields } from '../Registration/RegistrationFields';
import { Button } from '../../components/button/Button/Button';
import { ButtonRound } from '../../components/button/ButtonRound/ButtonRound';
import { ButtonPlain } from '../../components/button/ButtonPlain/ButtonPlain';
// import exportFromJSON from 'export-from-json';
import { useDispatch, useSelector } from 'react-redux';
import { froshListSelector } from '../../state/frosh/froshSlice';
import { getFroshList } from '../../state/frosh/saga';
import { convertCamelToLabel } from '../ScopeRequest/ScopeRequest';
import { TextInput } from '../../components/input/TextInput/TextInput';
import { userSelector } from '../../state/user/userSlice';
import { SnackbarContext } from '../../util/SnackbarProvider';
import { PopupModal } from '../../components/popup/PopupModal';
import { getUneditableFields, downloadDataAsFile, deleteUser } from './functions';
import DownloadIcon from '../../assets/misc/file-export-solid.svg';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

const PageFroshInfoTable = () => {
  const noEditFields = getUneditableFields();
  const { froshList } = useSelector(froshListSelector);
  const [objectKeys, setObjectKeys] = useState([]);
  const [showAllUsers, setShowAllUsers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState();
  const [editMade, setEditMade] = useState(false);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      ...objectKeys.map((key) => ({
        header: convertCamelToLabel(key),
        accessorKey: key,
      })),
      // {
      //   header: 'Delete Account',
      //   accessorKey: '_id',
      //   id: 'delete',
      //   cell: (value) => (
      //     <Button
      //       label={'X'}
      //       style={{
      //         margin: 0,
      //         padding: '10px 25px',
      //         backgroundColor: 'var(--red-error)',
      //       }}
      //       onClick={() => {
      //         setSelectedUserID(value.getValue());
      //         setShowPopUp(true);
      //       }}
      //     />
      //   ),
      // },
    ],
    [objectKeys],
  );

  const { setSnackbar } = useContext(SnackbarContext);

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFroshList({ showAllUsers }));
  }, [showAllUsers, editMade]);

  useEffect(() => {
    if (froshList?.length > 0) {
      setObjectKeys(Object.keys(Object.assign({}, ...froshList)));
    }
  }, [froshList]);

  useEffect(() => {
    if (user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') === false)
      setShowAllUsers(false);
  }, []);

  const dataToDisplay = useMemo(() => {
    let froshData = [...froshList];
    if (sorting.length !== 0) {
      froshData.sort((a, b) => {
        if (a[sorting[0].id] === undefined) {
          return 1000000000;
        } else if (b[sorting[0].id] === undefined) {
          return -1000000000;
        }
        if (sorting[0].desc) {
          return a?.[sorting[0].id] > b?.[sorting[0].id] ? -1 : 1;
        }
        return a?.[sorting[0].id] > b?.[sorting[0].id] ? 1 : -1;
      });
    }

    if (searchTerm && searchTerm !== '') {
      const output = [];

      for (let singleton of froshData) {
        for (let key of Object.keys(singleton)) {
          if (singleton[key] !== undefined && singleton[key].toString().includes(searchTerm)) {
            if (!output.some((obj) => obj['_id'] === singleton['_id'])) {
              // to prevent duplicate users (check the mongo id)
              output.push(singleton);
            }
          }
        }
      }
      froshData = output;
    }
    return froshData;
  }, [sorting, showAllUsers, searchTerm, froshList]);

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    getPageCount,
    setPageIndex,
    setPageSize,
    getState,
  } = useReactTable({
    columns,
    data: dataToDisplay || [],
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: true,
  });
  return (
    <div className="frosh-info-table">
      <div className="header">
        <h1>F!rosh Data</h1>
        <div className="buttons-container">
          {user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') ? (
            <ButtonRound
              isSecondary
              label={!showAllUsers ? 'Showing Complete Frosh Users' : 'Showing All Users'}
              onClick={() => {
                setShowAllUsers(!showAllUsers);
              }}
            />
          ) : (
            <></>
          )}
          <div style={{ display: 'inline-block' }}>
            <ButtonRound
              className="export-button"
              label={
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    src={DownloadIcon}
                    style={{
                      filter: 'invert(1)',
                      width: '18px',
                      height: '18px',
                      marginRight: '3px',
                    }}
                  />
                  XML
                </div>
              }
              onClick={() => {
                downloadDataAsFile(dataToDisplay, 'xml');
                setSnackbar('Downloading data as shown in the table below as an XML...');
              }}
            />
            <ButtonRound
              className="export-button"
              label={
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    src={DownloadIcon}
                    style={{
                      filter: 'invert(1)',
                      width: '18px',
                      height: '18px',
                      marginRight: '3px',
                    }}
                  />
                  CSV
                </div>
              }
              onClick={() => {
                downloadDataAsFile(dataToDisplay, 'csv');
                setSnackbar('Downloading data as shown in the table below as a CSV...');
              }}
            />
            <ButtonRound
              className="export-button"
              label={
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <img
                    src={DownloadIcon}
                    style={{
                      filter: 'invert(1)',
                      width: '18px',
                      height: '18px',
                      marginRight: '3px',
                    }}
                  />
                  XLS
                </div>
              }
              onClick={() => {
                downloadDataAsFile(dataToDisplay, 'xls');
                setSnackbar('Downloading data as shown in the table below as an XLS...');
              }}
            />
          </div>
        </div>
      </div>
      {user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') === false ? (
        <p className="small-print" style={{ marginTop: '-14px', marginBottom: '16px' }}>
          ⚠️ Warning: Only showing registered F!rosh (Paid users). If you want to see all users,
          please request the &quot;froshData:unRegisteredUsers&quot; permission.
        </p>
      ) : (
        <></>
      )}
      {user?.authScopes?.approved?.includes('froshData:unRegisteredUsers') === false &&
      !user?.authScopes?.approved?.find((scope) => {
        return scope.includes('froshGroupData:');
      }) ? (
        <p className="small-print" style={{ marginTop: '-14px', marginBottom: '16px' }}>
          ⚠️ Warning: You don&apos;t have permission to access any Frosh&apos;s group&apos;s data.
          If you want to see Frosh data, please request some &quot;froshGroupData:FROSHGROUP&quot;
          permissions.
        </p>
      ) : (
        <></>
      )}
      <div className="search">
        <TextInput
          onChange={(text) => setSearchTerm(text)}
          inputType={'text'}
          placeholder={'Search...'}
        />
      </div>
      <p className="small-print">
        Note: The search is case sensitive. If you want to sort by attribute, click the table
        header. To reverse the direction, click it again. You can request more attributes on the
        request perms page. Keep in mind, any data extracted from this page may be subject to
        change.F!rosh are able to edit their information. This data is only accurate to the point it
        was loaded.{' '}
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
        {froshList?.length === 0 ? (
          <div className="empty-container">
            <h2 className="empty-state">It looks a bit empty here...</h2>
            <h2 className="empty-state">
              Please read the notes listed above and ensure you have the correct permissions.
            </h2>
            <br />
          </div>
        ) : (
          <></>
        )}
        {froshList?.length >= 0 ? (
          <table>
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h2>No data</h2>
        )}
      </div>

      <div className="pagination-buttons-container">
        <ButtonRound
          className="pagination-control"
          onClick={() => setPageIndex(0)}
          disabled={!getCanPreviousPage()}
          label={'First Page'}
        />
        <ButtonRound
          className="pagination-control"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
          label={'Previous Page'}
        />
        <ButtonRound
          className="pagination-control"
          onClick={() => nextPage()}
          label={'Next Page'}
          disabled={!getCanNextPage()}
        />
        <ButtonRound
          className="pagination-control"
          onClick={() => setPageIndex(getPageCount() - 1)}
          disabled={!getCanNextPage()}
          label={'Last Page'}
        />
        <span>
          Page{' '}
          <strong>
            {getState().pagination.pageIndex + 1} of {getPageCount()}
          </strong>
        </span>
        <span style={{ marginLeft: '20px' }}>
          Go to page:{' '}
          <input
            className="pagination-number"
            type="number"
            defaultValue={getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          className="pagination-pages"
          value={getState().pagination.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <PopupModal
        trigger={showPopUp}
        setTrigger={setShowPopUp}
        blurBackground={false}
        exitIcon={true}
      >
        <div className="popup-container">
          <h1 style={{ textAlign: 'center' }}>Permanently delete this account?</h1>
          <div className="popup-button">
            <ButtonRound
              label={'Delete'}
              style={{ backgroundColor: 'var(--red-error)' }}
              onClick={async () => {
                const result = await deleteUser(selectedUserID);
                if (result !== true) {
                  setSnackbar('Error deleting user', true);
                  setShowPopUp(false);
                } else {
                  setEditMade(!editMade);
                  setSnackbar('User Successfully Deleted', false);
                  setShowPopUp(false);
                }
              }}
            />
          </div>
        </div>
      </PopupModal>
    </div>
  );
};

export { PageFroshInfoTable };
