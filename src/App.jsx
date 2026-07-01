import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DataEntry from "./pages/DataEntry";
import DailyHistory from "./pages/DailyHistory";
import AveragesDashboard from "./pages/AveragesDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<DataEntry />} />
          <Route element={<DailyHistory />} path="history" />
          <Route element={<AveragesDashboard />} path="averages" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
