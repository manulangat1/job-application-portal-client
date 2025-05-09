import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import SignUp from "../components/Auth/SignUp";
import Password from "../components/Auth/Password";
import NotFound from "../components/Common/NotFound/NotFound";
import Dashboard from "../components/Dashboard/Dashboard";
import SignIn from "../components/Auth/SignIn";
import NewJob from "../components/Home/NewJob";
import PrivateRoute from "./PrivateRoute";

function RoutesConfig() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NewJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            // <PrivateRoute>

            // </PrivateRoute>
            <SignUp />
          }
        />
        <Route path="/password" element={<Password />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RoutesConfig;
