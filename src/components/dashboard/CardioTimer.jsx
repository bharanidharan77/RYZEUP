import React, { useState, useEffect } from 'react';
import { HeartPulse, Check, Activity } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getUserDailyTracking, saveCardioSession, getTodayDateString, DEFAULT_CARDIO_CONFIGS } from '../../services/fitnessService';

export default function CardioTimer({ userId, planData, onUpdate }) {
  const todayStr = getTodayDateString();
  const goalKey = (planData?.meta?.goal || 'cut').toLowerCase();
  const defaultConfig = DEFAULT_CARDIO_CONFIGS[goalKey] || DEFAULT_CARDIO_CONFIGS.cut;

  const targetMinutes = planData?.cardio?.targetDurationMinutes || defaultConfig.duration;
  const inclination = planData?.cardio?.inclineValue || defaultConfig.incline;
  const speed = planData?.cardio?.speedValue || defaultConfig.speed;

  const [actualMinutesInput, setActualMinutesInput] = useState('');
  const [loggedMinutes, setLoggedMinutes] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (userId) {
      const tracking = getUserDailyTracking(userId, todayStr);
      if (tracking && tracking.cardio) {
        setLoggedMinutes(tracking.cardio.minutes || 0);
        setActualMinutesInput(tracking.cardio.minutes ? String(tracking.cardio.minutes) : '');
        setIsCompleted(!!tracking.cardio.completed || (tracking.cardio.minutes || 0) >= targetMinutes);
      }
    }
  }, [userId, todayStr, targetMinutes]);

  const handleSaveMinutes = (e) => {
    e.preventDefault();
    const mins = parseInt(actualMinutesInput) || 0;
    const completed = mins >= targetMinutes;

    saveCardioSession(userId, mins, completed, todayStr);
    setLoggedMinutes(mins);
    setIsCompleted(completed);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);

    if (onUpdate) onUpdate();
  };

  return (
    <GlassCard hoverEffect={false} style={{ padding: '1.5rem', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--pastel-baby-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartPulse size={18} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
            Today's Cardio
          </h3>
        </div>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--pastel-baby-blue-dark)', background: 'var(--pastel-baby-blue)', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
          {goalKey.toUpperCase()} CARDIO
        </span>
      </div>

      {/* Target Parameters Card */}
      <div style={{
        background: 'var(--pastel-cream)',
        padding: '1rem 1.15rem',
        borderRadius: '1rem',
        marginBottom: '1.25rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        textAlign: 'center'
      }}>
        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Target</span>
          <strong style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>{targetMinutes} min</strong>
        </div>

        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Inclination</span>
          <strong style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>{inclination}</strong>
        </div>

        <div>
          <span style={{ fontSize: '0.7rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Speed</span>
          <strong style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>{speed}</strong>
        </div>
      </div>

      {/* Actual Minutes Tracking Form */}
      <form onSubmit={handleSaveMinutes} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>
            Actual Minutes Completed:
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="number"
              min="0"
              max="180"
              placeholder="e.g. 30"
              className="glass-input"
              value={actualMinutesInput}
              onChange={(e) => setActualMinutesInput(e.target.value)}
              style={{ flex: 1, padding: '0.65rem 0.85rem', fontSize: '0.9rem', fontWeight: 700 }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-muted)' }}>minutes</span>
          </div>
        </div>

        <button type="submit" className="btn-pastel-primary" style={{ width: '100%', padding: '0.75rem', justifyContent: 'center' }}>
          {savedSuccess ? (
            <>
              <Check size={16} /> Saved!
            </>
          ) : (
            'Mark Cardio Complete'
          )}
        </button>
      </form>

      {/* Progress Ratio Display */}
      <div style={{
        marginTop: '1rem',
        paddingTop: '0.85rem',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        textAlign: 'center',
        fontSize: '0.9rem',
        fontWeight: 800,
        color: isCompleted ? 'var(--pastel-mint-dark)' : 'var(--pastel-text-dark)'
      }}>
        Progress: <span style={{ fontSize: '1.05rem' }}>{loggedMinutes} / {targetMinutes} min</span> completed
      </div>
    </GlassCard>
  );
}
