import React, { useState, useEffect } from "react";
import { Card, Image } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import getUserDetails from "../../database/get_user_details";
import mm1 from "./../../assets/mm1.jpg";
import mm2 from "./../../assets/mm2.png";
import mm3 from "./../../assets/mm3.png";
import mm4 from "./../../assets/mm4.png";
import mm5 from "./../../assets/mm5.png";
import mm6 from "./../../assets/mm6.png";
import mm7 from "./../../assets/mm7.png";
import mm8 from "./../../assets/mm8.jpg";
import mm9 from "./../../assets/mm9.jpg";
import mm10 from "./../../assets/mm10.jpg";
import mm11 from "./../../assets/mm11.jpg";
import lambo1 from "./../../assets/urus.png";
import lambo2 from "./../../assets/gallardo.png";
import yatch from "./../../assets/yatch.png";
import bling1 from "./../../assets/diamond.png";
import bling2 from "./../../assets/gold.png";

function UserDetails() {
    const { currentUser } = useAuth();
    const [userDetails, setUserDetails] = useState({
        username: "",
        bio: ""
    });

    useEffect(() => {
        let isMounted = true;

        const getUser = async () => {
            const user = await getUserDetails(currentUser.uid);
            const avatar = setProfileImage(user);

            setUserDetails({
                username: user.username,
                bio: user.bio,
                avatar: avatar
            });
        };
        if (isMounted) getUser();
        return () => {
            return (isMounted = false);
        };
    }, []);

    const setProfileImage = (user) => {
        switch (user.avatar) {
            case 0:
                return mm1;
            case 1:
                return mm2;
            case 2:
                return mm3;
            case 3:
                return mm4;
            case 4:
                return mm5;
            case 5:
                return mm6;
            case 6:
                return mm7;
            case 7:
                return mm8;
            case 8:
                return mm9;
            case 9:
                return mm10;
            case 10:
                return mm11;
            case 11:
                return bling1;
            case 12:
                return bling2;
            case 13:
                return yatch;
            case 14:
                return lambo1;
            case 15:
                return lambo2;
            default:
                break;
        }
    };
    return (
        <Card className="mb-4">
            <Card.Body>
                <div className="text-center">
                    <Image
                        className="avatar lg"
                        src={userDetails.avatar}
                        fluid
                    />
                </div>
                <h3 className="text-center tracker">{userDetails.username}</h3>
                <Card.Text className="text-center high"></Card.Text>
                <Card.Text className="text-center low">
                    {userDetails.bio}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default UserDetails;
