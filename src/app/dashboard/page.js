"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";

const randomInRange = (min, max) =>
  Math.round((min + Math.random() * (max - min)) * 10) / 10;

export default function DashboardPage() {
  const [snapshot, setSnapshot] = useState(() => ({
    voltageV: randomInRange(220, 245),
    solarKw: randomInRange(1.2, 6.8),
    windKw: randomInRange(0.4, 4.5),
    batterySoc: Math.round(randomInRange(35, 95)),
    panelTempC: randomInRange(28, 58),
    turbineTempC: randomInRange(22, 46),
    inverterTempC: randomInRange(30, 62),
    updatedAt: new Date().toLocaleString(),
  }));

  const totals = useMemo(() => {
    const totalKw = Math.round((snapshot.solarKw + snapshot.windKw) * 10) / 10;
    return { totalKw };
  }, [snapshot.solarKw, snapshot.windKw]);

  const simulateUpdate = () => {
    setSnapshot((prev) => ({
      ...prev,
      voltageV: randomInRange(220, 245),
      solarKw: randomInRange(1.2, 6.8),
      windKw: randomInRange(0.4, 4.5),
      batterySoc: Math.round(randomInRange(35, 95)),
      panelTempC: randomInRange(28, 58),
      turbineTempC: randomInRange(22, 46),
      inverterTempC: randomInRange(30, 62),
      updatedAt: new Date().toLocaleString(),
    }));
  };

  return (
    <Container className="page-content">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="mb-1">Dashboard</h1>
          <div className="text-muted">
            Real-time monitoring (simulated). Last update: {snapshot.updatedAt}
          </div>
        </Col>
        <Col xs="auto">
          <Button variant="primary" onClick={simulateUpdate}>
            Simulate Update
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle className="d-flex align-items-center justify-content-between">
                <span>Live Technical Snapshot</span>
                <Badge bg="success">Online</Badge>
              </CardTitle>

              <Table responsive striped hover className="mb-0">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Value</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Grid Voltage</td>
                    <td>{snapshot.voltageV}</td>
                    <td>V</td>
                  </tr>
                  <tr>
                    <td>Solar Generation</td>
                    <td>{snapshot.solarKw}</td>
                    <td>kW</td>
                  </tr>
                  <tr>
                    <td>Wind Generation</td>
                    <td>{snapshot.windKw}</td>
                    <td>kW</td>
                  </tr>
                  <tr>
                    <td>Total Generation</td>
                    <td>{totals.totalKw}</td>
                    <td>kW</td>
                  </tr>
                  <tr>
                    <td>Panel Temperature</td>
                    <td>{snapshot.panelTempC}</td>
                    <td>&deg;C</td>
                  </tr>
                  <tr>
                    <td>Turbine Temperature</td>
                    <td>{snapshot.turbineTempC}</td>
                    <td>&deg;C</td>
                  </tr>
                  <tr>
                    <td>Inverter Temperature</td>
                    <td>{snapshot.inverterTempC}</td>
                    <td>&deg;C</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <CardBody>
              <CardTitle>Battery State</CardTitle>
              <div className="mb-2">
                State of Charge: <strong>{snapshot.batterySoc}%</strong>
              </div>
              <ProgressBar
                now={snapshot.batterySoc}
                variant={snapshot.batterySoc > 60 ? "success" : "warning"}
              />
              <div className="text-muted mt-2">
                This value is simulated for the lab.
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody>
              <CardTitle>System Notes</CardTitle>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Inverter cooling: <Badge bg="info">Normal</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  Wind gusts detected: <Badge bg="secondary">Low</Badge>
                </ListGroup.Item>
                <ListGroup.Item>
                  Solar irradiance: <Badge bg="warning">Variable</Badge>
                </ListGroup.Item>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

