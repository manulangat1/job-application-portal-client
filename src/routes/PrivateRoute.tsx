import React from "react";
import Header from "../components/Common/Header/Header";
import Footer from "../components/Common/Footer/Footer";
import { Navigate } from "react-router";
const isAuthenticated = () => {
  // Check if the user is authenticated (e.g., check for a token in local storage)
  return localStorage.getItem("auth") !== null;
};
function PrivateRoute({ children }: any) {
  console.log("Am I authenticated?", isAuthenticated);
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
