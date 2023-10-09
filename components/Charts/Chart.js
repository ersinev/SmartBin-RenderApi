import React from "react";
import { LineChart, Line, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from "recharts";
import { format } from "date-fns"; // Import the format function from date-fns

const Chart = ({ data }) => {
  const chartData = data.map((entry) => ({
    created_at: entry.timestamp,
    value: entry.weight,
  }));

  const latestValue = chartData[chartData.length - 1].value;
  
  const minWeight = Math.min(...chartData.map((entry) => entry.value));
  const maxWeight = Math.max(...chartData.map((entry) => entry.value));

  const range = maxWeight - minWeight;
  const interval = range / 5;

  const yAxisTicks = [];
  for (let i = 0; i <= 5; i++) {
    yAxisTicks.push(Math.floor(minWeight + i * interval));
  }
  yAxisTicks[5] = maxWeight;
  yAxisTicks.sort((a, b) => a - b);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          left: -10,
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
          activeDot={{ r: 2 }}
        >
          {/* Customize the tooltip content to display the date */}
          <Label content={({ payload }) => payload[0] ? format(new Date(payload[0].payload.created_at), 'MM/dd') : ''} position="top" />
        </Line>
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
