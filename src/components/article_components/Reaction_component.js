import React from "react";
import { Image } from "react-bootstrap";

export default function Reaction_component({ type, count }) {
  return (
    <div className="reaction-icon">
      <p className="mb-1">{count}</p>
      <span>
        <Image className="reaction-icon-image mb-1 ml-2" src={type}></Image>
      </span>
    </div>
  );
}
