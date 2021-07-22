import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import getArticles from "../../database/get_top_three_most_liked";
import ArticleBodySmaller from "../article_components/Article_body_smaller";

function MostLikedArticles() {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        let fetchArticles = async () => {
            let articlesList = await getArticles();
            setArticles(articlesList);
        };
        fetchArticles();
    }, []);

    return (
        <div className="most-liked-article">
            {articles.length > 0 && (
                <>
                    <h8>MOST LIKED ARTICLES</h8>
                    <Row className="mb-4">
                        {articles.map((a, i) => (
                            <Col key={a.id}>
                                <ArticleBodySmaller
                                    id={a.id}
                                    data={a.data()}
                                    title={
                                        a.data().title.substring(0, 100) + "..."
                                    }
                                ></ArticleBodySmaller>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
}
export default MostLikedArticles;
