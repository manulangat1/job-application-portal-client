import React from "react";
import { Route, Routes } from "react-router";

import SignUp from "./components/Auth/SignUp";
import Password from "./components/Auth/Password";
import NotFound from "./components/Common/NotFound/NotFound";
import Dashboard from "./components/Dashboard/Dashboard";
import SignIn from "./components/Auth/SignIn";

function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/password" element={<Password />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesConfig;
