import React, { useState } from 'react';
import { Flame, Dumbbell, Activity, RefreshCw, AlertTriangle, Check } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { updateActivePlan } from '../../services/userService';

export default function PlanSwitcher({ user, onPlanChanged }) {
  const currentPlan = (user?.activePlan || 'cut').toLowerCase();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    { key: 'cut', title: 'CUT PLAN', icon: <Flame size={18} />, color: 'var(--cut-color)', desc: 'Fat Loss & Muscle Retention' },
    { key: 'bulk', title: 'BULK PLAN', icon: <Dumbbell size={18} />, color: 'var(--bulk-color)', desc: 'Muscle Growth & Caloric Surplus' },
    { key: 'recomp', title: 'RECOMP PLAN', icon: <Activity size={18} />, color: 'var(--recomp-color)', desc: 'Simultaneous Muscle Gain & Fat Loss' }
  ];

  const handleOpenConfirm = (planKey) => {
    if (planKey === currentPlan) return;
    setSelectedPlan(planKey);
    setIsModalOpen(true);
  };

  const handleConfirmChange = () => {
    if (selectedPlan && user?.id) {
      updateActivePlan(user.id, selectedPlan);
      setIsModalOpen(false);
      if (onPlanChanged) onPlanChanged(selectedPlan);
    }
  };

  return (
    <GlassCard hoverEffect={false} style={{ padding: '1.75rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
        <RefreshCw size={20} style={{ color: 'var(--color-primary)' }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', margin: 0 }}>Change Fitness Plan</h3>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
        Switch your active coaching protocol below. Changing active plan updates your workout split, macros & cardio without losing historical progress.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {plans.map((p) => {
          const isActive = p.key === currentPlan;
          return (
            <div
              key={p.key}
              onClick={() => handleOpenConfirm(p.key)}
              style={{
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
                background: isActive ? 'var(--color-primary-tint)' : 'var(--bg-input)',
                border: isActive ? `2px solid ${p.color}` : '1px solid var(--border-subtle)',
                cursor: isActive ? 'default' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: p.color }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: p.color }}>{p.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.desc}</div>
                </div>
              </div>

              {isActive && (
                <span className="badge badge-cut" style={{ fontSize: '0.7rem' }}>
                  <Check size={10} style={{ marginRight: '0.2rem' }} /> Active
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(30, 41, 34, 0.65)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          zIndex: 100,
          padding: '1rem'
        }}>
          <GlassCard style={{ maxWidth: '440px', width: '100%', padding: '2rem', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', padding: '1rem', background: 'var(--color-primary-tint)',
              borderRadius: '50%', color: 'var(--color-primary)', marginBottom: '1rem'
            }}>
              <AlertTriangle size={32} />
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Change Fitness Plan?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.5 }}>
              Are you sure you want to change your active fitness plan from <strong>{currentPlan.toUpperCase()}</strong> to <strong>{selectedPlan?.toUpperCase()}</strong>?
            </p>

            <div style={{ display: 'flex', gap: '0.85rem' }}>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmChange}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.75rem' }}
              >
                Confirm Change
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </GlassCard>
  );
}
