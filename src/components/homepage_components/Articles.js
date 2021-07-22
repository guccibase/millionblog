import React, { useState, useEffect } from "react";
import "./Articles.css";
import ArticleBodySmall from "../article_components/Article_body_small";
import getArticles from "../../database/get_articles";
import getCurrentUserArticles from "../../database/get_current_user_articles";
import { useAuth } from "../../contexts/AuthContext";
import { Col, Row, Button, Card, Nav } from "react-bootstrap";
import getMostRecent from "../../database/get_most_recent_articles";
import getMostLiked from "../../database/get_most_liked_articles";
import getMostViewed from "../../database/get_most_viewed_articles";
import Loading from "../common_components/Loading";

function Articles({ allArticles }) {
  const [articles, setArticles] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    let isMounted = true;
    let fetchArticles = async () => {
      let articlesList = allArticles
        ? await getArticles()
        : await getCurrentUserArticles(currentUser && currentUser.uid);
      setArticles(articlesList);
    };
    if (isMounted) fetchArticles();
    return () => {
      return (isMounted = false);
    };
  }, [allArticles]);

  const buttons = ["Most recent", "Most viewed", "Most liked"];
  const handleFilterClick = async (getArticlesFromFilter) => {
    setArticles(null);
    let articlesList = await getArticlesFromFilter();
    setArticles(articlesList);
  };

  return (
    <>
      <div>
        {allArticles && (
          <Nav justify variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link
                onClick={() => handleFilterClick(getArticles)}
                className="navlink"
                eventKey="link-0"
              >
                Random articles
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-1"
                onClick={() => handleFilterClick(getMostRecent)}
                className="navlink"
              >
                Most recent
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-2"
                onClick={() => handleFilterClick(getMostLiked)}
                className="navlink"
              >
                Most liked
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="link-3"
                onClick={() => handleFilterClick(getMostViewed)}
                className="navlink"
              >
                Most viewed
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}

        {articles === null ? (
          <Loading className="mt-4" />
        ) : articles.length === 0 ? (
          <div className="text-center no-results">
            <Card.Text className="text-muted mt-10">
              No articles found
            </Card.Text>
          </div>
        ) : (
          articles.map((a) => (
            <ArticleBodySmall
              key={a.id}
              id={a.id}
              data={a.data()}
              description={a.data().description}
              title={a.data().title}
              userProfile={!allArticles}
            ></ArticleBodySmall>
          ))
        )}
      </div>
    </>
  );
}

export default Articles;
