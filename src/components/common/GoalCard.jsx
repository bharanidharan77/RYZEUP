import React from 'react';
import { ArrowRight, Check, Flame, Dumbbell, Activity } from 'lucide-react';
import GlassCard from './GlassCard';

export default function GoalCard({ goalKey, active = false, onSelect }) {
  const goalConfigs = {
    cut: {
      title: 'CUT',
      badge: 'Fat Loss',
      icon: <Flame size={20} />,
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      description: 'Lose fat, get leaner, feel lighter with targeted calorie deficit.',
      colorVar: 'var(--cut-color)',
      bgVar: 'var(--cut-bg)',
      borderVar: 'var(--cut-border)'
    },
    bulk: {
      title: 'BULK',
      badge: 'Muscle Growth',
      icon: <Dumbbell size={20} />,
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
      description: 'Build muscle, get stronger, reach your ultimate potential.',
      colorVar: 'var(--bulk-color)',
      bgVar: 'var(--bulk-bg)',
      borderVar: 'var(--bulk-border)'
    },
    recomp: {
      title: 'RECOMP',
      badge: 'Body Recomp',
      icon: <Activity size={20} />,
      image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80',
      description: 'Build muscle, lose fat, become your best balanced self.',
      colorVar: 'var(--recomp-color)',
      bgVar: 'var(--recomp-bg)',
      borderVar: 'var(--recomp-border)'
    }
  };

  const config = goalConfigs[goalKey] || goalConfigs.cut;

  return (
    <GlassCard
      hoverEffect={true}
      style={{
        padding: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        background: config.bgVar,
        border: active ? `2px solid ${config.colorVar}` : `1px solid ${config.borderVar}`,
        boxShadow: active ? config.glowVar : 'var(--shadow-glass)',
        cursor: 'pointer'
      }}
      onClick={() => onSelect(goalKey)}
    >
      {/* Athlete Image Thumbnail (Matching Reference Screen 3) */}
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '20px',
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
      }}>
        <img
          src={config.image}
          alt={config.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Content Area */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <div style={{ color: config.colorVar, display: 'flex' }}>{config.icon}</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)', margin: 0, letterSpacing: '-0.02em' }}>
            {config.title}
          </h2>
          {active && (
            <span className="badge badge-cut" style={{ fontSize: '0.68rem', padding: '0.2rem 0.65rem', marginLeft: 'auto' }}>
              <Check size={10} style={{ marginRight: '0.2rem' }} /> Active
            </span>
          )}
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.45 }}>
          {config.description}
        </p>
      </div>

      {/* Circular Arrow Button (Matching Reference Screen 3) */}
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: active ? config.colorVar : '#ffffff',
        color: active ? '#ffffff' : 'var(--text-main)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease'
      }}>
        <ArrowRight size={18} />
      </div>
    </GlassCard>
  );
}
