"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function AnalyticsPage() {
  const [range, setRange] = useState("24h");

  const analytics = useMemo(() => {
    if (range === "7d") {
      return {
        efficiencyPct: 87,
        savingsUsd: 124,
        forecastKwh: 42,
        solarSharePct: 63,
        windSharePct: 37,
      };
    }

    return {
      efficiencyPct: 91,
      savingsUsd: 19,
      forecastKwh: 8.4,
      solarSharePct: 70,
      windSharePct: 30,
    };
  }, [range]);

  return (
    <Container className="page-content">
      <Row className="align-items-center mb-4">
        <Col>
          <h1 className="mb-1">Analytics</h1>
          <div className="text-muted">
            Summary insights (simulated) for renewable energy monitoring.
          </div>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button
            variant={range === "24h" ? "primary" : "outline-primary"}
            onClick={() => setRange("24h")}
          >
            24h
          </Button>
          <Button
            variant={range === "7d" ? "primary" : "outline-primary"}
            onClick={() => setRange("7d")}
          >
            7d
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <CardBody>
              <CardTitle className="d-flex align-items-center justify-content-between">
                <span>Efficiency</span>
                <Badge bg="success">{analytics.efficiencyPct}%</Badge>
              </CardTitle>
              <CardText className="text-muted">
                Estimated conversion and delivery efficiency for the selected
                period.
              </CardText>
              <ProgressBar now={analytics.efficiencyPct} />
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <CardBody>
              <CardTitle>Cost Savings</CardTitle>
              <div className="display-6">{formatMoney(analytics.savingsUsd)}</div>
              <div className="text-muted mt-2">
                Approximate savings compared to grid-only consumption.
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm h-100">
            <CardBody>
              <CardTitle>Tomorrow Forecast</CardTitle>
              <div className="display-6">{analytics.forecastKwh} kWh</div>
              <div className="text-muted mt-2">
                Forecast is simulated. In a real system this comes from weather
                and device telemetry.
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mt-1">
        <Col lg={7}>
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle>Generation Mix</CardTitle>
              <div className="text-muted mb-3">
                Share of total generation by source (simulated).
              </div>
              <ProgressBar className="mb-3">
                <ProgressBar
                  now={analytics.solarSharePct}
                  variant="warning"
                  key="solar"
                  label={`Solar ${analytics.solarSharePct}%`}
                />
                <ProgressBar
                  now={analytics.windSharePct}
                  variant="info"
                  key="wind"
                  label={`Wind ${analytics.windSharePct}%`}
                />
              </ProgressBar>

              <Table responsive striped className="mb-0">
                <thead>
                  <tr>
                    <th>Indicator</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Efficiency</td>
                    <td>
                      How effectively the system converts available energy to
                      usable output.
                    </td>
                  </tr>
                  <tr>
                    <td>Savings</td>
                    <td>
                      Estimated money saved by using renewables and storage.
                    </td>
                  </tr>
                  <tr>
                    <td>Forecast</td>
                    <td>
                      Predicted next-day energy generation based on conditions.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <CardBody>
              <CardTitle>Notes</CardTitle>
              <CardText className="text-muted">
                If you later add Firebase/telemetry, this page can render real
                charts (e.g. daily kWh, peak power, battery cycles) using a chart
                library.
              </CardText>
              <div className="text-muted">
                Current mode: <strong>{range}</strong>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

