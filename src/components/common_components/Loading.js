import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="text-center">
      <Button className="btn btn-light mb-2 mt-4" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
    </div>
  );
}
