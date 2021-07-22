import React from "react";
import { useHistory } from "react-router-dom";

export default function New_article_cancel_btn() {
  const history = useHistory();

  return (
    <a onClick={() => history.goBack()} class="btn btn-secondary">
      Cancel
    </a>
  );
}
