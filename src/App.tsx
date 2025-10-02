// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import UserManagement from "./Pages/UserManagement";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./Pages/NotFound";
import ForgetPassword from "./Pages/ForgetPassword";
import MessageSent from "./Pages/MessageSent";
// import Survey from "./Pages/Survey"; 

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/message-sent" element={<MessageSent />} />

      {/* Protected Routes (only accessible when logged in) */}
      {isLoggedIn ? (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserManagement />} />
          {/* <Route path="/survey" element={<Survey />} /> */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        // If not logged in, redirect all unknown paths to login
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}

      {/* Catch-all for logged-in users who mistype a route */}
      {isLoggedIn && <Route path="*" element={<NotFound />} />}
    </Routes>
  );
}
