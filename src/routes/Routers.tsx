import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import HospitalSearch from "../pages/HospitalSearch";
import ProtectedRoute from "../routes/ProtectedRoutes";
import HospitalDetails from "../pages/HospitalDetails";

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="hospital"
        element={
          <ProtectedRoute>
            <HospitalSearch />
          </ProtectedRoute>
        }
      />
      <Route path="hospital/:id" element={<HospitalDetails />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;