import React from "react";
import AccountButton from "../homepage_components/Account_button";
import { Row } from "react-bootstrap";
import AppTitle from "./App_title";

function AppHeader() {
  return (
    <Row>
      <main className="col">
        <AppTitle></AppTitle>
      </main>
      <AccountButton></AccountButton>
    </Row>
  );
}

export default AppHeader;
