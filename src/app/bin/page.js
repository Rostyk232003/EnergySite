"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Container,
  ListGroup,
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
  const [checkoutDone, setCheckoutDone] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) return;
    clear();
    setCheckoutDone(true);
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
        <div className="d-flex gap-2">
          <Badge bg="secondary">Items: {totalCount}</Badge>
          <Badge bg="primary">Total: {formatMoney(totalPrice)}</Badge>
        </div>
      </div>

      {checkoutDone ? (
        <Alert
          variant="success"
          dismissible
          onClose={() => setCheckoutDone(false)}
        >
          Order successfully placed. Our team will contact you shortly.
        </Alert>
      ) : null}

      <Card className="shadow-sm">
        <CardBody>
          <CardTitle className="d-flex align-items-center justify-content-between">
            <span>Selected Items</span>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Checkout
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  clear();
                  setCheckoutDone(false);
                }}
                disabled={items.length === 0}
              >
                Clear
              </Button>
            </div>
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
    </Container>
  );
}
