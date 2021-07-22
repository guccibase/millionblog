import React from "react";
import { Alert } from "react-bootstrap";

export default function AuthAlert() {
  return (
    <Alert className="alert-info mt-2">Must be logged in to do that</Alert>
  );
}
