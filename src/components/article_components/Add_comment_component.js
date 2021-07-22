import React, { useRef, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import SubmitButton from "../common_components/Submit_button";
import submitComment from "../../database/submit_comment";
import AuthAlert from "../common_components/Auth_alert";

export default function AddCommentComponent({
  updateCommentsCount,
  articleId,
  currentUserId,
}) {
  const [showAlert, setShowAlert] = useState(false);

  // useEffect(() => {}, [currentUserId]);

  const alert = async () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const commentRef = useRef();
  async function onSubmit(e) {
    e.preventDefault();

    if (currentUserId === "noid") {
      alert();
    } else {
      try {
        const comment = commentRef.current.value;
        await submitComment(articleId, currentUserId, comment);
        commentRef.current.value = "";
        updateCommentsCount((current) => {
          return {
            ...current,
            ["comments"]: current.comments + 1,
          };
        });
      } catch (e) {
        console.log("failed");
      }
    }
  }
  return (
    <Form onSubmit={onSubmit} className="mt-4">
      <label for="description">Add a comment</label>
      <textarea
        required
        name="comment"
        id="comment"
        cols="30"
        rows="2"
        class="form-control mb-2"
        ref={commentRef}
      ></textarea>
      <SubmitButton />
      {showAlert && <AuthAlert />}
    </Form>
  );
}
