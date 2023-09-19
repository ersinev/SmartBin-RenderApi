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

  const pieData = latest15DaysData.map((item) => ({
    id: item.date,
    label: item.date,
    value: item.uv,
  }));

  return (
    <div>
      <h3>Last 10 Days</h3>
    <div style={{ height: 300 }}>
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
      />
    </div>
    </div>
  );
}

export default SimplePieChart;
