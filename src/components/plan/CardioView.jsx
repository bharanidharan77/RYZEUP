import React, { useState } from 'react';
import { HeartPulse, Clock, ArrowRight, Shield, Sparkles } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import ScrollReveal from '../common/ScrollReveal';

export default function CardioView({ goalKey, planData }) {
  const [showDefaultView, setShowDefaultView] = useState(false);
  const isCustomized = planData?.isCardioAdminEdited;
  const cardio = showDefaultView ? planData.defaultCardio : planData.cardio;
  const phases = cardio.phases || planData.defaultCardio.phases;

  return (
    <div>
      {/* Cardio Overview Banner */}
      <GlassCard hoverEffect={false} style={{ padding: '2.25rem', marginBottom: '2.25rem', borderTop: `4px solid var(--${goalKey}-color)` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 107, 107, 0.15)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-red)',
              border: '1px solid rgba(255, 107, 107, 0.3)'
            }}>
              <HeartPulse size={34} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                <span className="badge badge-cut">
                  INTENSITY: {cardio.intensity || 'Moderate-High'}
                </span>
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
                    <Shield size={12} /> {showDefaultView ? 'DEFAULT CARDIO VIEW' : 'ADMIN UPDATED'}
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
                    <Sparkles size={12} /> DEFAULT CARDIO
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.9rem', margin: 0, fontWeight: 900, letterSpacing: '-0.02em' }}>{cardio.title}</h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            {isCustomized && (
              <button
                type="button"
                onClick={() => setShowDefaultView(prev => !prev)}
                className="btn-pastel-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', fontWeight: 800 }}
              >
                {showDefaultView ? 'Show Admin Customized Cardio' : 'View Default Baseline Cardio'}
              </button>
            )}

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>Total Session Time</span>
              <strong style={{ fontSize: '1.65rem', color: `var(--${goalKey}-color)`, fontWeight: 900 }}>{cardio.totalDuration}</strong>
            </div>
          </div>
        </div>

        {/* Cardio Param Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.15rem', marginBottom: '1.75rem' }}>
          <GlassCard hoverEffect={true} style={{ padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Cardio Type</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{cardio.type}</div>
          </GlassCard>
          <GlassCard hoverEffect={true} style={{ padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Target Speed</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>{cardio.avgSpeed}</div>
          </GlassCard>
          <GlassCard hoverEffect={true} style={{ padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Inclination</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-orange)', marginTop: '0.25rem' }}>{cardio.incline}</div>
          </GlassCard>
          <GlassCard hoverEffect={true} style={{ padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Intensity Level</span>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-red)', marginTop: '0.25rem' }}>{cardio.intensity}</div>
          </GlassCard>
        </div>

        {/* Coach Programming Note */}
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, padding: '0.95rem 1.15rem', background: 'rgba(0, 0, 0, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <strong style={{ color: 'var(--text-main)' }}>Coach Strategy Note:</strong> {cardio.notes}
        </p>
      </GlassCard>

      {/* THREE CARDIO PHASES: VISUAL TIMELINE */}
      <ScrollReveal delay={150}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: 800 }}>Cardio Session Timeline</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', position: 'relative' }}>
          
          {/* STEP 1: WARM-UP */}
          <GlassCard hoverEffect={true} style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 183, 3, 0.15)', color: '#d97706', border: '1px solid rgba(255, 183, 3, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem' }}>
                  01
                </div>
                <h4 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 800 }}>WARM-UP PHASE</h4>
              </div>

              <span style={{ fontSize: '0.875rem', color: 'var(--accent-orange)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}>
                <Clock size={18} /> {phases.warmup.duration}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.15rem', paddingLeft: '2.85rem', lineHeight: 1.5 }}>
              {phases.warmup.activity}
            </p>

            <div style={{ display: 'flex', gap: '1.75rem', fontSize: '0.875rem', background: 'rgba(0, 0, 0, 0.02)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-sm)', marginLeft: '2.85rem', border: '1px solid var(--border-color)' }}>
              <span>Speed: <strong style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{phases.warmup.speed}</strong></span>
              <span>Incline: <strong style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>{phases.warmup.incline}</strong></span>
            </div>
          </GlassCard>

          {/* TIMELINE CONNECTOR */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-0.35rem 0' }}>
            <div style={{ padding: '0.4rem 0.9rem', background: 'rgba(255, 107, 107, 0.15)', borderRadius: 'var(--radius-full)', color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
              <ArrowRight size={14} style={{ transform: 'rotate(90deg)' }} /> MAIN WORKOUT INTENSITY
            </div>
          </div>

          {/* STEP 2: MAIN PHASE */}
          <GlassCard hoverEffect={true} style={{ padding: '1.75rem', border: '2px solid var(--accent-red)', boxShadow: '0 8px 30px rgba(255, 107, 107, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255, 107, 107, 0.15)', color: 'var(--accent-red)', border: '1px solid rgba(255, 107, 107, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem' }}>
                  02
                </div>
                <div>
                  <span className="badge badge-cut" style={{ marginBottom: '0.25rem' }}>PEAK INTENSITY</span>
                  <h4 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 800 }}>MAIN WORKOUT PHASE</h4>
                </div>
              </div>

              <span style={{ fontSize: '0.875rem', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}>
                <Clock size={18} /> {phases.main.duration}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.15rem', paddingLeft: '2.85rem', lineHeight: 1.5 }}>
              {phases.main.activity}
            </p>

            <div style={{ display: 'flex', gap: '1.75rem', fontSize: '0.875rem', background: 'rgba(0, 0, 0, 0.02)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-sm)', marginLeft: '2.85rem', border: '1px solid var(--border-color)' }}>
              <span>Speed: <strong style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{phases.main.speed}</strong></span>
              <span>Incline: <strong style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>{phases.main.incline}</strong></span>
            </div>
          </GlassCard>

          {/* TIMELINE CONNECTOR */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '-0.35rem 0' }}>
            <div style={{ padding: '0.4rem 0.9rem', background: 'rgba(46, 196, 182, 0.15)', borderRadius: 'var(--radius-full)', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem', border: '1px solid rgba(46, 196, 182, 0.3)' }}>
              <ArrowRight size={14} style={{ transform: 'rotate(90deg)' }} /> RECOVERY & COOL-DOWN
            </div>
          </div>

          {/* STEP 3: COOL-DOWN */}
          <GlassCard hoverEffect={true} style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(46, 196, 182, 0.15)', color: 'var(--accent-emerald)', border: '1px solid rgba(46, 196, 182, 0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem' }}>
                  03
                </div>
                <h4 style={{ fontSize: '1.35rem', margin: 0, fontWeight: 800 }}>COOL-DOWN PHASE</h4>
              </div>

              <span style={{ fontSize: '0.875rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}>
                <Clock size={18} /> {phases.cooldown.duration}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.15rem', paddingLeft: '2.85rem', lineHeight: 1.5 }}>
              {phases.cooldown.activity}
            </p>

            <div style={{ display: 'flex', gap: '1.75rem', fontSize: '0.875rem', background: 'rgba(0, 0, 0, 0.02)', padding: '0.85rem 1.15rem', borderRadius: 'var(--radius-sm)', marginLeft: '2.85rem', border: '1px solid var(--border-color)' }}>
              <span>Speed: <strong style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>{phases.cooldown.speed}</strong></span>
              <span>Incline: <strong style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>{phases.cooldown.incline}</strong></span>
            </div>
          </GlassCard>

        </div>
      </ScrollReveal>
    </div>
  );
}
