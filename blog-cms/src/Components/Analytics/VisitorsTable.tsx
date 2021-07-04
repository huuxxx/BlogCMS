/* eslint-disable react/jsx-key */
import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './VisitorsTable.css';

const axios = require('axios').default;

const GET_LAST_VISITORS_ENDPOINT =
  process.env.REACT_APP_ENDPOINT_GET_LAST_VISITS;

const VisitorsChart = () => {
  const [responseData, setResponsedata] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: 'Visitor IP',
        accessor: 'visitorIP',
      },
      {
        Header: 'Screen Width',
        accessor: 'screenWidth',
      },
      {
        Header: 'Screen Height',
        accessor: 'screenHeight',
      },
      {
        Header: 'Date Visited',
        accessor: 'dateVisited',
      },
      {
        Header: 'Blogs',
        accessor: 'viewedBlogs',
      },
      {
        Header: 'Projects',
        accessor: 'viewedProjects',
      },
      {
        Header: 'About',
        accessor: 'viewedAbout',
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
      .post(GET_LAST_VISITORS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponsedata(response.data);
          setLoadingData(false);
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loadingData ? (
        <p>Loading Please wait...</p>
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

export default VisitorsChart;
