import React, { useEffect, useState } from 'react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import './VisitorChart.css';
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
    <div className="visitor-chart">
      <VictoryChart domainPadding={25} domain={{ y: [0, 10] }}>
        <VictoryLabel
          text="Visitors Past Week"
          x={225}
          y={45}
          textAnchor="middle"
        />
        <VictoryBar data={responseData} x="nameOfDay" y="visitsInDay" />
        <VictoryAxis dependentAxis />
        <VictoryAxis fixLabelOverlap style={{ tickLabels: { angle: 90 } }} />
      </VictoryChart>
    </div>
  );
};

export default VisitorChart;
