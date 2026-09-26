import React, { useState } from 'react';
import { Dumbbell, Calendar, Info, Play, Image as ImageIcon, Sparkles, Shield, CheckCircle2 } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import ScrollReveal from '../common/ScrollReveal';

export default function WorkoutView({ goalKey, planData }) {
  const [selectedFreq, setSelectedFreq] = useState('4days');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeMediaModal, setActiveMediaModal] = useState(null);
  const [showDefaultView, setShowDefaultView] = useState(false);

  const adminWorkoutObj = planData?.workout?.adminEditedWorkout;
  const isCustomized = !!adminWorkoutObj || planData?.isWorkoutAdminEdited;

  const frequencies = [
    { key: '2days', label: '2 DAYS / WEEK' },
    { key: '3days', label: '3 DAYS / WEEK' },
    { key: '4days', label: '4 DAYS / WEEK' },
    { key: '5days', label: '5 DAYS / WEEK' },
    { key: '6days', label: '6 DAYS / WEEK' }
  ];

  const programObj = planData.workout[selectedFreq] || planData.workout['4days'] || { summary: {}, days: [] };
  const summary = programObj.summary || {};
  const workoutsForFreq = programObj.days || [];
  const currentDay = workoutsForFreq[selectedDayIndex] || workoutsForFreq[0] || null;

  const btnClassMap = {
    cut: 'btn-cut',
    bulk: 'btn-bulk',
    recomp: 'btn-recomp'
  };

  return (
    <div>
      {/* Top Banner with Version Indicator & Dual View Toggle */}
      <GlassCard hoverEffect={false} style={{ padding: '1.5rem 2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--pastel-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Dumbbell size={22} style={{ color: 'var(--pastel-mint-dark)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
                  WORKOUT PROTOCOL ({goalKey.toUpperCase()})
                </h3>

                {isCustomized ? (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background: 'var(--pastel-lavender)',
                    color: 'var(--pastel-lavender-dark)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}>
                    <Shield size={12} /> ADMIN UPDATED
                  </span>
                ) : (
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    background: 'var(--pastel-cream)',
                    color: 'var(--pastel-text-muted)',
                    padding: '0.2rem 0.65rem',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <Sparkles size={12} /> DEFAULT WORKOUT
                  </span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
                {isCustomized && !showDefaultView
                  ? `Customized multi-day workout split assigned by Head Coach Admin`
                  : `Scientific progressive overload split for ${goalKey.toUpperCase()} goal`}
              </p>
            </div>
          </div>

          {isCustomized && (
            <button
              type="button"
              onClick={() => setShowDefaultView(prev => !prev)}
              className="btn-pastel-secondary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', fontWeight: 800 }}
            >
              {showDefaultView ? 'Show Admin Customized Workout' : 'View Default Baseline Workout'}
            </button>
          )}
        </div>
      </GlassCard>

      {/* RENDER ADMIN CUSTOMIZED WORKOUT IF ACTIVE */}
      {isCustomized && !showDefaultView && adminWorkoutObj ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginBottom: '2.5rem' }}>
          <div style={{ background: 'var(--pastel-lavender)', padding: '1rem 1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, color: 'var(--pastel-lavender-dark)' }}>
              <Shield size={18} /> Admin Customized {adminWorkoutObj.daysPerWeek}-Day Split
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-lavender-dark)' }}>
              {adminWorkoutObj.days?.length || 0} Scheduled Days
            </span>
          </div>

          {adminWorkoutObj.days?.map((day) => (
            <GlassCard key={day.id || day.dayNumber} hoverEffect={false} style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ background: 'var(--pastel-mint)', color: 'var(--pastel-mint-dark)', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 900 }}>
                    DAY {day.dayNumber}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
                    {day.dayName}
                  </h3>
                </div>

                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-muted)' }}>
                  {day.workouts?.length || 0} Exercises
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {day.workouts?.map((ex, exIdx) => (
                  <div key={ex.id || exIdx} style={{ background: 'var(--pastel-cream)', padding: '1rem 1.15rem', borderRadius: '1rem', border: '1px solid rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <strong style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                        {ex.name}
                      </strong>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, background: 'var(--pastel-baby-blue)', color: 'var(--pastel-baby-blue-dark)', padding: '0.15rem 0.55rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
                        {ex.muscleGroup || 'Chest'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-muted)', display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <span>Sets: <strong style={{ color: 'var(--pastel-text-dark)' }}>{ex.sets}</strong></span>
                      <span>Reps: <strong style={{ color: 'var(--pastel-text-dark)' }}>{ex.reps}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        /* DEFAULT WORKOUT PROGRAM SPLIT */
        <>
          {/* Frequency Selector Tabs */}
          <GlassCard hoverEffect={false} style={{ padding: '1.75rem 2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.15rem' }}>
              <Calendar size={22} style={{ color: `var(--${goalKey}-color)` }} />
              <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800 }}>Select Training Frequency</h3>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {frequencies.map((freq) => (
                <button
                  key={freq.key}
                  onClick={() => {
                    setSelectedFreq(freq.key);
                    setSelectedDayIndex(0);
                  }}
                  className={`btn ${selectedFreq === freq.key ? (btnClassMap[goalKey] || 'btn-primary') : 'btn-outline'}`}
                  style={{ padding: '0.7rem 1.25rem', fontSize: '0.85rem', flex: '1 1 130px' }}
                >
                  {freq.label}
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Program Summary Header Banner */}
          {summary.goal && (
            <ScrollReveal delay={100}>
              <GlassCard hoverEffect={false} style={{ padding: '1.85rem 2rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.35rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ padding: '0.75rem', background: `var(--${goalKey}-bg)`, borderRadius: 'var(--radius-md)', color: `var(--${goalKey}-color)`, border: `1px solid var(--${goalKey}-border)` }}>
                      <Sparkles size={26} />
                    </div>
                    <div>
                      <span className={`badge badge-${goalKey}`}>
                        {summary.goal} • {summary.frequency}
                      </span>
                      <h3 style={{ fontSize: '1.45rem', fontWeight: 800, margin: '0.25rem 0 0 0' }}>{summary.focus}</h3>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Weekly Volume: <strong style={{ color: 'var(--text-main)', fontWeight: 700 }}>{summary.weeklyVolume}</strong>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <GlassCard hoverEffect={true} style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Intensity & Load</span>
                    <div style={{ fontSize: '0.925rem', fontWeight: 800, color: `var(--${goalKey}-color)`, marginTop: '0.2rem' }}>{summary.intensity}</div>
                  </GlassCard>

                  <GlassCard hoverEffect={true} style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Rep Range Target</span>
                    <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--accent-orange)', marginTop: '0.2rem' }}>{summary.repPhilosophy}</div>
                  </GlassCard>

                  <GlassCard hoverEffect={true} style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Rest Recovery</span>
                    <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>{summary.restPhilosophy}</div>
                  </GlassCard>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, padding: '0.75rem 1rem', background: 'rgba(0, 0, 0, 0.02)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <strong style={{ color: 'var(--text-main)' }}>Progressive Overload Rule:</strong> {summary.progressiveOverload}
                </p>
              </GlassCard>
            </ScrollReveal>
          )}

          {/* Day Navigation & Exercise List */}
          {workoutsForFreq.length > 0 && (
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {workoutsForFreq.map((day, dIdx) => (
                  <button
                    key={dIdx}
                    onClick={() => setSelectedDayIndex(dIdx)}
                    style={{
                      padding: '0.75rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: selectedDayIndex === dIdx ? `2px solid var(--${goalKey}-color)` : '1px solid var(--border-subtle)',
                      background: selectedDayIndex === dIdx ? `var(--${goalKey}-bg)` : 'var(--bg-glass)',
                      color: selectedDayIndex === dIdx ? `var(--${goalKey}-color)` : 'var(--text-main)',
                      fontWeight: 800,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Day {day.dayNumber}
                  </button>
                ))}
              </div>

              {currentDay && (
                <GlassCard hoverEffect={false} style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '0.35rem' }}>{currentDay.dayName}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.5rem', fontWeight: 600 }}>
                    Target Muscles: {currentDay.muscles}
                  </span>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                    {currentDay.exercises?.map((ex, eIdx) => (
                      <div key={eIdx} style={{ background: 'var(--pastel-cream)', padding: '1.15rem 1.35rem', borderRadius: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <strong style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', display: 'block' }}>
                            {ex.exerciseName}
                          </strong>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            Target: {ex.targetMuscle} • {ex.sets} Sets x {ex.repRange} Reps • Rest: {ex.restSeconds}s
                          </span>
                        </div>

                        <span style={{ fontSize: '0.78rem', fontWeight: 800, background: 'var(--pastel-mint)', color: 'var(--pastel-mint-dark)', padding: '0.3rem 0.75rem', borderRadius: '9999px' }}>
                          {ex.intensity || '1-2 RIR'}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
