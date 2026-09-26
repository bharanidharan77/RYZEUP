import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Activity, Save, ArrowLeft, Check, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import PlanSwitcher from '../components/profile/PlanSwitcher';
import { getCurrentUser, saveOnboardingInfo } from '../services/userService';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [saveSuccess, setSaveSuccess] = useState('');

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

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setPersonalInfo({
        name: user.personalInfo?.name || user.name || '',
        age: user.personalInfo?.age || '',
        gender: user.personalInfo?.gender || 'Male',
        disabilityOrInjury: user.personalInfo?.disabilityOrInjury || '',
        otherNotes: user.personalInfo?.otherNotes || ''
      });
      setBodyMeasurements({
        weight: user.bodyMeasurements?.weight || '',
        height: user.bodyMeasurements?.height || '',
        waist: user.bodyMeasurements?.waist || '',
        neck: user.bodyMeasurements?.neck || '',
        arm: user.bodyMeasurements?.arm || '',
        chest: user.bodyMeasurements?.chest || ''
      });
    }
  }, []);

  const handlePersonalChange = (field, val) => {
    setPersonalInfo(prev => ({ ...prev, [field]: val }));
  };

  const handleBodyChange = (field, val) => {
    setBodyMeasurements(prev => ({ ...prev, [field]: val }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (currentUser?.id) {
      saveOnboardingInfo(currentUser.id, personalInfo, bodyMeasurements);
      setCurrentUser(getCurrentUser());
      setSaveSuccess('Profile measurements updated successfully!');
      setTimeout(() => setSaveSuccess(''), 3000);
    }
  };

  const handlePlanChanged = () => {
    const updated = getCurrentUser();
    setCurrentUser(updated);
    setSaveSuccess('Active fitness plan changed!');
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto 3rem auto', width: '100%' }}>
      {/* Top Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/dashboard')} className="btn-pastel-secondary">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <span style={{ 
          background: 'rgba(231, 223, 244, 0.6)', 
          color: 'var(--pastel-lavender-dark)',
          padding: '0.4rem 1rem', 
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={14} /> ATHLETE PROFILE
        </span>
      </div>

      {saveSuccess && (
        <div style={{ 
          padding: '0.9rem 1.25rem', 
          borderRadius: '1rem', 
          background: 'var(--pastel-mint)', 
          color: 'var(--pastel-mint-dark)', 
          border: '1px solid rgba(220, 239, 229, 0.8)', 
          marginBottom: '1.5rem', 
          fontWeight: 700,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
        }}>
          <Check size={18} />
          {saveSuccess}
        </div>
      )}

      {/* USER HEADER PROFILE CARD */}
      <div className="glass-card" style={{ padding: '1.75rem 2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--pastel-baby-blue), var(--pastel-baby-pink))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
          border: '3px solid white'
        }}>
          <User size={36} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
            {personalInfo.name || 'Athlete User'}
          </h2>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
            {personalInfo.gender || 'Male'} • {personalInfo.age ? `${personalInfo.age} Years Old` : 'Age not specified'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ background: 'var(--pastel-cream)', padding: '0.6rem 1rem', borderRadius: '1rem', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>Plan</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--pastel-baby-blue-dark)', textTransform: 'uppercase' }}>
              {currentUser?.selectedPlan || 'CUT'}
            </span>
          </div>
          <div style={{ background: 'var(--pastel-cream)', padding: '0.6rem 1rem', borderRadius: '1rem', textAlign: 'center' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>Weight</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
              {bodyMeasurements.weight ? `${bodyMeasurements.weight} kg` : '--'}
            </span>
          </div>
        </div>
      </div>

      {/* CHANGE FITNESS PLAN SECTION */}
      <PlanSwitcher user={currentUser} onPlanChanged={handlePlanChanged} />

      {/* EDIT PERSONAL INFO & BODY MEASUREMENTS FORM */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.75rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--pastel-baby-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={18} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
            Personal Details
          </h2>
        </div>

        <form onSubmit={handleSaveProfile}>
          {/* Personal Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.4rem' }}>Full Name</label>
              <input
                type="text"
                className="glass-input"
                value={personalInfo.name}
                onChange={(e) => handlePersonalChange('name', e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.4rem' }}>Age</label>
              <input
                type="number"
                className="glass-input"
                value={personalInfo.age}
                onChange={(e) => handlePersonalChange('age', e.target.value)}
                placeholder="Age"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.4rem' }}>Gender</label>
              <select
                className="glass-input"
                value={personalInfo.gender}
                onChange={(e) => handlePersonalChange('gender', e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.4rem' }}>Disability or Injury Notes</label>
            <textarea
              className="glass-input"
              rows="2"
              value={personalInfo.disabilityOrInjury}
              onChange={(e) => handlePersonalChange('disabilityOrInjury', e.target.value)}
              placeholder="List any physical constraints or injuries..."
            />
          </div>

          {/* Body Measurements Grid */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.6rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--pastel-peach)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={18} style={{ color: 'var(--pastel-peach-dark)' }} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
              Body Measurements (cm / kg)
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.15rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="glass-input"
                value={bodyMeasurements.weight}
                onChange={(e) => handleBodyChange('weight', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>Height (cm)</label>
              <input
                type="number"
                className="glass-input"
                value={bodyMeasurements.height}
                onChange={(e) => handleBodyChange('height', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>Waist (cm)</label>
              <input
                type="number"
                className="glass-input"
                value={bodyMeasurements.waist}
                onChange={(e) => handleBodyChange('waist', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>Neck (cm)</label>
              <input
                type="number"
                className="glass-input"
                value={bodyMeasurements.neck}
                onChange={(e) => handleBodyChange('neck', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>Arm (cm)</label>
              <input
                type="number"
                className="glass-input"
                value={bodyMeasurements.arm}
                onChange={(e) => handleBodyChange('arm', e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.35rem' }}>Chest (cm)</label>
              <input
                type="number"
                className="glass-input"
                value={bodyMeasurements.chest}
                onChange={(e) => handleBodyChange('chest', e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn-pastel-primary" style={{ width: '100%', padding: '0.95rem', fontSize: '0.95rem', justifyContent: 'center' }}>
            <Save size={18} /> Save & Update Profile Measurements
          </button>
        </form>
      </GlassCard>
    </div>
  );
}
