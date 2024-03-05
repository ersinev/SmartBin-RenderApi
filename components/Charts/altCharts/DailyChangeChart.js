import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { format, subDays, subWeeks, subMonths } from "date-fns";

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

function DailyChangeChart({ chartData, capacity }) {
  const [selectedRange, setSelectedRange] = useState("1 day");

  const handleRangeChange = (e) => {
    setSelectedRange(e.target.value);
  };

  const getFilteredData = (range) => {
    const today = new Date();
    switch (range) {
      case "1 day":
        const twoDaysAgo = subDays(today, 2);
        return chartData.filter((item) => new Date(item.date) >= twoDaysAgo);
      case "1 week":
        return chartData.filter((item) => new Date(item.date) >= subWeeks(today, 1));
      case "1 month":
        return chartData.filter((item) => new Date(item.date) >= subMonths(today, 1));
      default:
        return [];
    }
  };

  const filteredData = getFilteredData(selectedRange);

  const lastDataForDate = new Map();

  filteredData.forEach((item) => {
    const formattedDate = format(new Date(item.date), "MM/dd");
    lastDataForDate.set(formattedDate, item);
  });

  let reducedData = Array.from(lastDataForDate.values());

  reducedData = reducedData.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  useEffect(() => {
    console.log("Reduced Data:", reducedData);
  }, [reducedData]);

  // Calculate percentage change for each day compared to the previous day
  for (let i = 1; i < reducedData.length; i++) {
    const currentWeight = reducedData[i].uv;
    const previousWeight = reducedData[i - 1].uv;
    const percentageChange = ((currentWeight - previousWeight) / previousWeight) * 100;
    reducedData[i].value = percentageChange.toFixed(2); // Set percentage change as the value, rounded to 2 decimal places
  }

  // Calculate the domain for Y-axis based on the minimum and maximum percentage change values
  let yDomain;
  const percentageChangeData = reducedData.map(item => parseFloat(item.value)).filter(value => !isNaN(value)); // Parse and filter percentage change values to float
  const minPercentageChange = Math.min(...percentageChangeData); // Find minimum percentage change value
  const maxPercentageChange = Math.max(...percentageChangeData); // Find maximum percentage change value

  // Ensure that there are valid values in percentageChangeData
  if (!isNaN(minPercentageChange) && !isNaN(maxPercentageChange)) {
    // Calculate the range of the percentage change data
    const percentageChangeRange = maxPercentageChange - minPercentageChange;

    // Calculate the step size for dividing the range into four segments
    const stepSize = percentageChangeRange / 4;

    // Calculate the domain for Y-axis based on the segments
    yDomain = [minPercentageChange, minPercentageChange + stepSize, minPercentageChange + 2 * stepSize, minPercentageChange + 3 * stepSize, maxPercentageChange];
  } else {
    // Fallback to default domain values if no valid percentage change values are found
    yDomain = [0, 25, 50, 75, 100];
  }

  // Exclude the first data point if the selected range is "1 day"
  const chartDataToShow = selectedRange === "1 day" ? reducedData.slice(1) : reducedData;

  return (
    <div>
      <h3>Daily Change Chart</h3>
      <div>
        <select value={selectedRange} onChange={handleRangeChange}>
          <option value="1 day">1 Day</option>
          <option value="1 week">1 Week</option>
          <option value="1 month">1 Month</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" maxWidth={600} height={400}>
        <LineChart
          data={chartDataToShow}
          margin={{
            top: 30,
            right: 30,
            left: 30,
            bottom: 30,
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
            domain={yDomain}
            tick={{ fontSize: 12, fontWeight: "bolder", fill: "black" }}
            tickLine={{ stroke: "#666", strokeWidth: 0.5 }}
            axisLine={{ stroke: "#666", strokeWidth: 1 }}
            width={50}
            tickCount={5}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line dataKey="value" name="gr" stroke="#8884d8">
            {/* Display percentage change as label on each line */}
            <LabelList
              dataKey="value"
              position="top"
              style={{ fill: 'red', fontSize: 12, fontWeight: 'bolder' }}
              formatter={(value) => `${value}%`}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
//asdasd

export default DailyChangeChart;
