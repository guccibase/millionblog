import { usersRef } from "./collections";

export default async (newUserName) => {
    try {
        return await usersRef
            .where("username", "==", newUserName)
            .get()
            .then((querySnapshot) => {
                return querySnapshot.docs.length > 0;
            });
    } catch (error) {
        console.log("failed to verify username");
    }
};
