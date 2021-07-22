import React from "react";
import like from "../../assets/like.png";
import views from "../../assets/seen.png";
import comment from "../../assets/comment.png";
import "./Article_styles.css";
import Reaction_component from "./Reaction_component";

export default function ReactionsComponent({ reactionCounts }) {
  return (
    <div className="reactions-component">
      <Reaction_component type={like} count={reactionCounts.likes} />
      <Reaction_component type={views} count={reactionCounts.views} />
      <Reaction_component type={comment} count={reactionCounts.comments} />
    </div>
  );
}
