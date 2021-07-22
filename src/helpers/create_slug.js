import slugify from "slugify";

export default async function createSlug(title, time) {
  console.log("creating slug");
  let slug = "";

  if (title) {
    slug = slugify(title + "-created-" + time, { lower: true, strict: true });
  }

  return slug;
}
