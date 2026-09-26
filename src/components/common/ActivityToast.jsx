import React, { useState, useEffect } from 'react';
import { X, Utensils, Dumbbell, HeartPulse, Sparkles } from 'lucide-react';
import { getCurrentUser } from '../../services/userService';
import { getUserDailyTracking, getTodayDateString } from '../../services/fitnessService';

export default function ActivityToast() {
  const [toast, setToast] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role === 'admin') return;

    // Check if toast was already dismissed this session
    const isDismissed = sessionStorage.getItem('ryzeup_toast_dismissed');
    if (isDismissed) return;

    const todayStr = getTodayDateString();
    const tracking = getUserDailyTracking(user.id, todayStr);

    const now = new Date();
    const currentHour = now.getHours();

    let reminder = null;

    // Smart contextual prompt selection
    if (!tracking.diet?.breakfast && currentHour < 12) {
      reminder = {
        message: 'Done eating breakfast? Update it in RYZEUP.',
        icon: <Utensils size={18} style={{ color: 'var(--pastel-peach-dark)' }} />,
        badgeBg: 'var(--pastel-peach)',
        badgeColor: 'var(--pastel-peach-dark)'
      };
    } else if (!tracking.diet?.lunch && currentHour >= 12 && currentHour < 16) {
      reminder = {
        message: 'Done eating lunch? Update it in RYZEUP.',
        icon: <Utensils size={18} style={{ color: 'var(--pastel-mint-dark)' }} />,
        badgeBg: 'var(--pastel-mint)',
        badgeColor: 'var(--pastel-mint-dark)'
      };
    } else if (!tracking.diet?.dinner && currentHour >= 17) {
      reminder = {
        message: 'Done eating dinner? Update it in RYZEUP.',
        icon: <Utensils size={18} style={{ color: 'var(--pastel-baby-pink-dark)' }} />,
        badgeBg: 'var(--pastel-baby-pink)',
        badgeColor: 'var(--pastel-baby-pink-dark)'
      };
    } else if (!tracking.workout?.completed) {
      reminder = {
        message: 'Done workout for the day? Update it in RYZEUP.',
        icon: <Dumbbell size={18} style={{ color: 'var(--pastel-baby-blue-dark)' }} />,
        badgeBg: 'var(--pastel-baby-blue)',
        badgeColor: 'var(--pastel-baby-blue-dark)'
      };
    } else if (!tracking.cardio?.completed && (tracking.cardio?.minutes || 0) === 0) {
      reminder = {
        message: 'Done cardio for the day? Update it in RYZEUP.',
        icon: <HeartPulse size={18} style={{ color: 'var(--pastel-lavender-dark)' }} />,
        badgeBg: 'var(--pastel-lavender)',
        badgeColor: 'var(--pastel-lavender-dark)'
      };
    }

    if (reminder) {
      // Delay toast presentation slightly for seamless page entry
      const timer = setTimeout(() => {
        setToast(reminder);
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('ryzeup_toast_dismissed', 'true');
    setTimeout(() => setToast(null), 300);
  };

  if (!toast || !isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      maxWidth: '360px',
      width: 'calc(100% - 3rem)',
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: '1.25rem',
      padding: '0.9rem 1.15rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      animation: 'slideUpToast 0.4s ease'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: toast.badgeBg,
        display: 'flex',
        alignItems: 'center',
        justify: 'center',
        flexShrink: 0
      }}>
        {toast.icon}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: toast.badgeColor, textTransform: 'uppercase', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Sparkles size={11} /> DAILY REMINDER
        </div>
        <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-dark)', lineHeight: 1.3 }}>
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--pastel-text-muted)',
          cursor: 'pointer',
          padding: '0.25rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justify: 'center'
        }}
        title="Dismiss"
      >
        <X size={16} />
      </button>

      <style>{`
        @keyframes slideUpToast {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
