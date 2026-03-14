"use client";

import Image from "next/image";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
} from "react-bootstrap";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const ShopCard = ({
  card,
  onSelect,
  isSelected,
  quantity,
  onSecondary,
  secondaryLabel = "Remove",
  selectLabel = "Select",
  selectedLabel = "Selected",
  selectedBadgeText = "Active",
}) => {
  // Props are immutable: we only READ values from them, never mutate.
  const {
    id,
    title = "Untitled",
    description = "",
    imageSrc,
    imageAlt = title,
    price,
  } = card ?? {};

  const handleSelect = () => {
    if (!id) return;
    onSelect?.(id);
  };

  const handleSecondary = () => {
    if (!id) return;
    onSecondary?.(id);
  };

  return (
    <Card
      className={`shadow h-100 d-flex flex-column ${
        isSelected ? "border border-primary border-2" : ""
      }`}
    >
      {imageSrc ? (
        <div className="shopcard-media">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="shopcard-media-img"
          />
        </div>
      ) : null}

      <CardBody className="d-flex flex-column">
        <CardTitle className="d-flex align-items-center justify-content-between">
          <span>{title}</span>
          {isSelected ? (
            <Badge bg="primary">
              {selectedBadgeText}
              {Number(quantity) > 0 ? ` x${Number(quantity)}` : ""}
            </Badge>
          ) : null}
        </CardTitle>
        <CardText className="shopcard-text">{description}</CardText>
        {price != null ? (
          <div className="shopcard-price mt-1">{formatMoney(Number(price) || 0)}</div>
        ) : null}

        <div className="d-grid gap-2 mt-auto">
          <Button
            variant={isSelected ? "primary" : "outline-primary"}
            onClick={(e) => {
              e.preventDefault();
              handleSelect();
            }}
          >
            {isSelected ? selectedLabel : selectLabel}
          </Button>
          {onSecondary && Number(quantity) > 0 ? (
            <Button
              variant="outline-secondary"
              onClick={(e) => {
                e.preventDefault();
                handleSecondary();
              }}
            >
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </CardBody>
    </Card>
  );
};

export default ShopCard;
