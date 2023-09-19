import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col } from "react-bootstrap";
import SimpleBarChart from "./altCharts/SimpleBarChart";
import CalendarChart from "./altCharts/CalendarChart";
import SimplePieChart from "./altCharts/SimplePieChart";

function MonthlyChart({ data, showModal, handleClose, capacity }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData(null);

    if (data) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://smartbin-cf8d.onrender.com/fetch-weights/${data.feedKey}`
          );
          if (response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.length > 0) {
              setChartData(
                responseData.map((item) => {
                  return {
                    uv: Math.round(parseFloat(item.weight)),
                    date: item.timestamp.split("T")[0],
                    className: data.className,
                  };
                })
              );
            }
          }
        } catch (error) {
          console.error("Error fetching or processing data:", error);
        }
      };
      fetchData();
    }
  }, [data]);

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Specific Data For Each Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chartData ? (
          <Container fluid>
            <Row>
              <Col md={12}>
                <CalendarChart chartData={chartData} />
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <SimplePieChart chartData={chartData} />
              </Col>
              <Col md={6}>
                <SimpleBarChart chartData={chartData} capacity={capacity} />
              </Col>
            </Row>
          </Container>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MonthlyChart;
