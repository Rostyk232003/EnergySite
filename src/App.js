"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import ShopCard from "./components/shop-card/ShopCard";

export default function App() {
  const cards = [
    {
      id: "solar",
      title: "Solar Energy",
      description: "Monitor real-time solar production and efficiency.",
      imageSrc: "/solar_cell.jpg",
      imageAlt: "Solar cells",
      details:
        "Solar monitoring focuses on panel output, irradiance conditions, and thermal behavior. A stable PV system should maintain predictable efficiency curves and safe operating temperatures. This view is a lab simulation but matches how real IoT telemetry is typically presented.",
    },
    {
      id: "wind",
      title: "Wind Energy",
      description: "Track wind turbine output and performance metrics.",
      imageSrc: "/wind.jpg",
      imageAlt: "Wind turbines",
      details:
        "Wind monitoring highlights rotor speed, generator output, vibration, and ambient conditions. Good analytics helps detect underperformance, gust behavior, and maintenance needs early. This is simulated data, designed to demonstrate event handling and state.",
    },
    {
      id: "battery",
      title: "Battery Storage",
      description: "Analyze storage levels and consumption trends.",
      imageSrc: "/battery.jpg",
      imageAlt: "Battery storage",
      details:
        "Battery monitoring typically includes state of charge, charge/discharge power, temperature, and cycle health. Storage enables peak shaving and improves renewable utilization. In a real system, these values come from BMS telemetry; here they are mocked for the lab.",
    },
  ];

  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? null;

  const handleSelect = (cardId) => {
    setSelectedCardId(cardId);
    setShowDetails(true);
  };

  return (
    <>
      <div className="hero-section">
        <Image
          src="/solar.jpg"
          alt="Solar panels"
          fill
          className="hero-image"
        />

        <div className="hero-overlay">
          <h1>Smart Renewable Energy Monitoring</h1>
          <p>Track solar, wind and battery performance in real time</p>
        </div>
      </div>

      <Container className="mt-5 mb-5">
        <div className="d-flex align-items-end justify-content-between mb-3">
          <div>
            <h2 className="mb-1">Energy Sources</h2>
            <div className="text-muted">
              Select a card to open detailed information.
            </div>
          </div>
          {selectedCard ? (
            <Badge bg="primary">{selectedCard.title} selected</Badge>
          ) : (
            <Badge bg="secondary">No selection</Badge>
          )}
        </div>

        <Row className="g-4">
          {cards.map((card) => (
            <Col key={card.id} xs={12} md={4}>
              <ShopCard
                card={card}
                isSelected={card.id === selectedCardId}
                onSelect={handleSelect}
              />
            </Col>
          ))}
        </Row>
      </Container>

      <Modal
        show={showDetails && !!selectedCard}
        onHide={() => setShowDetails(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center gap-2">
            <span>{selectedCard?.title ?? "Details"}</span>
            {selectedCard ? <Badge bg="primary">Active</Badge> : null}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-4">
            <Col md={5}>
              <div className="details-media">
                <Image
                  src={selectedCard?.imageSrc ?? "/solar_cell.jpg"}
                  alt={selectedCard?.imageAlt ?? "Energy source"}
                  fill
                  className="details-image"
                />
              </div>
            </Col>
            <Col md={7}>
              <Stack gap={3}>
                <div className="text-muted">{selectedCard?.details ?? ""}</div>
                <div className="p-3 border rounded bg-light">
                  <h5 className="mb-2">Contact us</h5>
                  <div>
                    If you are interested in installing such systems, contact us:
                  </div>
                  <div className="mt-2">
                    <div>
                      Email: <strong>energy.support@example.com</strong>
                    </div>
                    <div>
                      Phone: <strong>+1 (555) 010-2026</strong>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" onClick={() => setShowDetails(false)}>
                    Close
                  </Button>
                </div>
              </Stack>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
