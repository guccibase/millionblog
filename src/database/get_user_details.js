import { usersRef } from "./collections";
export default async (id) =>
  usersRef
    .doc(id)
    .get()
    .then((doc) => {
      return doc.data();
    });
