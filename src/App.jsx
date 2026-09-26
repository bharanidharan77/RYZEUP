import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AnimatedBackground from './components/common/AnimatedBackground';
import LoginPage from './pages/LoginPage';
import UserInfoPage from './pages/UserInfoPage';
import GoalHomePage from './pages/GoalHomePage';
import PlanDashboardPage from './pages/PlanDashboardPage';
import PlanDetailPage from './pages/PlanDetailPage';
import ProfilePage from './pages/ProfilePage';
import AdminUserListPage from './pages/AdminUserListPage';
import AdminUserProgressPage from './pages/AdminUserProgressPage';
import AdminPlanEditorPage from './pages/AdminPlanEditorPage';
import { getCurrentUser } from './services/userService';
import './App.css';

function HomeRedirect() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin/users" replace />;
  if (!user.hasCompletedOnboarding) return <Navigate to="/user-info" replace />;
  return <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <AnimatedBackground />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user-info" element={<UserInfoPage />} />
            <Route path="/goal" element={<GoalHomePage />} />
            <Route path="/home" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PlanDashboardPage />} />
            <Route path="/workout" element={<PlanDetailPage defaultSection="workout" />} />
            <Route path="/diet" element={<PlanDetailPage defaultSection="diet" />} />
            <Route path="/cardio" element={<PlanDetailPage defaultSection="cardio" />} />
            <Route path="/plan/:goal" element={<PlanDashboardPage />} />
            <Route path="/plan/:goal/:section" element={<PlanDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
            <Route path="/admin/users" element={<AdminUserListPage />} />
            <Route path="/admin/users/:userId" element={<AdminUserProgressPage />} />
            <Route path="/admin/users/:userId/edit" element={<AdminPlanEditorPage />} />

            <Route path="*" element={<HomeRedirect />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
