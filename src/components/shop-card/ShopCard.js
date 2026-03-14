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

const ShopCard = ({ card, onSelect, isSelected }) => {
  // Props are immutable: we only READ values from them, never mutate.
  const {
    id,
    title = "Untitled",
    description = "",
    imageSrc,
    imageAlt = title,
  } = card ?? {};

  const handleSelect = () => {
    if (!id) return;
    onSelect?.(id);
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
          {isSelected ? <Badge bg="primary">Active</Badge> : null}
        </CardTitle>
        <CardText className="shopcard-text">{description}</CardText>
        <div className="d-grid mt-auto">
          <Button
            variant={isSelected ? "primary" : "outline-primary"}
            onClick={(e) => {
              e.preventDefault();
              handleSelect();
            }}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ShopCard;
