import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Search, Filter, User, ChevronRight, Sparkles, Activity } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { getAllUsers } from '../services/userService';

export default function AdminUserListPage() {
  const navigate = useNavigate();
  const usersList = getAllUsers();

  const [searchTerm, setSearchTerm] = useState('');
  const [goalFilter, setGoalFilter] = useState('all');

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = goalFilter === 'all' || (u.activePlan || 'cut').toLowerCase() === goalFilter.toLowerCase();
    return matchesSearch && matchesGoal;
  });

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto 3rem auto', width: '100%' }}>
      {/* Admin Hero Header */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: 'var(--pastel-peach)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)' 
          }}>
            <Shield size={28} style={{ color: 'var(--pastel-peach-dark)' }} />
          </div>
          <div>
            <div style={{ 
              background: 'var(--pastel-peach)', 
              color: 'var(--pastel-peach-dark)', 
              padding: '0.3rem 0.8rem', 
              borderRadius: '9999px',
              fontWeight: 700,
              fontSize: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              marginBottom: '0.35rem'
            }}>
              <Sparkles size={12} /> MASTER COACH CONTROL CENTER
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
              Admin — User Roster & Progress
            </h1>
            <p style={{ color: 'var(--pastel-text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>
              Monitor registered athletes, evaluate consistency scores & customize individual workout/diet protocols.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Search & Filter Toolbar */}
      <GlassCard hoverEffect={false} style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Search Input */}
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <input
              type="text"
              className="glass-input"
              placeholder="Search user by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', fontSize: '0.9rem' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--pastel-text-muted)' }} />
          </div>

          {/* Goal Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} style={{ color: 'var(--pastel-text-muted)' }} />
            <select
              className="glass-input"
              value={goalFilter}
              onChange={(e) => setGoalFilter(e.target.value)}
              style={{ padding: '0.75rem 1rem', fontSize: '0.9rem' }}
            >
              <option value="all">All Goals</option>
              <option value="cut">CUT Protocol</option>
              <option value="bulk">BULK Protocol</option>
              <option value="recomp">RECOMP Protocol</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* User Roster Table / Card Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredUsers.length === 0 ? (
          <GlassCard style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--pastel-text-muted)', fontWeight: 600 }}>No matching users found.</p>
          </GlassCard>
        ) : (
          filteredUsers.map((u) => {
            const planKey = (u.activePlan || 'cut').toLowerCase();
            const weight = u.bodyMeasurements?.weight ? `${u.bodyMeasurements.weight} kg` : 'N/A';
            const statusStr = u.hasCompletedOnboarding ? 'Active Athlete' : 'Pending Onboarding';

            return (
              <div
                key={u.id}
                className="glass-card"
                onClick={() => navigate(`/admin/users/${u.id}`)}
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--pastel-baby-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={22} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>{u.name || u.username}</h3>
                      <span className={`goal-pill goal-pill-${planKey}`} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                        {planKey.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
                      {u.email} • {u.personalInfo?.age ? `${u.personalInfo.age} yrs` : ''} • {u.personalInfo?.gender || ''}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pastel-text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Body Weight</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--pastel-text-dark)', fontWeight: 800 }}>{weight}</strong>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--pastel-text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Status</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: u.hasCompletedOnboarding ? 'var(--pastel-mint-dark)' : 'var(--pastel-peach-dark)' }}>
                      {statusStr}
                    </span>
                  </div>

                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={18} style={{ color: 'var(--pastel-text-muted)' }} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
