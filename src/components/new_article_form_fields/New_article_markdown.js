import React from "react";
import { Editor } from "@tinymce/tinymce-react";
// import MDEditor from "@uiw/react-md-editor";

export default function New_article_markdown({ setArticleData, formValue }) {
    return (
        <div class="form-group">
            <label for="markdown">
                <span>
                    <h4>Body</h4>
                </span>{" "}
                (must be 20-10,000 words long)
            </label>
            {/* <MDEditor
        value={formValue}
        onChange={(v) => {
          setArticleData((prev) => {
            return { ...prev, ["markdown"]: v };
          });
        }}
      />  */}

            <Editor
                value={formValue}
                onEditorChange={(newValue) => {
                    setArticleData((prev) => {
                        return { ...prev, ["markdown"]: newValue };
                    });
                }}
                init={{
                    height: 500,
                    api: "b3uro5dd0clncipm61xxws7ln33gmigt9hbor26fv9yffoks",
                    menubar: false,
                    plugins:
                        "searchreplace fullscreen image link template codesample table hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap quickbars emoticons",

                    toolbar:
                        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor removeformat | pagebreak | charmap emoticons  | image link anchor codesample | ltr rtl | fullscreen  preview",
                    statusbar: false,

                    content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                }}
            />
            {/* <button onClick={onChange}>Log editor content</button>

      {/* <textarea
        required
        name="markdown"
        id="markdown"
        defaultValue={formValue && formValue}
        cols="30"
        rows="10"
        class="form-control"
        onChange={(text) => {
          const markdown = text.target.value;
          setArticleData((prev) => {
            return {
              ...prev,
              markdown,
            };
          });
        }}
      ></textarea> */}
        </div>
    );
}
