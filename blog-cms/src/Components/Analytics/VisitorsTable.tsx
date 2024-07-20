/* eslint-disable react/jsx-key */
import { AxiosResponse } from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useTable } from 'react-table';
import './VisitorsTable.css';
import Cookies from 'universal-cookie';
import { formatDate, viewedResultToTick } from '../../Helpers/StringHelpers';

const cookies = new Cookies();
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
        accessor: 'visitorIp',
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
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Blogs',
        accessor: 'viewedBlogs',
        Cell: ({ value }) => viewedResultToTick(value),
      },
      {
        Header: 'Projects',
        accessor: 'viewedProjects',
        Cell: ({ value }) => viewedResultToTick(value),
      },
      {
        Header: 'About',
        accessor: 'viewedAbout',
        Cell: ({ value }) => viewedResultToTick(value),
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
      .get(GET_LAST_VISITORS_ENDPOINT, {
        headers: { Authorization: `Bearer ${cookies.get('token')}` },
      })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          const formattedData = response.data.map((item) => ({
            ...item,
            dateVisited: formatDate(item.dateVisited),
          }));
          setResponsedata(formattedData);
          setLoadingData(false);
        }
      })
      .catch((error: string) => {});
  }, []);

  return (
    <>
      {loadingData ? (
        <p>...loading</p>
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
