import React from "react";
import { Card } from "react-bootstrap";

export default function ArticleCreatedTime({ createdAt }) {
  return (
    <Card.Subtitle className="text-muted mb-2 home">
      {new Date(createdAt.seconds * 1000).toLocaleString()}
    </Card.Subtitle>
  );
}
