// import { greentingRef } from "./collections";

// export default async () => {
//   let greeting = "";
//   await greentingRef.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       greeting = doc.data().greeting;
//     });
//   });
//   return greeting;
// };

import quotes from "../assets/quotes/quests_list";

export default () => {
  const quotesLength = quotes.length;
  const random = Math.floor(Math.random() * quotesLength);
  return quotes[random];
};
