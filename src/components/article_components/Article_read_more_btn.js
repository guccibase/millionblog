import React from "react";
import { Link } from "react-router-dom";

function ArticleReadMoreBtn({ id }) {
  return (
    <div>
      <Link to={"/blog/" + id} className="btn read-more btn-lg mb-1">
        Read more
      </Link>
    </div>
  );
}

export default ArticleReadMoreBtn;
