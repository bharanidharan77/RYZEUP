import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Dumbbell, Utensils, HeartPulse, Sparkles } from 'lucide-react';
import WorkoutView from '../components/plan/WorkoutView';
import DietView from '../components/plan/DietView';
import CardioView from '../components/plan/CardioView';
import GlassCard from '../components/common/GlassCard';
import { getCurrentUser } from '../services/userService';
import { getUserPlanData } from '../services/fitnessService';

export default function PlanDetailPage({ defaultSection }) {
  const { goal, section } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const activeUserGoal = (currentUser?.activePlan || 'cut').toLowerCase();
  const goalKey = (goal || activeUserGoal).toLowerCase();
  const sectionKey = (defaultSection || section || 'workout').toLowerCase();

  const planData = getUserPlanData(currentUser?.id, goalKey);

  const sectionTitles = {
    workout: `${goalKey.toUpperCase()} WORKOUT SYSTEM`,
    diet: `${goalKey.toUpperCase()} DIET & NUTRITION PLAN`,
    cardio: `${goalKey.toUpperCase()} CARDIO SYSTEM`
  };

  const getSectionIcon = () => {
    switch (sectionKey) {
      case 'diet':
        return <Utensils size={34} style={{ color: 'var(--accent-orange)' }} />;
      case 'cardio':
        return <HeartPulse size={34} style={{ color: 'var(--accent-red)' }} />;
      case 'workout':
      default:
        return <Dumbbell size={34} style={{ color: `var(--${goalKey}-color)` }} />;
    }
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto 3rem auto', width: '100%' }}>
      {/* Top Navigation */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/dashboard')} className="btn-pastel-secondary">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <span className={`goal-pill goal-pill-${goalKey}`}>
          <Sparkles size={14} /> GOAL: {goalKey.toUpperCase()}
        </span>
      </div>

      {/* Module Header Title Banner */}
      <div className="glass-card" style={{ padding: '2rem 2.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: 'var(--pastel-cream)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
          }}>
            {getSectionIcon()}
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
              {sectionTitles[sectionKey] || `${goalKey.toUpperCase()} PLAN`}
            </h1>
            <p style={{ color: 'var(--pastel-text-muted)', fontSize: '0.9rem', margin: 0, marginTop: '0.25rem', fontWeight: 600 }}>
              {planData.meta?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Render Dynamic Section View Component */}
      {sectionKey === 'workout' && <WorkoutView goalKey={goalKey} planData={planData} />}
      {sectionKey === 'diet' && <DietView goalKey={goalKey} planData={planData} />}
      {sectionKey === 'cardio' && <CardioView goalKey={goalKey} planData={planData} />}
    </div>
  );
}
