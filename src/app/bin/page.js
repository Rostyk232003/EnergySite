"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  Form,
  ListGroup,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { useCart } from "../../components/cart/CartProvider";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export default function BinPage() {
  const { items, addItem, decrementItem, removeItem, clear, totalCount, totalPrice } =
    useCart();
  const [orderAlert, setOrderAlert] = useState(null);
  const [shipping, setShipping] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const onShippingChange = (field) => (e) => {
    setShipping((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    setOrderAlert(null);

    if (items.length === 0) {
      setOrderAlert({ variant: "warning", text: "Bin is empty. Add equipment first." });
      return;
    }

    const { fullName, email, address, phone } = shipping;
    if (!fullName || !email || !address || !phone) {
      setOrderAlert({ variant: "danger", text: "Please fill in all shipping fields." });
      return;
    }

    clear();
    setShipping({ fullName: "", email: "", address: "", phone: "" });
    setOrderAlert({
      variant: "success",
      text: "Thank you! Your order has been confirmed. Our team will contact you shortly.",
    });
  };

  return (
    <Container className="page-content">
      <div className="d-flex align-items-end justify-content-between mb-3">
        <div>
          <h1 className="mb-1">Bin / Cart</h1>
          <div className="text-muted">
            Selected equipment (simulated cart). State is kept while navigating.
          </div>
        </div>
        <div className="text-muted">Items: {totalCount}</div>
      </div>

      {orderAlert ? (
        <Alert variant={orderAlert.variant} dismissible onClose={() => setOrderAlert(null)}>
          {orderAlert.text}
        </Alert>
      ) : null}

      <Card className="shadow-sm">
        <CardBody>
          <CardTitle className="d-flex align-items-center justify-content-between">
            <span>Selected Items</span>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                clear();
                setOrderAlert(null);
              }}
              disabled={items.length === 0}
            >
              Clear
            </Button>
          </CardTitle>

          {items.length === 0 ? (
            <CardText className="text-muted mb-0">
              Bin is empty. Go to the shop and add equipment.
            </CardText>
          ) : (
            <ListGroup className="mt-3">
              {items.map((item) => (
                <ListGroup.Item key={item.id}>
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bin-thumb">
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt ?? item.title}
                          fill
                          className="bin-thumb-img"
                        />
                      </div>
                      <Stack gap={1}>
                        <strong>{item.title}</strong>
                        <div className="text-muted">
                          {formatMoney(Number(item.price) || 0)}
                        </div>
                        <div className="text-muted">Qty: {Number(item.quantity) || 0}</div>
                      </Stack>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => decrementItem(item.id)}
                      >
                        -
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => addItem(item)}
                      >
                        +
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </CardBody>
      </Card>

      <Row className="g-4 mt-1">
        <Col lg={7}>
          <Card className="shadow-sm">
            <CardBody>
              <CardTitle className="mb-3">Shipping Details</CardTitle>
              <Form onSubmit={confirmOrder}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={shipping.fullName}
                        onChange={onShippingChange("fullName")}
                        placeholder="John Smith"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={shipping.email}
                        onChange={onShippingChange("email")}
                        placeholder="name@example.com"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group controlId="address">
                      <Form.Label>Delivery Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={shipping.address}
                        onChange={onShippingChange("address")}
                        placeholder="Street, City, ZIP"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="phone">
                      <Form.Label>Contact Phone</Form.Label>
                      <Form.Control
                        type="tel"
                        value={shipping.phone}
                        onChange={onShippingChange("phone")}
                        placeholder="+1 (555) 010-2026"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="d-flex align-items-end">
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100"
                      disabled={items.length === 0}
                    >
                      Confirm Order
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <CardBody className="d-flex flex-column">
              <CardTitle className="mb-3">Order Summary</CardTitle>
              <div className="text-muted mb-2">Final total</div>
              <div className="display-5 fw-bold mb-3">{formatMoney(totalPrice)}</div>
              <div className="text-muted">
                This is a lab simulation. In a real checkout, you would integrate payment
                processing and order persistence.
              </div>
              <div className="mt-auto pt-3 text-muted">
                Items in bin: <strong>{totalCount}</strong>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
