import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import getUserDetails from "../../database/get_user_details";

import "./Article_styles.css";

export default function Comment({ data }) {
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const getAuthor = async () => {
      const user = await getUserDetails(data.authorId);
      setAuthor(user);
    };

    getAuthor();
  }, [data]);

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>{author.username}</Card.Title>
        <Card.Subtitle className="text-muted mb-2 home">
          {new Date(data.createdAt.seconds * 1000).toLocaleString()}{" "}
        </Card.Subtitle>
        <Card.Text className="mt-4 card-text bold">{data.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
}
