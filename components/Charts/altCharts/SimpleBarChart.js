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
import { format } from "date-fns";

function CustomTooltip({ active, payload, label }) {
  if (active) {
    // Format the date as "MM/dd" without the year
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

function CustomBarLabel(props) {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y + 20}
      fill="black"
      fontSize={18}
      fontWeight="600"
      textAnchor="middle"
      transform={`rotate(-45, ${x}, ${y})`}
    >
      {value}
    </text>
  );
}

function SimpleBarChart({ chartData, capacity }) {
  const lastDataForDate = new Map();

  chartData.forEach((item) => {
    // Format the date as "MM/dd" before adding it to the map
    const formattedDate = format(new Date(item.date), "MM/dd");
    lastDataForDate.set(formattedDate, item);
  });

  let reducedData = Array.from(lastDataForDate.values());

  reducedData = reducedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  const referenceValue =
    reducedData.length > 0 ? reducedData[reducedData.length - 1].uv : 0;

  return (
    <div>
      <h3>Last 30 Days</h3>
      <ResponsiveContainer width="100%" maxWidth={600} height={400}>
        <BarChart
          data={reducedData}
          margin={{
            top: 10,
            right: 10,
            left: 50,
          }}
        >
          <defs>
            <pattern
              id="backgroundStripes"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="8" height="8" fill="#ccc" />
              <rect width="4" height="8" fill="#fff" />
            </pattern>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            horizontalFill={["#f5f5f5", "#fff"]}
            fillOpacity={1}
            fill="url(#backgroundStripes)"
          />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(new Date(date), "MM/dd")}
            angle={-45} // Rotate labels by -45 degrees
            interval={0} // Show all labels without skipping
            height={40} // Increase the height of the X-axis to fit labels
            style={{ fontSize: 15, textAnchor: "end" }} // Adjust font size and text alignment
          />
          <YAxis
            domain={[0, capacity]}
            tick={{ fontSize: 12, fill: "black" }}
            tickLine={{ stroke: "#666", strokeWidth: 0.5 }}
            axisLine={{ stroke: "#666", strokeWidth: 1 }}
            width={50}
            interval="preserveStartEnd"
            tickCount={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="uv" fill="#1684b7" name="gr">
            <LabelList
              dataKey="uv"
              position="top"
              content={<CustomBarLabel />}
            />
          </Bar>
          <ReferenceLine
            y={referenceValue}
            stroke="blue"
            strokeDasharray="3 3"
            strokeWidth={2}
            label={{
              value: `${Math.floor(referenceValue)}`,
              fill: "black",
              fontSize: 20,
              fontWeight:"800"
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SimpleBarChart;
