/* eslint-disable react/jsx-key */
import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './ErrorTable.css';

const axios = require('axios').default;

const GET_ERROR_LIST_ENDPOINT = process.env.REACT_APP_ENDPOINT_ERRORS_GET_ALL;

interface IProps {
  setButtonState: (state: boolean) => void;
}

const ErrorTable: React.FC<IProps> = ({ setButtonState }) => {
  const [responseData, setResponsedata] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: 'Date Logged',
        accessor: 'dateCreated',
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
    axios
      .get(GET_ERROR_LIST_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponsedata(response.data);
          setLoadingData(false);
          // eslint-disable-next-line no-unneeded-ternary
          //   setButtonState(responseData.length > 0 ? true : false);
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loadingData ? (
        <p>Loading please wait...</p>
      ) : (
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
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
        </table>
      )}
    </>
  );
};

export default ErrorTable;
