import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Shield, ChevronRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getAllUsers } from '../../services/userService';
import { getUserDailySummary, getTodayDateString } from '../../services/fitnessService';

export default function AdminNotifications({ onClose }) {
  const navigate = useNavigate();
  const todayStr = getTodayDateString();
  const users = getAllUsers();

  const notifications = users.map(user => {
    const summary = getUserDailySummary(user.id, todayStr);
    let message = '';
    let badgeColor = 'var(--pastel-mint-dark)';
    let badgeBg = 'var(--pastel-mint)';

    if (summary.count === 3) {
      message = `${user.name} completed all 3 activities today.`;
    } else if (summary.count === 2) {
      const missedStr = summary.missedCategories.join(', ');
      message = `${user.name} has completed 2/3 activities today — missed ${missedStr}.`;
      badgeColor = 'var(--pastel-peach-dark)';
      badgeBg = 'var(--pastel-peach)';
    } else if (summary.count === 1) {
      const missedStr = summary.missedCategories.join(' and ');
      message = `${user.name} completed 1/3 activities today — missed ${missedStr}.`;
      badgeColor = 'var(--pastel-baby-pink-dark)';
      badgeBg = 'var(--pastel-baby-pink)';
    } else {
      message = `${user.name} has no activity recorded today.`;
      badgeColor = 'var(--pastel-baby-pink-dark)';
      badgeBg = 'var(--pastel-baby-pink)';
    }

    return {
      userId: user.id,
      name: user.name,
      count: summary.count,
      message,
      badgeColor,
      badgeBg
    };
  });

  const handleUserClick = (userId) => {
    if (onClose) onClose();
    navigate(`/admin/users/${userId}`);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 0.5rem)',
      right: 0,
      width: '360px',
      maxWidth: '90vw',
      zIndex: 10000,
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '1.25rem',
      padding: '1.25rem',
      boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
      animation: 'slideDownNav 0.25s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={18} style={{ color: 'var(--pastel-peach-dark)' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
            Athlete Daily Progress Activity
          </h4>
        </div>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--pastel-text-muted)', background: 'var(--pastel-cream)', padding: '0.2rem 0.5rem', borderRadius: '9999px' }}>
          {todayStr}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '380px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: 'var(--pastel-text-muted)', textAlign: 'center', margin: '1rem 0' }}>No athletes found.</p>
        ) : (
          notifications.map(n => (
            <div
              key={n.userId}
              onClick={() => handleUserClick(n.userId)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '0.75rem 0.85rem',
                borderRadius: '0.85rem',
                background: 'rgba(250, 248, 245, 0.8)',
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', flex: 1 }}>
                <span style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  background: n.badgeBg,
                  color: n.badgeColor,
                  flexShrink: 0,
                  marginTop: '0.1rem'
                }}>
                  {n.count}/3
                </span>
                <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: 700, color: 'var(--pastel-text-dark)', lineHeight: 1.35 }}>
                  {n.message}
                </p>
              </div>

              <ChevronRight size={16} style={{ color: 'var(--pastel-text-muted)', flexShrink: 0, marginLeft: '0.5rem' }} />
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes slideDownNav {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
