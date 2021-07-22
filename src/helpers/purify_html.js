import dompurify from "isomorphic-dompurify";
import marked from "marked";

export default async function purifyHTML(html) {
  console.log("sanitizing html");
  let sanitizedHTML = () => {
    return dompurify.sanitize(marked(html));
  };

  return sanitizedHTML();
}
