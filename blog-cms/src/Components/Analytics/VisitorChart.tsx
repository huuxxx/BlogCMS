import React from 'react';
import { VictoryChart, VictoryBar } from 'victory';

const data = [
  { dayOfWeek: 'Sunday', visitors: 10 },
  { dayOfWeek: 'Monday', visitors: 3 },
  { dayOfWeek: 'Tueday', visitors: 5 },
  { dayOfWeek: 'Wednesday', visitors: 6 },
  { dayOfWeek: 'Thursday', visitors: 2 },
  { dayOfWeek: 'Friday', visitors: 8 },
  { dayOfWeek: 'Saturday', visitors: 4 },
];

const VisitorChart = () => (
  <div>
    <VictoryChart>
      <VictoryBar data={data} x="dayOfWeek" y="visitors" />
    </VictoryChart>
  </div>
);

export default VisitorChart;
