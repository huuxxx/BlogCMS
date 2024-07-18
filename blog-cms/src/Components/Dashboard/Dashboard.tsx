/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import VisitorsTable from '../Analytics/VisitorsTable';
import VisitorChart from '../Analytics/VisitorChart';
import NavMenu from '../NavMenu/NavMenu';
import './Dashboard.css';

const axios = require('axios').default;

const GET_ANALYTICS_ENDPOINT = process.env.REACT_APP_ENDPOINT_GET_ANALYTICS;

const Dashboard = () => {
  const [responseData, setResponseData] = useState<number>();

  useEffect(() => {
    axios
      .get(GET_ANALYTICS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
        }
      })
      .catch((error: string) => {});
  }, []);

  return (
    <div className="page-parent">
      <NavMenu />
      <div className="page-sub-parent">
        <h1>Dashboard</h1>
        <span>Total site visits: {responseData}</span>
        <VisitorChart />
        <VisitorsTable />
      </div>
    </div>
  );
};

export default Dashboard;
