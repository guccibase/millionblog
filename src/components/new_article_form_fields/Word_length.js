import React from "react";

function WordLength({ i }) {
  const words = i.match(/[^\s]+/g);
  return <p>{words && words.length}</p>;
}

export default WordLength;
