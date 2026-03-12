"use client";

import { Card, CardBody, CardTitle, CardText } from "react-bootstrap";

export default function ShopCard(props) {
  // Props are immutable: we only READ values from them, never mutate.
  const { card } = props;
  const { title = "Untitled", description = "" } = card ?? {};

  return (
    <Card className="shadow h-100">
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardBody>
    </Card>
  );
}

