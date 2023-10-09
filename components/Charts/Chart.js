import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Chart = ({ data }) => {
  const chartData = data.map((entry) => ({
    created_at: entry.timestamp,
    value: entry.weight,
  }));

  const latestValue = chartData[chartData.length - 1].value;
  

  const minWeight = Math.min(...chartData.map((entry) => entry.value));
  const maxWeight = Math.max(...chartData.map((entry) => entry.value));

  // Calculate the range and interval for dividing the Y-axis scale
  const range = maxWeight - minWeight;
  const interval = range / 5;

  // Calculate the tick values for the Y-axis
  const yAxisTicks = [];
  for (let i = 0; i <= 5; i++) {
    yAxisTicks.push(Math.floor(minWeight + i * interval));
  }
  yAxisTicks[5] = maxWeight; // Set the last tick to the maxWeight

  // Sort the yAxisTicks array in ascending order
  yAxisTicks.sort((a, b) => a - b);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          left: -25,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          horizontalFill={["#f5f5f5", "#fff"]}
          fillOpacity={1}
        />
        <YAxis
          ticks={yAxisTicks}
          domain={[minWeight, maxWeight]}
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <ReferenceLine
          y={latestValue}
          stroke="green"
          strokeDasharray="3 3"
          strokeWidth={4}
          label={{
            value: `${Math.floor(latestValue)}`,
            fill: "black",
            fontSize: 20,
            fontWeight: 800,
            position: "center",
            offset: 10,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
