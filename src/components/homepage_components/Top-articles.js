import React from "react";
import { Col, Row } from "react-bootstrap";
import LatestArticle from "./latest_article";
import MostLikedArticles from "./Most_liked_articles";

export default function TopArticles() {
  return (
    <div className="top-articles mt-4">
      <Row className="mb-4">
        <Col className="mb-2">
          <LatestArticle />
        </Col>
        <Col xs={8}>
          <MostLikedArticles />
        </Col>
      </Row>
    </div>
  );
}
