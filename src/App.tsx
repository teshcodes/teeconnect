// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import UserManagement from "./Pages/UserManagement";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./Pages/NotFound";
import ForgetPassword from "./Pages/ForgetPassword";
import MessageSent from "./Pages/MessageSent";
import ProtectedRoute from "./components/ProtectedRoute";
import AddUser from "./Pages/AddUser";
 

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/message-sent" element={<MessageSent />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="users/add" element={<AddUser />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
