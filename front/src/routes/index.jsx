import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { DashboardPage } from './../pages/dashboard';
import { Settings } from './../pages/settings';
import Private from './private';
import SignIn from './../pages/signIn';

export function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/dashboard" element={<Private><DashboardPage /></Private>} />
      <Route path="/settings" element={<Private><Settings /></Private>} />
    </Routes>
  )
}