import React from "react";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import { Navigate } from "react-router";
import { isAuthenticated } from "../utils/auth";

function PrivateRoute({ children }: any) {
  return isAuthenticated() ? (
    <>
      <Header />
      <div className="main-container">{children}</div>

      <Footer />
    </>
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
