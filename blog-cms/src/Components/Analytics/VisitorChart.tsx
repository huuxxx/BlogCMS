import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar } from 'victory';
import { AxiosResponse } from 'axios';

const axios = require('axios').default;

const GET_WEEK_VISITS_ENDPOINT = process.env.REACT_APP_ENDPOINT_GET_WEEK_VISITS;

type WeekVisitorsResponseItem = {
  visitsInDay: number;
  nameOfDay: string;
};

const VisitorChart = () => {
  const [responseData, setResponseData] = useState<WeekVisitorsResponseItem[]>(
    []
  );

  useEffect(() => {
    axios
      .get(GET_WEEK_VISITS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
        }
      })
      .catch((error: string) => {});
  }, []);

  return (
    <div>
      <VictoryChart>
        <VictoryBar data={responseData} x="nameOfDay" y="visitsInDay" />
      </VictoryChart>
    </div>
  );
};

export default VisitorChart;
