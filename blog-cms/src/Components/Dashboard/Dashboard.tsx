/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import VisitorsTable from '../Analytics/VisitorsTable';
import VisitorChart from '../Analytics/VisitorChart';
import NavMenu from '../NavMenu/NavMenu';
import './Dashboard.css';

const axios = require('axios').default;

// const GET_ANALYTICS_ENDPOINT =
//   'https://blogapi.huxdev.com/api/Analytics/GetAnalytics';
const GET_ANALYTICS_ENDPOINT =
  'https://localhost:44358/api/Analytics/GetAnalytics';

type AnalyticsResponseItem = {
  totalVisits: number;
};

const Dashboard = () => {
  const [responseData, setResponseData] = useState<AnalyticsResponseItem>();

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
    <div>
      <NavMenu />
      <div className="dashboardParent">
        <h1>Dashboard</h1>
        <span>Total page visits: {responseData?.totalVisits}</span>
        <VisitorChart />
        <VisitorsTable />
      </div>
    </div>
  );
};

export default Dashboard;
