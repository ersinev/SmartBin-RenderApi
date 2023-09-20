import React from "react";
import { ResponsivePie } from "@nivo/pie";

function SimplePieChart({ chartData }) {
  const lastDataForDate = new Map();

  chartData.forEach((item) => {
    lastDataForDate.set(item.date, item);
  });

  const dataArray = Array.from(lastDataForDate.values());

  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 10);

  const latest15DaysData = dataArray.filter(
    (item) => new Date(item.date) >= fifteenDaysAgo
  );

  // Calculate the total value of the data
  const totalValue = latest15DaysData.reduce((sum, item) => sum + item.uv, 0);

  // Define a minimum size for the smallest pie slice
  const minimumSliceSize = totalValue * 0.05; // You can adjust this value

  // Prepare the pieData array with adjusted values for small slices
  const pieData = latest15DaysData.map((item) => {
    const value = item.uv < minimumSliceSize ? Math.floor(minimumSliceSize) : Math.floor(item.uv);
    console.log(value)
    return {
      id: item.date,
      label: item.date,
      value: value,
    };
  });

  const pieTheme = {
    labels: {
      text: {
        fontSize: 14, 
        fontWeight: "bold"
      },
    },
  };

  return (
    <div>
      <h3>Last 10 Days</h3>
      <div style={{ height: 500 }}>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          enableRadialLabels={false}
          enableSliceLabels={true}
          sliceLabel="value"
          isInteractive={true}
          animate={false}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          theme={pieTheme} // Apply the custom theme to adjust font size and weight
        />
      </div>
    </div>
  );
}

export default SimplePieChart;
