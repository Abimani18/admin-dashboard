import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/signin";
import Dashboard from "./pages/signin/dashboard";

export default function App() {
  return (
    <Routes>
      {/* Default route goes to SignIn */}
      <Route path="/" element={<SignIn />} />

      {/* Explicit SignIn route */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Add more routes here */}
    </Routes>
  );
}
