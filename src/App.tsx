import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import Overview from "./pages/Overview";
import Payments from "./pages/Payments";
import ResumeUpload from "./pages/ResumeUpload";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import LeaveManagement from "./pages/LeaveManagement";
import Payroll from "./pages/Payroll";
import Jobs from "./pages/Jobs";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Overview />} />
            <Route path="employees" element={<Employees />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="resume" element={<ResumeUpload />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
