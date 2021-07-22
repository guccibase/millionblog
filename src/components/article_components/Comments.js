import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import getComments from "../../database/get_article_comments";
function Comments({ reactions, articleId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getArticleComments = async () => {
      const list = await getComments(articleId);
      setComments(list);
    };

    getArticleComments();
  }, [reactions]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} data={comment.data()} />
      ))}
    </div>
  );
}

export default Comments;
