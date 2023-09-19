import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${label}`}</p>
        {payload.map((item, index) => (
          <p key={index} className="desc">
            {`${item.dataKey === "uv" ? "gr" : item.dataKey}: ${item.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
}

function SimpleBarChart({ chartData, capacity }) {
  const lastDataForDate = new Map();

  chartData.forEach((item) => {
    lastDataForDate.set(item.date, item);
  });

  let reducedData = Array.from(lastDataForDate.values());

  reducedData = reducedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const referenceValue =
    reducedData.length > 0 ? reducedData[reducedData.length - 1].uv : 0;

  return (
    <div>
      <h3>Last 30 Days</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={reducedData}
          margin={{
            top: 10,
            right: 10,
            left: 50,
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
            domain={[0, capacity]}
            tick={{ fontSize: 12, fill: "black" }}
            tickLine={{ stroke: "#666", strokeWidth: 0.5 }}
            axisLine={{ stroke: "#666", strokeWidth: 1 }}
            width={50}
            interval="preserveStartEnd" // Ensure that the first and last values are shown
            tickCount={5} // Number of ticks on the Y-axis
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="uv" fill="#1684b7" name="gr" />
          <ReferenceLine
            y={referenceValue}
            stroke="blue"
            strokeDasharray="3 3"
            strokeWidth={2}
            label={{
              value: `${Math.floor(referenceValue)}`,
              fill: "black",
              fontSize: 20,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleBarChart;
