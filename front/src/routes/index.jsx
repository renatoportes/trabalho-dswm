import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { DashboardPage } from './../pages/dashboard';
import { Settings } from './../pages/settings';

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}