import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Lock, User, AlertCircle, ArrowRight, Eye, EyeOff, Shield } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { loginUser } from '../services/userService';

export default function LoginPage() {
  const [roleMode, setRoleMode] = useState('user');
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole) => {
    setRoleMode(newRole);
    setErrorMessage('');
    if (newRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername('user');
      setPassword('password123');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = loginUser(username, password, roleMode);

    if (!res.success) {
      setErrorMessage(res.message || 'Login failed. Please check credentials.');
      return;
    }

    const user = res.user;

    if (roleMode === 'admin' || user.role === 'admin') {
      navigate('/admin/users');
      return;
    }

    if (user.hasCompletedOnboarding) {
      navigate('/dashboard');
    } else {
      navigate('/user-info');
    }
  };

  return (
    <div style={{
      maxWidth: '1080px',
      margin: '0 auto',
      width: '100%',
      minHeight: '80vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2.5rem',
      alignItems: 'center'
    }}>
      {/* LEFT SIDE: FLOATING LOGIN GLASS CARD (Matching Reference Screen 1) */}
      <GlassCard hoverEffect={false} style={{ padding: '2.75rem 2.25rem' }}>
        
        {/* Brand Logo Header */}
        <div style={{ marginBottom: '1.75rem' }}>
          <img 
            src="/ryzeup-logo.png" 
            alt="RYZEUP FITNESS" 
            style={{ 
              height: '56px', 
              width: 'auto', 
              maxHeight: '60px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
            }} 
          />
        </div>

        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.25rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
          Welcome Back
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          Stronger Habits. A Healthier You.
        </p>

        {/* DUAL ROLE PILL TOGGLE (Matching Reference Screen 1) */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.7)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '1.75rem'
        }}>
          <button
            type="button"
            onClick={() => handleRoleSwitch('user')}
            style={{
              flex: 1,
              padding: '0.6rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: roleMode === 'user' ? 'var(--color-primary)' : 'transparent',
              color: roleMode === 'user' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.25s ease'
            }}
          >
            <User size={15} /> User Login
          </button>

          <button
            type="button"
            onClick={() => handleRoleSwitch('admin')}
            style={{
              flex: 1,
              padding: '0.6rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: roleMode === 'admin' ? 'var(--color-primary-dark)' : 'transparent',
              color: roleMode === 'admin' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.25s ease'
            }}
          >
            <Shield size={15} /> Admin Login
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217, 119, 127, 0.15)',
            border: '1px solid rgba(217, 119, 127, 0.4)', color: '#d90429', padding: '0.8rem 1rem',
            borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.85rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLoginSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="glass-input" 
                placeholder={roleMode === 'admin' ? 'Email address / admin' : 'Email address / user'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', fontSize: '0.95rem', borderRadius: 'var(--radius-pill)' }}
              />
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="glass-input" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.85rem 2.75rem 0.85rem 2.75rem', fontSize: '0.95rem', borderRadius: 'var(--radius-pill)' }}
              />
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: 0 }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Pill Action Button (Matching Reference Screen 1) */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.95rem',
              fontSize: '1rem',
              borderRadius: 'var(--radius-pill)',
              background: roleMode === 'admin' ? 'var(--color-primary-dark)' : 'var(--color-primary)'
            }}
          >
            <span>Login</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          Discipline Today • A Stronger Tomorrow
        </div>
      </GlassCard>

      {/* RIGHT SIDE: ATHLETE HERO IMAGE (Matching Reference Screen 1) */}
      <div style={{
        width: '100%',
        height: '540px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'var(--shadow-glass)'
      }}>
        <img
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
          alt="RYZEUP Athlete"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(44, 58, 71, 0.6) 0%, transparent 60%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '2.5rem',
          color: '#ffffff'
        }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
            Transform Your Fitness
          </h3>
          <p style={{ fontSize: '0.95rem', opacity: 0.95, marginTop: '0.35rem', margin: 0 }}>
            Precision coaching, structured nutrition & progress tracking tailored to your vision.
          </p>
        </div>
      </div>
    </div>
  );
}
