import React, { useState } from 'react';
import { Activity, Dumbbell, Utensils, HeartPulse } from 'lucide-react';
import GlassCard from '../common/GlassCard';

export default function ProgressChart({ historyData = [], timeframe = 'weekly', onTimeframeChange }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!historyData || historyData.length === 0) {
    return (
      <GlassCard style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--pastel-text-muted)', fontWeight: 600 }}>No progress data recorded yet.</p>
      </GlassCard>
    );
  }

  const totalDays = historyData.length;

  // Compute summary stats from actual history records
  const workoutDaysDone = historyData.filter(d => d.workout >= 50 || d.completedWorkout).length;
  const dietDaysDone = historyData.filter(d => d.diet >= 60 || d.completedDiet).length;
  const cardioDaysDone = historyData.filter(d => d.cardio >= 50 || d.completedCardio).length;

  const avgOverall = Math.round(
    historyData.reduce((sum, d) => sum + (d.overall || 0), 0) / Math.max(1, totalDays)
  );

  // SVG dimensions & padding for readable chart
  const svgWidth = 600;
  const svgHeight = 240;
  const paddingX = 50;
  const paddingY = 30;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  const getX = (index) => paddingX + (index / Math.max(1, totalDays - 1)) * chartWidth;
  const getY = (val) => svgHeight - paddingY - (val / 100) * chartHeight;

  const generatePath = (key) => {
    return historyData.map((d, i) => `${getX(i)},${getY(d[key] || 0)}`).join(' ');
  };

  const workoutPath = generatePath('workout');
  const dietPath = generatePath('diet');
  const cardioPath = generatePath('cardio');

  return (
    <GlassCard hoverEffect={false} style={{ padding: '1.75rem 2rem', marginBottom: '2rem' }}>
      {/* Header & Weekly / Monthly Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
            Progress Overview
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
            Track your daily activity ({timeframe === 'weekly' ? 'This Week' : 'This Month'})
          </span>
        </div>

        {/* Timeframe Toggle Buttons */}
        <div style={{ display: 'flex', background: 'var(--pastel-cream)', padding: '0.25rem', borderRadius: '9999px', border: '1px solid rgba(0,0,0,0.05)' }}>
          <button
            type="button"
            onClick={() => onTimeframeChange && onTimeframeChange('weekly')}
            style={{
              padding: '0.35rem 1.15rem',
              fontSize: '0.82rem',
              fontWeight: 800,
              borderRadius: '9999px',
              border: 'none',
              background: timeframe === 'weekly' ? 'var(--pastel-baby-blue-dark)' : 'transparent',
              color: timeframe === 'weekly' ? '#ffffff' : 'var(--pastel-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => onTimeframeChange && onTimeframeChange('monthly')}
            style={{
              padding: '0.35rem 1.15rem',
              fontSize: '0.82rem',
              fontWeight: 800,
              borderRadius: '9999px',
              border: 'none',
              background: timeframe === 'monthly' ? 'var(--pastel-baby-blue-dark)' : 'transparent',
              color: timeframe === 'monthly' ? '#ffffff' : 'var(--pastel-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* BEGINNER SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
        <div style={{ background: 'var(--pastel-mint)', padding: '1rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(15, 118, 110, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#0f766e', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>WORKOUT</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f766e', marginTop: '0.2rem' }}>
            {workoutDaysDone} / {totalDays} <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>days</span>
          </div>
        </div>

        <div style={{ background: 'var(--pastel-peach)', padding: '1rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(194, 65, 12, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#c2410c', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>DIET</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#c2410c', marginTop: '0.2rem' }}>
            {dietDaysDone} / {totalDays} <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>days</span>
          </div>
        </div>

        <div style={{ background: 'var(--pastel-baby-pink)', padding: '1rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(29, 78, 216, 0.2)' }}>
          <span style={{ fontSize: '0.72rem', color: '#1d4ed8', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>CARDIO</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#1d4ed8', marginTop: '0.2rem' }}>
            {cardioDaysDone} / {totalDays} <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>days</span>
          </div>
        </div>

        <div style={{ background: 'var(--pastel-baby-blue)', padding: '1rem', borderRadius: '1rem', textAlign: 'center', border: '1px solid rgba(0,0,0,0.06)' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--pastel-text-dark)', textTransform: 'uppercase', fontWeight: 800, display: 'block' }}>OVERALL</span>
          <div style={{ fontSize: '1.45rem', fontWeight: 900, color: 'var(--pastel-text-dark)', marginTop: '0.2rem' }}>
            {avgOverall}%
          </div>
        </div>
      </div>

      {/* SVG CHART CONTAINER WITH HIGH CONTRAST DARK-PASTEL LINES & NODES */}
      <div style={{ position: 'relative', width: '100%', background: 'rgba(255,255,255,0.7)', borderRadius: '1rem', padding: '1rem 0.5rem', border: '1px solid rgba(0,0,0,0.04)' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Y-Axis Grid Lines & Percentage Labels (0%, 25%, 50%, 75%, 100%) */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={paddingX} y1={y} x2={svgWidth - paddingX} y2={y} stroke="rgba(200, 210, 220, 0.6)" strokeDasharray="3 3" strokeWidth="1" />
                <text x={paddingX - 10} y={y + 4} fill="#475569" fontSize="11" fontWeight="700" textAnchor="end">{val}%</text>
              </g>
            );
          })}

          {/* X-Axis Date Labels */}
          {historyData.map((d, idx) => {
            const x = getX(idx);
            // Show all labels for weekly, or every 4th label for monthly to prevent overlap
            if (timeframe === 'monthly' && idx % 4 !== 0 && idx !== historyData.length - 1) return null;
            return (
              <text key={`xlabel_${idx}`} x={x} y={svgHeight - 5} fill="#475569" fontSize="10" fontWeight="700" textAnchor="middle">
                {d.label}
              </text>
            );
          })}

          {/* High Contrast Polylines */}
          {/* Workout Line (Muted Dark Teal #0f766e) */}
          <polyline points={workoutPath} fill="none" stroke="#0f766e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Diet Line (Muted Dark Coral #c2410c) */}
          <polyline points={dietPath} fill="none" stroke="#c2410c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" />
          
          {/* Cardio Line (Muted Dark Blue #1d4ed8) */}
          <polyline points={cardioPath} fill="none" stroke="#1d4ed8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points (Solid High Contrast Circles) */}
          {historyData.map((d, idx) => {
            const x = getX(idx);

            return (
              <g key={`nodes_${idx}`} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredPoint({ ...d, x, y: getY(d.overall || 0) })}>
                {/* Workout Node */}
                <circle cx={x} cy={getY(d.workout || 0)} r="4.5" fill="#0f766e" stroke="#ffffff" strokeWidth="1.5" />
                {/* Diet Node */}
                <circle cx={x} cy={getY(d.diet || 0)} r="4.5" fill="#c2410c" stroke="#ffffff" strokeWidth="1.5" />
                {/* Cardio Node */}
                <circle cx={x} cy={getY(d.cardio || 0)} r="4.5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            );
          })}
        </svg>

        {/* Clear Chart Legend */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', fontSize: '0.85rem', fontWeight: 800 }}>
          <span style={{ color: '#0f766e', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0f766e' }} /> Workout
          </span>
          <span style={{ color: '#c2410c', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#c2410c' }} /> Diet
          </span>
          <span style={{ color: '#1d4ed8', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#1d4ed8' }} /> Cardio
          </span>
        </div>

        {/* Hover / Tap Tooltip Overlay */}
        {hoveredPoint && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: '#ffffff',
            border: '1.5px solid rgba(0,0,0,0.1)',
            padding: '0.75rem 1rem',
            borderRadius: '0.85rem',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            fontSize: '0.82rem',
            pointerEvents: 'none',
            zIndex: 10
          }}>
            <div style={{ fontWeight: 900, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '0.25rem' }}>
              {hoveredPoint.label.toUpperCase()}, {hoveredPoint.date}
            </div>
            <div style={{ color: '#0f766e', fontWeight: 800 }}>Workout: {hoveredPoint.workout}%</div>
            <div style={{ color: '#c2410c', fontWeight: 800 }}>Diet: {hoveredPoint.diet}%</div>
            <div style={{ color: '#1d4ed8', fontWeight: 800 }}>Cardio: {hoveredPoint.cardio}%</div>
          </div>
        )}
      </div>

      {/* Daily Breakdown Row */}
      <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
          Daily Tracking Breakdown
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.65rem' }}>
          {historyData.slice(-7).map((d) => (
            <div key={d.date} style={{ background: 'var(--pastel-cream)', padding: '0.65rem', borderRadius: '0.75rem', fontSize: '0.78rem' }}>
              <div style={{ fontWeight: 800, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem', textTransform: 'uppercase' }}>{d.label}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontWeight: 700 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: d.workout >= 50 ? '#0f766e' : 'var(--pastel-text-muted)' }}>
                  <span>Workout</span>
                  <span>{d.workout >= 50 ? '100%' : '0%'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: d.diet >= 60 ? '#c2410c' : 'var(--pastel-text-muted)' }}>
                  <span>Diet</span>
                  <span>{d.diet}%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: d.cardio >= 50 ? '#1d4ed8' : 'var(--pastel-text-muted)' }}>
                  <span>Cardio</span>
                  <span>{d.cardio}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
