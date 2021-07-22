import React from "react";

export default function New_article_title({ setArticleData, formValue }) {
  return (
    <div className="form-group">
      <label for="title">
        <span>
          <h4>Title</h4>
        </span>{" "}
        (must be 1-50 words long)
      </label>
      <input
        type="text"
        defaultValue={formValue && formValue}
        class="form-control"
        name="title"
        required
        id="title"
        onChange={(text) => {
          const title = text.target.value;

          setArticleData((prev) => {
            return {
              ...prev,
              title,
            };
          });
        }}
      />
    </div>
  );
}
