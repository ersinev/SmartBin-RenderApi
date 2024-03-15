import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { format, subDays } from "date-fns"; // Import the format and subDays functions from date-fns

const Chart = ({ data }) => {
  // Filter data for the last 30 days.//
  const thirtyDaysAgo = subDays(new Date(), 30);
  const filteredData = data.filter(entry => new Date(entry.timestamp) >= thirtyDaysAgo);

  // Initialize an object to store aggregated data by date
  const aggregatedData = {};

  // Aggregate data by date
  filteredData.forEach(entry => {
    const date = format(new Date(entry.timestamp), 'MM/dd');
    aggregatedData[date] = entry.weight;
  });

  // Create an array of data points for the chart//
  const chartData = Object.keys(aggregatedData).map(date => ({
    date,
    value: aggregatedData[date],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          labelFormatter={(label) => `Date: ${label}`}
          formatter={(value) => [`Value: ${value}`]}
        />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
