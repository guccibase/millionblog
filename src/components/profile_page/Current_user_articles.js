import React from "react";
import Articles from "../homepage_components/Articles";

function CurrentUserArticles() {
  return (
    <div>
      <hr></hr>
      <h8 className="mt-8">MY ARTICLES</h8>
      <Articles allArticles={false} />
    </div>
  );
}

export default CurrentUserArticles;
