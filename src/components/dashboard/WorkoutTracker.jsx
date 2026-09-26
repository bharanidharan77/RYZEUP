import React, { useState, useEffect } from 'react';
import { Dumbbell, Check } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getUserDailyTracking, saveWorkoutPerformance, getTodayDateString } from '../../services/fitnessService';

export default function WorkoutTracker({ userId, planData, onUpdate }) {
  const todayStr = getTodayDateString();

  const daysList = planData?.workout?.['4days']?.days || planData?.workout?.['3days']?.days || [];
  const todayWorkout = daysList[0] || { dayName: 'Day 1 — Training Session', exercises: [] };

  const [exerciseLogs, setExerciseLogs] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (userId) {
      const tracking = getUserDailyTracking(userId, todayStr);
      if (tracking && tracking.workout) {
        setIsCompleted(tracking.workout.completed || false);
        setExerciseLogs(tracking.workout.exerciseLogs || {});
      }
    }
  }, [userId, todayStr]);

  const handleInputChange = (exerciseName, field, value) => {
    setExerciseLogs((prev) => ({
      ...prev,
      [exerciseName]: {
        ...prev[exerciseName],
        [field]: value
      }
    }));
  };

  const handleComplete = () => {
    setIsCompleted(true);
    saveWorkoutPerformance(userId, exerciseLogs, true, todayStr);
    if (onUpdate) onUpdate();
  };

  return (
    <GlassCard hoverEffect={false} style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <Dumbbell size={20} style={{ color: 'var(--color-primary)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.02em' }}>
            Today's Workout
          </h3>
        </div>

        {/* Exercise Checklist Items (Matching Reference Screen 4) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {todayWorkout.exercises.slice(0, 3).map((ex, idx) => {
            const log = exerciseLogs[ex.exerciseName] || {};
            const isDone = !!log.completed || isCompleted;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isDone ? 'var(--pastel-mint)' : 'var(--bg-input)',
                  border: isDone ? '1px solid rgba(56, 142, 117, 0.4)' : '1px solid var(--border-subtle)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {ex.exerciseName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {ex.sets} sets • {ex.repRange} reps
                  </div>
                </div>

                {/* Actual Sets Input & Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="number"
                    min="1"
                    className="glass-input"
                    value={log.actualSets || ex.sets}
                    onChange={(e) => handleInputChange(ex.exerciseName, 'actualSets', parseInt(e.target.value) || 0)}
                    style={{ width: '45px', padding: '0.25rem 0.4rem', fontSize: '0.82rem', textAlign: 'center' }}
                  />
                  <div
                    onClick={() => handleInputChange(ex.exerciseName, 'completed', !isDone)}
                    style={{
                      width: '22px', height: '22px', borderRadius: '6px',
                      border: isDone ? 'none' : '2px solid var(--border-subtle)',
                      background: isDone ? 'var(--bulk-color)' : '#ffffff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', cursor: 'pointer'
                    }}
                  >
                    {isDone && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Large Pill Action Button (Matching Reference Screen 4: "Mark Workout Complete") */}
      <button
        type="button"
        onClick={handleComplete}
        className="btn btn-primary"
        style={{
          width: '100%',
          padding: '0.85rem',
          fontSize: '0.95rem',
          borderRadius: 'var(--radius-pill)',
          background: isCompleted ? 'var(--color-primary-dark)' : 'var(--color-primary)'
        }}
      >
        {isCompleted ? '✓ Workout Completed' : 'Mark Workout Complete'}
      </button>
    </GlassCard>
  );
}
