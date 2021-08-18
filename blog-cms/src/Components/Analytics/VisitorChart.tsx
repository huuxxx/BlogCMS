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
  const [highestValue, setHighestValue] = useState(10);

  useEffect(() => {
    axios
      .get(GET_WEEK_VISITS_ENDPOINT)
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setResponseData(response.data);
          for (const item of responseData) {
            if (item.visitsInDay > 10) {
              setHighestValue(item.visitsInDay);
            }
          }
        }
      })
      .catch((error: string) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="visitor-chart">
      <VictoryChart
        domainPadding={25}
        domain={{ y: [0, highestValue] }}
        padding={{ bottom: 90, top: 60, left: 25, right: 25 }}
      >
        <VictoryLabel
          text="Visitors Past Week"
          x={225}
          y={45}
          textAnchor="middle"
        />
        <VictoryBar data={responseData} x="nameOfDay" y="visitsInDay" />
        <VictoryAxis dependentAxis />
        <VictoryAxis
          fixLabelOverlap
          style={{
            tickLabels: {
              angle: 90,
              textAnchor: 'start',
              overflow: 'visible',
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default VisitorChart;
