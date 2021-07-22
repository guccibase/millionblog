import React from "react";

export default function New_article_description({ setArticleData, formValue }) {
  return (
    <div class="form-group">
      <label for="description">
        <span>
          <h4>Description</h4>
        </span>{" "}
        (must be 10-200 words long)
      </label>
      <textarea
        required
        name="description"
        defaultValue={formValue && formValue}
        id="description"
        cols="30"
        rows="2"
        class="form-control"
        onChange={(text) => {
          const description = text.target.value;

          setArticleData((prev) => {
            return {
              ...prev,
              description,
            };
          });
        }}
      ></textarea>
    </div>
  );
}
