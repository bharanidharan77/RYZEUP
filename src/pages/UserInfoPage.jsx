import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, ArrowRight, ArrowLeft, AlertCircle, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { getCurrentUser, saveOnboardingInfo } from '../services/userService';

export default function UserInfoPage() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [personalInfo, setPersonalInfo] = useState({
    name: currentUser?.personalInfo?.name || currentUser?.name || '',
    age: currentUser?.personalInfo?.age || '',
    gender: currentUser?.personalInfo?.gender || 'Male',
    disabilityOrInjury: currentUser?.personalInfo?.disabilityOrInjury || '',
    otherNotes: currentUser?.personalInfo?.otherNotes || ''
  });

  const [bodyMeasurements, setBodyMeasurements] = useState({
    weight: currentUser?.bodyMeasurements?.weight || '',
    height: currentUser?.bodyMeasurements?.height || '',
    waist: currentUser?.bodyMeasurements?.waist || '',
    neck: currentUser?.bodyMeasurements?.neck || '',
    arm: currentUser?.bodyMeasurements?.arm || '',
    chest: currentUser?.bodyMeasurements?.chest || ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handlePersonalChange = (field, val) => {
    setPersonalInfo(prev => ({ ...prev, [field]: val }));
  };

  const handleBodyChange = (field, val) => {
    setBodyMeasurements(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!personalInfo.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!personalInfo.age || parseInt(personalInfo.age) <= 0) {
      setErrorMessage('Please enter a valid age.');
      return;
    }
    if (!bodyMeasurements.weight || parseFloat(bodyMeasurements.weight) <= 0) {
      setErrorMessage('Please enter a valid body weight in kg.');
      return;
    }
    if (!bodyMeasurements.height || parseFloat(bodyMeasurements.height) <= 0) {
      setErrorMessage('Please enter a valid height in cm.');
      return;
    }

    saveOnboardingInfo(currentUser.id, personalInfo, bodyMeasurements);
    navigate('/goal');
  };

  return (
    <div style={{ maxWidth: '780px', margin: '1rem auto', width: '100%' }}>
      {/* Step Bar Header (Matching Reference Screen 2) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button onClick={() => navigate('/login')} className="btn btn-ghost" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Back
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '100px', height: '6px', background: 'rgba(220, 215, 205, 0.6)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: 'var(--color-primary)', borderRadius: '99px' }} />
          </div>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)' }}>Step 1 of 2</span>
        </div>
      </div>

      <GlassCard hoverEffect={false} style={{ padding: '2.5rem 2.25rem', marginBottom: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '0.35rem', letterSpacing: '-0.02em' }}>
            Complete Your Profile
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 auto', lineHeight: 1.5 }}>
            Help us personalize your fitness journey
          </p>
        </div>

        {errorMessage && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(217, 119, 127, 0.12)',
            border: '1px solid rgba(217, 119, 127, 0.35)', color: '#d90429', padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.88rem'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* SECTION 1: PERSONAL INFORMATION */}
          <div style={{ marginBottom: '2.25rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.15rem' }}>
              Personal Information
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.15rem' }}>
              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Full Name"
                    value={personalInfo.name}
                    onChange={(e) => handlePersonalChange('name', e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: 'var(--radius-md)' }}
                  />
                  <User size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>

              <div>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    min="12"
                    max="100"
                    className="glass-input"
                    placeholder="Age"
                    value={personalInfo.age}
                    onChange={(e) => handlePersonalChange('age', e.target.value)}
                    style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: 'var(--radius-md)' }}
                  />
                  <User size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                </div>
              </div>

              {/* Male / Female Pill Buttons (Matching Reference Screen 2) */}
              <div style={{ gridColumn: 'span 1', display: 'flex', gap: '0.5rem', background: 'var(--bg-input)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                {['Male', 'Female'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handlePersonalChange('gender', g)}
                    style={{
                      flex: 1,
                      padding: '0.55rem',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      borderRadius: 'var(--radius-md)',
                      border: 'none',
                      background: personalInfo.gender === g ? '#ffffff' : 'transparent',
                      color: personalInfo.gender === g ? 'var(--text-main)' : 'var(--text-muted)',
                      boxShadow: personalInfo.gender === g ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '1.15rem' }}>
              <textarea
                className="glass-input"
                rows="2"
                placeholder="Any fitness related disability or injury? (Optional)"
                value={personalInfo.disabilityOrInjury}
                onChange={(e) => handlePersonalChange('disabilityOrInjury', e.target.value)}
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* SECTION 2: BODY MEASUREMENTS */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.15rem' }}>
              Body Measurements
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.15rem' }}>
              <div>
                <input
                  type="number"
                  step="0.1"
                  className="glass-input"
                  placeholder="Body Weight (kg)"
                  value={bodyMeasurements.weight}
                  onChange={(e) => handleBodyChange('weight', e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <input
                  type="number"
                  className="glass-input"
                  placeholder="Height (cm)"
                  value={bodyMeasurements.height}
                  onChange={(e) => handleBodyChange('height', e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <input
                  type="number"
                  className="glass-input"
                  placeholder="Waist Size (cm)"
                  value={bodyMeasurements.waist}
                  onChange={(e) => handleBodyChange('waist', e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <input
                  type="number"
                  className="glass-input"
                  placeholder="Neck Size (cm)"
                  value={bodyMeasurements.neck}
                  onChange={(e) => handleBodyChange('neck', e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <input
                  type="number"
                  className="glass-input"
                  placeholder="Arm Size (cm)"
                  value={bodyMeasurements.arm}
                  onChange={(e) => handleBodyChange('arm', e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}
                />
              </div>

              <div>
                <input
                  type="number"
                  className="glass-input"
                  placeholder="Chest Size (cm)"
                  value={bodyMeasurements.chest}
                  onChange={(e) => handleBodyChange('chest', e.target.value)}
                  style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}
                />
              </div>
            </div>
          </div>

          {/* Pill Action Button (Matching Reference Screen 2: Next Step →) */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '1rem', borderRadius: 'var(--radius-pill)' }}>
            <span>Next Step</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
