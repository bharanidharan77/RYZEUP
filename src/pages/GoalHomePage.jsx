import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GoalCard from '../components/common/GoalCard';
import { getCurrentUser, selectFitnessPlan } from '../services/userService';

export default function GoalHomePage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleSelectPlan = (planKey) => {
    if (currentUser?.id) {
      selectFitnessPlan(currentUser.id, planKey);
    }
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: '780px', margin: '1rem auto', width: '100%' }}>
      {/* Step Bar Header (Matching Reference Screen 3) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => navigate('/user-info')} className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '100px', height: '6px', background: 'rgba(220, 215, 205, 0.6)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--color-primary)', borderRadius: '99px' }} />
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)' }}>Step 2 of 2</span>
        </div>
      </div>

      {/* Hero Title */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
          Choose Your Fitness Goal
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.5 }}>
          Choose the path that matches your vision. You can always change this later in your profile settings.
        </p>
      </div>

      {/* 3 Goal Cards Stack (Matching Reference Screen 3) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <GoalCard
          goalKey="cut"
          active={currentUser?.activePlan === 'cut'}
          onSelect={handleSelectPlan}
        />
        <GoalCard
          goalKey="bulk"
          active={currentUser?.activePlan === 'bulk'}
          onSelect={handleSelectPlan}
        />
        <GoalCard
          goalKey="recomp"
          active={currentUser?.activePlan === 'recomp'}
          onSelect={handleSelectPlan}
        />
      </div>
    </div>
  );
}
