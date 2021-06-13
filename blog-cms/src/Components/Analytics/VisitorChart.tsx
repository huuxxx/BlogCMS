import React from 'react';
import { VictoryChart, VictoryBar } from 'victory';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const VisitorChart = () => (
  <div>
    <VictoryChart>
      <VictoryBar data={data} x="quarter" y="earnings" />
    </VictoryChart>
  </div>
);

export default VisitorChart;
