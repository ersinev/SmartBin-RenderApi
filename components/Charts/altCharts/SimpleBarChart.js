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
  LabelList,
} from "recharts";
import { format, subDays } from "date-fns";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const formattedDate = format(new Date(label), "MM/dd");

    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${formattedDate}`}</p>
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


  const thirtyDaysAgo = subDays(new Date(), 30);
  
  // Filter data for the last 30 days
  const filteredData = chartData.filter(item => new Date(item.date) >= thirtyDaysAgo);

  const lastDataForDate = new Map();

  filteredData.forEach((item) => {
    const formattedDate = format(new Date(item.date), "MM/dd");
    lastDataForDate.set(formattedDate, item);
  });

  let reducedData = Array.from(lastDataForDate.values());

  reducedData = reducedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const referenceValue =
    reducedData.length > 0 ? reducedData[reducedData.length - 1].uv : 0;

  // Calculate levels based on capacity
  const levels = [];
  const levelStep = capacity / 5; // Divide capacity into 5 levels
  for (let i = 0; i < 5; i++) {
    levels.push(i * levelStep);
  }

  return (
    <div>
      <h3>Last 30 Days</h3>
      <ResponsiveContainer width="100%" maxWidth={600} height={400}>
        <BarChart
          data={reducedData}
          margin={{
            top: 30,
            right: 10,
            left: -5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "MM/dd")}
            angle={-45}
            interval={0}
            height={60}
            style={{ fontSize: 12, textAnchor: "end" }}
          />
          <YAxis
            domain={[0, capacity]}
            tick={{ fontSize: 12, fontWeight: "bolder", fill: "black" }}
            tickLine={{ stroke: "#666", strokeWidth: 0.5 }}
            axisLine={{ stroke: "#666", strokeWidth: 1 }}
            width={50}
            tickCount={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="uv" fill="#1684b7" name="gr" />
          {levels.map((level, index) => (
            <ReferenceLine
              key={index}
              y={level}
              stroke="gray"
              strokeDasharray="3 3"
            />
          ))}
          {/* Line to indicate reference value */}
          <ReferenceLine
            y={referenceValue}
            stroke="green"
            strokeDasharray="8 8"
            strokeWidth={2}
            label={{
              value: `${Math.floor(referenceValue)}`,
              fill: "black",
              fontSize: 20,
              fontWeight: "800",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleBarChart;
