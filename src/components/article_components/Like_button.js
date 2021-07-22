import React, { useEffect, useState } from "react";
import isLiked from "../../database/check_like_status";
import SubmitLikes from "../../database/submit_like";
import removeLike from "../../database/remove_Like";
import AuthAlert from "../common_components/Auth_alert";

export default function Like_button({
  updateLikeCount,
  currentUserId,
  articleId,
}) {
  const [liked, setLiked] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const alert = async () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  const handleUnlike = async () => {
    if (currentUserId !== "noid") {
      try {
        await removeLike(articleId, currentUserId);
        setLiked(false);
        updateLikeCount((current) => {
          return {
            ...current,
            ["likes"]: current.likes - 1,
          };
        });
      } catch (e) {
        console.log("failed");
      }
    } else {
      alert();
    }
  };

  const handleLike = async () => {
    if (currentUserId !== "noid") {
      try {
        await SubmitLikes(articleId, currentUserId);
        setLiked(true);
        updateLikeCount((current) => {
          return {
            ...current,
            ["likes"]: current.likes + 1,
          };
        });
      } catch (e) {
        console.log("failed");
      }
    } else {
      alert();
    }
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      const likeStatus = await isLiked(currentUserId, articleId);
      setLiked(likeStatus);
    };
    if (currentUserId === "noid") {
      setLiked(false);
    } else {
      checkLikeStatus();
    }
  }, [currentUserId]);

  return liked === null ? (
    <></>
  ) : !liked ? (
    <>
      <span onClick={handleLike} className="btn btn-light">
        Like article
      </span>{" "}
      {showAlert && <AuthAlert />}
    </>
  ) : (
    <>
      <span onClick={handleUnlike} className="btn btn-success">
        <span>&#10003; </span>
        Liked
      </span>{" "}
      {showAlert && <AuthAlert />}
    </>
  );
}
