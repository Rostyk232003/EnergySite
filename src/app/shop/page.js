"use client";

import { useMemo } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import ShopCard from "../../components/shop-card/ShopCard";
import { useCart } from "../../components/cart/CartProvider";

export default function ShopPage() {
  const { addItem, decrementItem, getQuantity, totalCount } = useCart();

  const equipment = useMemo(
    () => [
      {
        id: "eq_solar_panel",
        title: "Solar Panel",
        description: "High-efficiency PV module. Ideal for rooftops and microgrids.",
        imageSrc: "/solar_cell.jpg",
        imageAlt: "Solar panel",
        price: 320,
      },
      {
        id: "eq_wind_turbine",
        title: "Wind Turbine",
        description: "Compact turbine for low-to-medium wind areas and hybrid systems.",
        imageSrc: "/wind.jpg",
        imageAlt: "Wind turbine",
        price: 890,
      },
      {
        id: "eq_energy_storage",
        title: "Energy Storage",
        description: "Battery storage for peak shaving, backup power, and energy shifting.",
        imageSrc: "/battery.jpg",
        imageAlt: "Battery storage",
        price: 540,
      },
    ],
    [],
  );

  return (
    <Container className="page-content">
      <div className="d-flex align-items-end justify-content-between mb-3">
        <div>
          <h1 className="mb-1">Equipment Shop</h1>
          <div className="text-muted">
            Add equipment to the bin to simulate a cart.
          </div>
        </div>
        <div className="d-flex gap-2">
          <Badge bg="secondary">Items: {totalCount}</Badge>
        </div>
      </div>

      <Row className="g-4">
        {equipment.map((item) => {
          const quantity = getQuantity(item.id);
          const inBin = quantity > 0;

          return (
            <Col key={item.id} xs={12} md={4}>
              <ShopCard
                card={item}
                quantity={quantity}
                isSelected={inBin}
                onSelect={() => addItem(item)}
                onSecondary={() => decrementItem(item.id)}
                secondaryLabel="Remove one"
                selectLabel="Add to bin"
                selectedLabel="Add one more"
                selectedBadgeText="In bin"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
