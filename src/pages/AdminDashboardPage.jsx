import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Edit3, ArrowLeft, Plus, CheckCircle2, Sparkles } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import ScrollReveal from '../components/common/ScrollReveal';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  const usersList = [
    { id: 'usr_01', name: 'Alex Johnson', email: 'alex@example.com', goal: 'CUT', calories: '2000 kcal', status: 'Active' },
    { id: 'usr_02', name: 'Sarah Connor', email: 'sarah@example.com', goal: 'BULK', calories: '2700 kcal', status: 'Active' },
    { id: 'usr_03', name: 'Mike Ross', email: 'mike@example.com', goal: 'RECOMP', calories: '2350 kcal', status: 'Active' }
  ];

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto 3rem auto', width: '100%' }}>
      {/* Top Bar with Back Button */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => navigate('/home')} className="btn-pastel-secondary">
          <ArrowLeft size={16} /> Back to User Side
        </button>
        <span style={{ 
          background: 'var(--pastel-mint)', 
          color: 'var(--pastel-mint-dark)',
          padding: '0.4rem 1rem', 
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.8rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={14} /> ADMIN CONTROL CENTER
        </span>
      </div>

      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
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
              <Shield size={28} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
                ADMIN DASHBOARD
              </h1>
              <p style={{ color: 'var(--pastel-text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>
                Manage customer profiles, assign fitness goals & edit custom diet/workout plans.
              </p>
            </div>
          </div>

          <button className="btn-pastel-primary" style={{ padding: '0.75rem 1.35rem' }}>
            <Plus size={18} /> Add New Client
          </button>
        </div>

        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.15rem', marginBottom: '2.25rem' }}>
          <div style={{ background: 'var(--pastel-cream)', padding: '1.25rem', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Active Clients</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginTop: '0.25rem' }}>3 Clients</div>
          </div>

          <div style={{ background: 'var(--pastel-baby-blue)', padding: '1.25rem', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--pastel-baby-blue-dark)', textTransform: 'uppercase', fontWeight: 700 }}>Assigned Protocols</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pastel-baby-blue-dark)', marginTop: '0.25rem' }}>Cut / Bulk / Recomp</div>
          </div>

          <div style={{ background: 'var(--pastel-mint)', padding: '1.25rem', borderRadius: '1.25rem', border: '1px solid rgba(0,0,0,0.03)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--pastel-mint-dark)', textTransform: 'uppercase', fontWeight: 700 }}>System Status</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--pastel-mint-dark)', marginTop: '0.25rem' }}>100% Operational</div>
          </div>
        </div>

        {/* Client Management Table Preview */}
        <ScrollReveal delay={100}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginBottom: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Users size={20} style={{ color: 'var(--pastel-baby-blue-dark)' }} /> Assigned Clients Overview
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', color: 'var(--pastel-text-muted)' }}>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Client Name</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Assigned Goal</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Target Calories</th>
                  <th style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 700 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((usr) => (
                  <tr key={usr.id} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.04)' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong style={{ color: 'var(--pastel-text-dark)', display: 'block', fontSize: '0.95rem', fontWeight: 800 }}>{usr.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--pastel-text-muted)' }}>{usr.email}</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`goal-pill goal-pill-${usr.goal.toLowerCase()}`} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}>
                        {usr.goal}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>{usr.calories}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ color: 'var(--pastel-mint-dark)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 700 }}>
                        <CheckCircle2 size={16} /> {usr.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button 
                        onClick={() => navigate('/admin/users')}
                        className="btn-pastel-secondary" 
                        style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}
                      >
                        <Edit3 size={14} /> Edit Plan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </GlassCard>
    </div>
  );
}
