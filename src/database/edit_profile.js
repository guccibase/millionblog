import { usersRef } from "./collections";

export default async (id, userData) => {
    try {
        const updatedProfile = await usersRef.doc(id).update({ ...userData });
        console.log("updated");
        return updatedProfile;
    } catch (error) {
        console.log("failed to update user details");
        console.log(error);
    }
};
