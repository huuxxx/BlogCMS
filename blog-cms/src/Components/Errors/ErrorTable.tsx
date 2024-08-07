/* eslint-disable react/jsx-key */
import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './ErrorTable.css';
import Cookies from 'universal-cookie';
import { formatDateLong } from '../../Helpers/StringHelpers';
import { CircularProgress } from '@mui/material';

const cookies = new Cookies();

const axios = require('axios').default;

const ERROR_ENDPOINT = process.env.REACT_APP_ENDPOINT_ERRORS;

interface IProps {
  setButtonState: (state: boolean) => void;
  clearTable: boolean;
}

const ErrorTable: React.FC<IProps> = ({ setButtonState, clearTable }) => {
  const [responseData, setResponsedata] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: 'Date Logged',
        accessor: 'dateCreated',
        Cell: ({ value }) => formatDateLong(value),
      },
      {
        Header: 'Stack Trace',
        accessor: 'stackTrace',
      },
      {
        Header: 'Message',
        accessor: 'message',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: responseData });

  useEffect(() => {
    // eslint-disable-next-line no-unneeded-ternary
    setButtonState(responseData.length === 0 ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  useEffect(() => {
    axios
      .get(ERROR_ENDPOINT, {
        headers: { Authorization: `Bearer ${cookies.get('token')}` },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponsedata(response.data);
          setLoading(false);
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        {!clearTable ? (
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        ) : null}
      </table>
      {loading ? (
        <div className="loadingSpinner">
          <CircularProgress />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default ErrorTable;
