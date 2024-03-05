import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";
import SimpleBarChart from "./altCharts/SimpleBarChart";
import CalendarChart from "./altCharts/CalendarChart";
import SimplePieChart from "./altCharts/SimplePieChart";
import DailyChangeChart from "./altCharts/DailyChangeChart";

function MonthlyChart({ data, showModal, handleClose, capacity }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData(null);

    if (data) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3005/fetch-weights/${data.feedKey}`
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

  const printContent = () => {
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Monthly Chart</title>
          </head>
          <body>
            <div>
              <h1>Specific Data For Each Row</h1>
              <div id="modal-content">
                ${document.getElementById("modal-content").innerHTML}
              </div>
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();

      // Trigger the print dialog
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Specific Data For Each Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {chartData ? (
            <Container fluid id="modal-content">
              <Row>
                <Col md={12} className="mb-3">
                  <CalendarChart chartData={chartData} />
                </Col>
              </Row>
              <Row>
                <Col md={12} className="barChart">
                  <DailyChangeChart chartData={chartData} capacity={capacity} />
                </Col>
                <Col md={12} className="barChart">
                  <SimpleBarChart chartData={chartData} capacity={capacity} />
                </Col>
                <Col md={12}>
                  <SimplePieChart chartData={chartData} />
                </Col>
              </Row>
            </Container>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={printContent}>Print</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MonthlyChart;
