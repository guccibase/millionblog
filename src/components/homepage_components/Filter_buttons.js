import { Button } from "react-bootstrap";
import React from "react";
import { Row } from "react-bootstrap";
import "./Articles.css";
import getMostRecent from "../../database/get_most_recent_articles";
import getMostLiked from "../../database/get_most_liked_articles";
import getMostRead from "../../database/get_most_read_articles";

function FilterButtons({ setArticles }) {
  const buttons = ["Most recent", "Most read", "Most liked"];
  const mostRecent = async () => setArticles(await getMostRecent());
  const mostLiked = async () => setArticles(await getMostLiked());
  const mostRead = async () => setArticles(await getMostRead());

  const handleClick = [mostRecent(), mostLiked(), mostRead()];
  const btnLength = [0, 1, 2];
  return (
    <div>
      <Row>
        {btnLength.map((btn) => (
          <Button
            key={buttons[btn]}
            onClick={handleClick[btn]}
            className="col ml-3 mr-3 btn-light filter-btn"
          >
            {buttons[btn]}
          </Button>
        ))}
      </Row>
    </div>
  );
}
export default FilterButtons;
