import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import DataEntry from "./pages/DataEntry";
import DailyHistory from "./pages/DailyHistory";
import AveragesDashboard from "./pages/AveragesDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<VerifyEmail />} path="/verify-email" />

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
            path="/"
          >
            <Route index element={<DataEntry />} />
            <Route element={<DailyHistory />} path="history" />
            <Route element={<AveragesDashboard />} path="averages" />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}