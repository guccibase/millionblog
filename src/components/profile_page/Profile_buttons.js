import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./profile.css";

function ProfileButtons() {
  const { logout } = useAuth();

  async function handleSignout(e) {
    try {
      await logout();
    } catch {
      console.log("Failed to log in");
    }
  }

  return (
    <>
      <a className="edit-profile account mt-2" href="/update-profile">
        Edit profile
      </a>
      <a onClick={handleSignout} href="/" className="account ml-2 mr-4 mt-2">
        Sign out
      </a>
    </>
  );
}

export default ProfileButtons;
