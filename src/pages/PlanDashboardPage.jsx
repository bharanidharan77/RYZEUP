import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flame, Dumbbell, Activity, Utensils, HeartPulse, ChevronRight, Sparkles, User, RefreshCw, Quote, Check, AlertCircle, Send } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import DietTracker from '../components/dashboard/DietTracker';
import CardioTimer from '../components/dashboard/CardioTimer';
import WorkoutTracker from '../components/dashboard/WorkoutTracker';
import WorkoutCalendar from '../components/dashboard/WorkoutCalendar';
import ActivityToast from '../components/common/ActivityToast';
import { getCurrentUser } from '../services/userService';
import { getUserPlanData, getProgressHistory, getUserDailyTracking, saveDailyProgressRecord, getTodayDateString } from '../services/fitnessService';

export default function PlanDashboardPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [timeframe, setTimeframe] = useState('weekly');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [isSubmittedToday, setIsSubmittedToday] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitMessageType, setSubmitMessageType] = useState('success');

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user?.id) {
      const todayLog = getUserDailyTracking(user.id, getTodayDateString());
      if (todayLog && (todayLog.diet?.breakfast || todayLog.diet?.lunch || todayLog.diet?.dinner || todayLog.workout?.completed || (todayLog.cardio?.minutes || 0) > 0)) {
        setIsSubmittedToday(true);
      }
    }
  }, [refreshTrigger]);

  const activeGoal = (currentUser?.activePlan || 'cut').toLowerCase();
  const planData = getUserPlanData(currentUser?.id, activeGoal);
  const historyData = getProgressHistory(currentUser?.id || 'usr_cut_01', timeframe);

  const handleDataUpdated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleSubmitDailyProgress = () => {
    if (!currentUser?.id) return;
    const todayStr = getTodayDateString();
    const currentTracking = getUserDailyTracking(currentUser.id, todayStr);

    const hasAnyActivity = (currentTracking.diet?.breakfast || currentTracking.diet?.lunch || currentTracking.diet?.dinner) ||
                           currentTracking.workout?.completed ||
                           (currentTracking.cardio?.minutes || 0) > 0;

    if (!hasAnyActivity) {
      setSubmitMessageType('warning');
      setSubmitMessage('Please update at least one activity before submitting.');
      setTimeout(() => setSubmitMessage(''), 3500);
      return;
    }

    // Atomically save/update single daily record for today (prevents duplicates)
    saveDailyProgressRecord(currentUser.id, todayStr, currentTracking);
    setIsSubmittedToday(true);
    setSubmitMessageType('success');
    setSubmitMessage("Today's progress has been updated.");
    setTimeout(() => setSubmitMessage(''), 3500);

    setRefreshTrigger(prev => prev + 1);
  };

  const goalIcons = {
    cut: <Flame size={20} style={{ color: 'var(--cut-color)' }} />,
    bulk: <Dumbbell size={20} style={{ color: 'var(--bulk-color)' }} />,
    recomp: <Activity size={20} style={{ color: 'var(--recomp-color)' }} />
  };

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', width: '100%' }}>
      {/* 🌟 LARGE HERO SECTION WITH ATHLETE BACKGROUND & FLOATING "CURRENT PLAN: BULK" CARD (Matching Reference Screen 4) */}
      <div style={{
        width: '100%',
        height: '340px',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-glass)'
      }}>
        {/* Hero Background Image */}
        <img
          src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1400&q=80"
          alt="RYZEUP Fitness Hero"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Gradient Overlay & Content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(250, 248, 245, 0.95) 0%, rgba(250, 248, 245, 0.7) 45%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2.5rem 3rem'
        }}>
          <div style={{ maxWidth: '480px' }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 900, lineHeight: 1.1, color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.03em' }}>
              Consistent Actions<br />Real Results
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: 0, marginBottom: '1.25rem' }}>
              Track. Improve. Become Stronger.
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.6rem 1.1rem',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid var(--border-glass)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              <Quote size={14} style={{ color: 'var(--color-primary)' }} />
              <span>"A better you is a brighter tomorrow."</span>
            </div>
          </div>

          {/* Floating Glass Card: "Current Plan: BULK" (Matching Reference Screen 4) */}
          <Link
            to="/profile"
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              right: '3rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              padding: '0.85rem 1.4rem',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(16px)',
              border: `1.5px solid var(--${activeGoal}-color)`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              textDecoration: 'none',
              color: 'var(--text-main)',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{ padding: '0.5rem', borderRadius: '50%', background: `var(--${activeGoal}-bg)` }}>
              {goalIcons[activeGoal]}
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Current Plan</span>
              <strong style={{ fontSize: '1.15rem', fontWeight: 900, color: `var(--${activeGoal}-color)` }}>{activeGoal.toUpperCase()}</strong>
            </div>
          </Link>
        </div>
      </div>

      {/* 📊 PROGRESS OVERVIEW CARD */}
      <ProgressChart
        historyData={historyData}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
      />

      {/* 🗓️ WORKOUT CALENDAR */}
      <WorkoutCalendar userId={currentUser?.id} />

      {/* 🏋️ THREE-COLUMN TRACKER SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <DietTracker
          userId={currentUser?.id}
          planData={planData}
          onUpdate={handleDataUpdated}
        />
        <CardioTimer
          userId={currentUser?.id}
          planData={planData}
          onUpdate={handleDataUpdated}
        />
        <WorkoutTracker
          userId={currentUser?.id}
          planData={planData}
          onUpdate={handleDataUpdated}
        />
      </div>

      {/* 🚀 SINGLE SUBMIT TODAY'S PROGRESS BUTTON & SUBMISSION TOAST */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <GlassCard hoverEffect={false} style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={handleSubmitDailyProgress}
            className="btn-pastel-primary"
            style={{
              padding: '0.95rem 2.5rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: '9999px',
              background: isSubmittedToday ? 'var(--pastel-mint)' : 'linear-gradient(135deg, var(--pastel-baby-blue), var(--pastel-baby-pink))',
              color: isSubmittedToday ? 'var(--pastel-mint-dark)' : 'var(--pastel-text-dark)',
              border: isSubmittedToday ? '1.5px solid var(--pastel-mint-dark)' : '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            {isSubmittedToday ? (
              <>
                <Check size={20} /> Update Today's Progress
              </>
            ) : (
              <>
                <Send size={18} /> SUBMIT TODAY'S PROGRESS
              </>
            )}
          </button>

          <span style={{ fontSize: '0.8rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
            {isSubmittedToday ? '✓ Today\'s Progress Submitted (Click to update changes)' : 'Saves your complete daily workout, diet & cardio performance'}
          </span>

          {/* Submission Feedback Toast */}
          {submitMessage && (
            <div style={{
              marginTop: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.88rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: submitMessageType === 'warning' ? 'var(--pastel-baby-pink)' : 'var(--pastel-mint)',
              color: submitMessageType === 'warning' ? 'var(--pastel-baby-pink-dark)' : 'var(--pastel-mint-dark)',
              border: submitMessageType === 'warning' ? '1px solid rgba(247, 178, 198, 0.8)' : '1px solid rgba(116, 198, 157, 0.8)',
              animation: 'fadeIn 0.3s ease'
            }}>
              {submitMessageType === 'warning' ? <AlertCircle size={16} /> : <Check size={16} />}
              {submitMessage}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Activity Reminder Toast for user */}
      <ActivityToast />

      {/* 📖 PLAN DETAILS HORIZONTAL CARDS (Matching Reference Screen 4 Bottom Section) */}
      <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '1.15rem', letterSpacing: '-0.02em' }}>
        Plan Details
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* View Workout Plan */}
        <Link to="/workout" style={{ textDecoration: 'none' }}>
          <GlassCard hoverEffect={true} style={{ padding: '1.35rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--pastel-mint)', color: 'var(--bulk-color)' }}>
                <Dumbbell size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>View Workout Plan</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Exercises, sets, reps and instructions</span>
              </div>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--text-dim)' }} />
          </GlassCard>
        </Link>

        {/* View Diet Plan */}
        <Link to="/diet" style={{ textDecoration: 'none' }}>
          <GlassCard hoverEffect={true} style={{ padding: '1.35rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--pastel-baby-pink)', color: 'var(--cut-color)' }}>
                <Utensils size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>View Diet Plan</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Meals, nutrition and macro split</span>
              </div>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--text-dim)' }} />
          </GlassCard>
        </Link>

        {/* View Cardio Plan */}
        <Link to="/cardio" style={{ textDecoration: 'none' }}>
          <GlassCard hoverEffect={true} style={{ padding: '1.35rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', background: 'var(--pastel-baby-blue)', color: 'var(--color-primary)' }}>
                <HeartPulse size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>View Cardio Plan</h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cardio guide and workout schedule</span>
              </div>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--text-dim)' }} />
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
