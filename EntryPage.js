import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function EntryPage() {
  return (
    <Container>
      <Row>
      <h2 style={{textAlign:"center", color:"red"}}>---------------------------------------------- Stap 1 ---------------------------------------------- </h2>
        <Col>
          <img
            src={require("./howToSave.jpg")}
            alt="Garbage"
            style={{
              maxWidth: "100%",
              height: "100%",
              borderRadius: "40px",
            }}
          />
        </Col>
      </Row>

      <Row>
      <h2 style={{textAlign:"center", color:"red"}}>---------------------------------------------- Stap 2 ---------------------------------------------- </h2>
        <Col>
        <img
          src={require("./startFetch.jpg")}
          alt="Garbage"
          style={{
            maxWidth: "100%",
            height: "100%",
           
          }}
        />
        </Col>
      </Row>
      <Row>
      <h2 style={{textAlign:"center", color:"red"}}>---------------------------------------------- Stap 3 ---------------------------------------------- </h2>
        <Col>
        <img
          src={require("./hiddenSections.jpg")}
          alt="Garbage"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
        />
        </Col>
      </Row>
    </Container>
  );
}

export default EntryPage;
