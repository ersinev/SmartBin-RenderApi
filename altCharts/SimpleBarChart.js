import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from 'recharts';

function SimpleBarChart({ chartData, capacity }) {
  const lastDataForDate = new Map();

  chartData.forEach(item => {
    lastDataForDate.set(item.date, item);
  });

  let reducedData = Array.from(lastDataForDate.values());

  // Sort the data from oldest to newest
  reducedData = reducedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const referenceValue =
    reducedData.length > 0 ? reducedData[reducedData.length - 1].uv : 0;

  // Enhanced Y-axis ticks for better granularity
  const yAxisTicks = Array.from({ length: 6 }).map((_, i) => (capacity / 5) * i);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={reducedData}
        margin={{
          top: 10,
          right: 10,
          left: 20, // Increase left margin to accommodate Y-axis labels better
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontalFill={["#f5f5f5", "#fff"]}
          fillOpacity={1}
        />
        <XAxis dataKey="date" />
        <YAxis
          ticks={yAxisTicks}
          domain={[0, capacity]}
          tick={{ fontSize: 12 }}
          tickLine={{ stroke: '#666', strokeWidth: 0.5 }}
          axisLine={{ stroke: '#666', strokeWidth: 1 }}
          width={50} // Increase the width to ensure there's enough room for the ticks
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#90EE90" /> {/* Light Green Color */}
        <ReferenceLine
          y={referenceValue}
          stroke="blue"
          strokeDasharray="3 3"
          strokeWidth={2}
          label={{ value: `${Math.floor(referenceValue)}`, fill: 'black', fontSize: 20 }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default SimpleBarChart;
