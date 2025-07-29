import React from "react";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import { Navigate } from "react-router";
import { isAuthenticated } from "../utils/auth";
import NavBarResponsive from "../components/Common/Header/AppBar";

function PrivateRoute({ children }: any) {
  return isAuthenticated() ? (
    <>
      {/* <Header /> */}
      <NavBarResponsive />
      <div className="main-container">{children}</div>

      <Footer />
    </>
  ) : (
    <Navigate to="/signin" />
  );
}

export default PrivateRoute;
