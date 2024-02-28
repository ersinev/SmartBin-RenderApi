import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { format, subDays } from "date-fns";

function SimplePieChart({ chartData }) {

  
  const tenDaysAgo = subDays(new Date(), 10);

  // Filter data for the last 10 days
  const filteredData = chartData.filter(item => new Date(item.date) >= tenDaysAgo);

  const lastDataForDate = new Map();

  filteredData.forEach((item) => {
    const formattedDate = format(new Date(item.date), "MM/dd");
    lastDataForDate.set(formattedDate, item);
  });

  let reducedData = Array.from(lastDataForDate.values());

  reducedData = reducedData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // const totalValue = reducedData.reduce((sum, item) => sum + item.uv, 0);

  const pieData = reducedData.map((item) => ({
    id: format(new Date(item.date), "MM/dd"),
    label: format(new Date(item.date), "MM/dd"),
    value: item.uv,
  }));

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
          cornerRadius={5}
          enableRadialLabels={false}
          enableSliceLabels={true}
          sliceLabel={({ label }) => label}
          isInteractive={true}
          animate={false}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          theme={pieTheme}
        />
      </div>
    </div>
  );
}

export default SimplePieChart;
