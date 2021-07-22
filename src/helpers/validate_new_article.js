export default async function validateData(articleData) {
  console.log("validating");
  console.log(articleData.title);
  const title = articleData.title.match(/[^\s]+/g).length;
  const description = articleData.description.match(/[^\s]+/g).length;
  const markdown = articleData.markdown.match(/[^\s]+/g).length;
  if (
    title > 0 &&
    title < 51 &&
    description > 9 &&
    description < 201 &&
    markdown > 19 &&
    markdown < 10001
  ) {
    console.log("articleData");
    return true;
  }

  return false;
}
