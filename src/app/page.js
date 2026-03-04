import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Image src="/solar.jpg" alt="Solar panels" fill className="hero-image" />

        <div className="hero-overlay">
          <h1>Smart Renewable Energy Monitoring</h1>
          <p>Track solar, wind and battery performance in real time</p>
          <Button variant="success">Learn More</Button>
        </div>
      </div>

      {/* Cards Section */}
      <Container className="mt-5 mb-5">
        <Row className="g-4">

          <Col md={4}>
            <Card className="shadow h-100">
              <CardBody>
                <CardTitle>Solar Energy</CardTitle>
                <CardText>
                  Monitor real-time solar production and efficiency.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow h-100">
              <CardBody>
                <CardTitle>Wind Energy</CardTitle>
                <CardText>
                  Track wind turbine output and performance metrics.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="shadow h-100">
              <CardBody>
                <CardTitle>Battery Storage</CardTitle>
                <CardText>
                  Analyze storage levels and consumption trends.
                </CardText>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}
