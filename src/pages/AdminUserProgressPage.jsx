import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Edit, Dumbbell, Utensils, HeartPulse, Shield, Sparkles, Activity } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import WorkoutCalendar from '../components/dashboard/WorkoutCalendar';
import { getUserById } from '../services/userService';
import { getUserPlanData, getProgressHistory } from '../services/fitnessService';

export default function AdminUserProgressPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('weekly');

  const user = getUserById(userId);

  if (!user) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
        <GlassCard style={{ padding: '3rem' }}>
          <h2>User Not Found</h2>
          <p style={{ color: 'var(--text-muted)' }}>The requested user account ID does not exist.</p>
          <button onClick={() => navigate('/admin/users')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to User List
          </button>
        </GlassCard>
      </div>
    );
  }

  const goalKey = (user.activePlan || 'cut').toLowerCase();
  const planData = getUserPlanData(user.id, goalKey);
  const historyData = getProgressHistory(user.id, timeframe);

  // Compute average metrics for stats summary
  const avgWorkout = Math.round(historyData.reduce((acc, h) => acc + h.workout, 0) / historyData.length);
  const avgDiet = Math.round(historyData.reduce((acc, h) => acc + h.diet, 0) / historyData.length);
  const avgCardio = Math.round(historyData.reduce((acc, h) => acc + h.cardio, 0) / historyData.length);

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto 3rem auto', width: '100%' }}>
      {/* Navigation Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={() => navigate('/admin/users')} className="btn-pastel-secondary">
          <ArrowLeft size={16} /> Back to User Control Center
        </button>

        {/* Edit User Plan Action Button */}
        <Link to={`/admin/users/${user.id}/edit`} className="btn-pastel-primary">
          <Edit size={16} /> Edit {user.name}'s Plan
        </Link>
      </div>

      {/* User Profile Summary Card */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--pastel-baby-blue), var(--pastel-baby-pink))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
            }}>
              <User size={28} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
            </div>

            <div>
              <span className={`goal-pill goal-pill-${goalKey}`} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', marginBottom: '0.35rem', display: 'inline-flex' }}>
                <Sparkles size={12} /> {goalKey.toUpperCase()} PROTOCOL
              </span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
                {user.name}
              </h1>
              <p style={{ color: 'var(--pastel-text-muted)', fontSize: '0.85rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>
                {user.email} • Age: {user.personalInfo?.age || '28'} • {user.personalInfo?.gender || 'Male'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ background: 'var(--pastel-cream)', padding: '0.6rem 1.15rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Weight</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                {user.bodyMeasurements?.weight ? `${user.bodyMeasurements.weight} kg` : 'N/A'}
              </div>
            </div>

            <div style={{ background: 'var(--pastel-cream)', padding: '0.6rem 1.15rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Height</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                {user.bodyMeasurements?.height ? `${user.bodyMeasurements.height} cm` : 'N/A'}
              </div>
            </div>
          </div>
        </div>

        {/* Injury / Notes Banner */}
        {user.personalInfo?.disabilityOrInjury && (
          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid rgba(0,0,0,0.05)', fontSize: '0.85rem', color: 'var(--pastel-peach-dark)', fontWeight: 600 }}>
            <strong>Disability / Injury Notes:</strong> {user.personalInfo.disabilityOrInjury}
          </div>
        )}
      </GlassCard>

      {/* 📊 INTERACTIVE PROGRESS GRAPH FOR SELECTED USER */}
      <ProgressChart
        historyData={historyData}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* 🗓️ ADMIN WORKOUT CALENDAR FOR SELECTED USER */}
      <WorkoutCalendar userId={user.id} />

      {/* CONSISTENCY STATS BREAKDOWN */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginBottom: '1.15rem', marginTop: '2rem' }}>Consistency & Performance Breakdown</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        
        {/* WORKOUT CONSISTENCY */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Dumbbell size={18} style={{ color: 'var(--pastel-mint-dark)' }} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>Workout Progress</h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>Sets & Reps Consistency</span>
            </div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-mint-dark)', marginBottom: '0.4rem' }}>
            {avgWorkout}%
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--pastel-text-muted)', margin: 0, fontWeight: 600 }}>
            Average workout completion rate over the selected timeframe.
          </p>
        </div>

        {/* DIET CONSISTENCY */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-peach)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Utensils size={18} style={{ color: 'var(--pastel-peach-dark)' }} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>Diet Progress</h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>Meal Checklist Adherence</span>
            </div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-peach-dark)', marginBottom: '0.4rem' }}>
            {avgDiet}%
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--pastel-text-muted)', margin: 0, fontWeight: 600 }}>
            Breakfast, Lunch & Dinner tracking compliance rate.
          </p>
        </div>

        {/* CARDIO CONSISTENCY */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-baby-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse size={18} style={{ color: 'var(--pastel-baby-pink-dark)' }} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>Cardio Progress</h4>
              <span style={{ fontSize: '0.78rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>Session Completion</span>
            </div>
          </div>

          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-baby-pink-dark)', marginBottom: '0.4rem' }}>
            {avgCardio}%
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--pastel-text-muted)', margin: 0, fontWeight: 600 }}>
            Cardio timer and duration targets completion score.
          </p>
        </div>

      </div>
    </div>
  );
}
