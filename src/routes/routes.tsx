import { Route, Routes } from "react-router";

import SignUp from "../components/Auth/SignUp";
import Password from "../components/Auth/Password";
import NotFound from "../components/Common/NotFound/NotFound";

import SignIn from "../components/Auth/SignIn";
import NewJob from "../components/Home/NewJob";
import PrivateRoute from "./PrivateRoute";
import Home from "../components/Home/Home";
import Dashboard from "../components/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";

function RoutesConfig() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/password" element={<Password />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RoutesConfig;
