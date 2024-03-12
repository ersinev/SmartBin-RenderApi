import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { BsBarChart } from "react-icons/bs";

const CustomBarLabel = (props) => {
  const { x, y, width, value } = props;
  const xOffset = x + width / 2;
  const yOffset = y + 9;
  return (
    <text
      style={{ fontWeight: "bolder" }}
      x={xOffset}
      y={yOffset}
      fill="red"
      textAnchor="middle"
      dy={-3}
    >
      {value}
    </text>
  );
};

export default function Compare() {
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [allFetchedChartData, setAllFetchedChartData] = useState([]);

  const handleOpenChartModal = async () => {
    setIsChartModalOpen(true);

    try {
      const response = await fetch(
        "http://localhost:3005/fetch-all-weights"
      );

      if (response.ok) {
        const allData = await response.json();

        let uniqueDeviceData = {};

        allData.forEach((item) => {
          uniqueDeviceData[item.deviceId] = item.weight;
        });

        const chartData = Object.keys(uniqueDeviceData).map((deviceId) => ({
          uv: Math.round(parseFloat(uniqueDeviceData[deviceId])),
          className: deviceId,
        }));

      
        setAllFetchedChartData(chartData);
      } else {
        console.warn("Failed fetching data");
      }
    } catch (error) {
      console.warn("Error fetching or processing data:", error);
    }
  };
  //
  return (
    <>
      <Button className="compareBtn" onClick={handleOpenChartModal}>
        <BsBarChart />
      </Button>
      <Modal
        show={isChartModalOpen}
        onHide={() => setIsChartModalOpen(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Device Data Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={allFetchedChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="className"
                angle={-30}
                textAnchor="end"
                interval={0}
                height={60}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="uv" fill="#8884d8">
                {allFetchedChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={`hsla(${
                      index * (360 / allFetchedChartData.length)
                    }, 70%, 50%, 1)`}
                  />
                ))}
                <LabelList dataKey="uv" content={<CustomBarLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Modal.Body>
      </Modal>
    </>
  );
}
