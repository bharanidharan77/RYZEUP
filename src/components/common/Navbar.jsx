import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, User, Shield, LogOut, Bell, Home, Utensils, HeartPulse } from 'lucide-react';
import { getCurrentUser, logoutUser } from '../../services/userService';
import AdminNotifications from '../admin/AdminNotifications';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [showAdminNotifications, setShowAdminNotifications] = useState(false);

  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.role === 'admin' || path.startsWith('/admin');
  const isLoginRoute = path === '/login';

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : 'Athlete';

  return (
    <>
      {/* Top Header Navbar */}
      <header className="navbar">
        {/* Brand Logo */}
        <Link to={isAdmin ? '/admin/users' : '/dashboard'} className="logo" title="RYZEUP FITNESS" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/ryzeup-logo.png" 
            alt="RYZEUP FITNESS" 
            style={{ 
              height: '42px', 
              width: 'auto', 
              maxHeight: '44px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.08))',
              transition: 'transform 0.25s ease'
            }} 
          />
        </Link>

        {/* Center Pill Navigation Bar */}
        {!isLoginRoute && (
          <nav className="nav-pill-container desktop-only">
            {!isAdmin ? (
              <>
                <Link to="/dashboard" className={`nav-pill-link ${path === '/dashboard' || path === '/home' ? 'active' : ''}`}>
                  <Home size={15} />
                  <span>Dashboard</span>
                </Link>

                <Link to="/workout" className={`nav-pill-link ${path.includes('/workout') ? 'active' : ''}`}>
                  <Dumbbell size={15} />
                  <span>Workout</span>
                </Link>

                <Link to="/diet" className={`nav-pill-link ${path.includes('/diet') ? 'active' : ''}`}>
                  <Utensils size={15} />
                  <span>Diet</span>
                </Link>

                <Link to="/cardio" className={`nav-pill-link ${path.includes('/cardio') ? 'active' : ''}`}>
                  <HeartPulse size={15} />
                  <span>Cardio</span>
                </Link>
              </>
            ) : (
              <Link to="/admin/users" className={`nav-pill-link ${path.startsWith('/admin') ? 'active' : ''}`}>
                <Shield size={15} />
                <span>Admin Users</span>
              </Link>
            )}
          </nav>
        )}

        {/* Right User Controls & Profile Badge */}
        {!isLoginRoute ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
            <button
              type="button"
              onClick={() => setShowAdminNotifications(prev => !prev)}
              className="btn btn-ghost"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                padding: 0,
                color: showAdminNotifications ? 'var(--pastel-peach-dark)' : 'var(--text-secondary)',
                background: showAdminNotifications ? 'var(--pastel-peach)' : 'transparent'
              }}
              title="Notifications"
            >
              <Bell size={18} />
            </button>

            {showAdminNotifications && (
              <AdminNotifications onClose={() => setShowAdminNotifications(false)} />
            )}

            {/* User Avatar & Greeting Pill */}
            {!isAdmin && (
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.85rem 0.35rem 0.4rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  color: 'var(--text-main)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.8rem'
                }}>
                  {userName.charAt(0)}
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Hi, {userName}</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-ghost btn-sm"
              title="Logout"
              style={{ borderRadius: 'var(--radius-pill)' }}
            >
              <LogOut size={16} />
              <span className="desktop-only">Logout</span>
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm">
            <span>Login</span>
          </Link>
        )}
      </header>

      {/* Fixed Mobile Bottom Navigation Bar Dock */}
      {!isLoginRoute && !isAdmin && (
        <nav className="mobile-bottom-nav mobile-only">
          <Link to="/dashboard" className={`mobile-nav-item ${path === '/dashboard' || path === '/home' ? 'active' : ''}`}>
            <Home size={20} />
            <span>Dashboard</span>
          </Link>

          <Link to="/workout" className={`mobile-nav-item ${path.includes('/workout') ? 'active' : ''}`}>
            <Dumbbell size={20} />
            <span>Workout</span>
          </Link>

          <Link to="/diet" className={`mobile-nav-item ${path.includes('/diet') ? 'active' : ''}`}>
            <Utensils size={20} />
            <span>Diet</span>
          </Link>

          <Link to="/cardio" className={`mobile-nav-item ${path.includes('/cardio') ? 'active' : ''}`}>
            <HeartPulse size={20} />
            <span>Cardio</span>
          </Link>

          <Link to="/profile" className={`mobile-nav-item ${path === '/profile' ? 'active' : ''}`}>
            <User size={20} />
            <span>Profile</span>
          </Link>
        </nav>
      )}
    </>
  );
}
