import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AccountButton() {
  const { currentUser } = useAuth();
  return (
    <Link
      className="account mr-4 mt-2"
      to={currentUser ? "/profile" : "/login"}
    >
      {currentUser ? "My account" : "Login"}
    </Link>
  );
}

export default AccountButton;
