import React, { useState, useEffect } from 'react';
import { Utensils, Check } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import { getUserDailyTracking, saveDietChecklist, getTodayDateString } from '../../services/fitnessService';
import { getUserDietSelections } from '../../services/nutritionService';
import { foodDatabase } from '../../data/foodDatabase';

export default function DietTracker({ userId, planData, onUpdate }) {
  const todayStr = getTodayDateString();
  const activeGoal = planData?.meta?.goal?.toLowerCase() || 'cut';
  const [dietState, setDietState] = useState({ breakfast: false, lunch: false, dinner: false });
  const [userSelections, setUserSelections] = useState(() => getUserDietSelections(userId, activeGoal));

  useEffect(() => {
    if (userId) {
      const tracking = getUserDailyTracking(userId, todayStr);
      if (tracking && tracking.diet) {
        setDietState(tracking.diet);
      }
      setUserSelections(getUserDietSelections(userId, activeGoal));
    }
  }, [userId, todayStr, activeGoal]);

  const handleToggleMeal = (mealKey) => {
    const updated = { ...dietState, [mealKey]: !dietState[mealKey] };
    setDietState(updated);
    saveDietChecklist(userId, updated, todayStr);
    if (onUpdate) onUpdate();
  };

  const getMealSummaryText = (mealKey) => {
    const sel = userSelections[mealKey];
    if (!sel) return '';
    const mainName = foodDatabase[sel.main]?.label || sel.main;
    const proteinName = foodDatabase[sel.protein]?.label || sel.protein;
    if (mainName && proteinName) return `${mainName} + ${proteinName}`;
    return mainName || proteinName || '';
  };

  const mealsList = [
    { key: 'breakfast', label: 'Breakfast', summary: getMealSummaryText('breakfast') },
    { key: 'lunch', label: 'Lunch', summary: getMealSummaryText('lunch') },
    { key: 'dinner', label: 'Dinner', summary: getMealSummaryText('dinner') }
  ];

  return (
    <GlassCard hoverEffect={false} style={{ padding: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--pastel-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Utensils size={18} style={{ color: 'var(--pastel-mint-dark)' }} />
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
            Today's Diet
          </h3>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--pastel-mint-dark)', background: 'var(--pastel-mint)', padding: '0.25rem 0.65rem', borderRadius: '9999px' }}>
          FLEXIBLE MEALS
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {mealsList.map((meal) => {
          const isChecked = !!dietState[meal.key];
          return (
            <div
              key={meal.key}
              onClick={() => handleToggleMeal(meal.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: '1rem',
                background: isChecked ? 'var(--pastel-mint)' : 'rgba(255,255,255,0.6)',
                border: isChecked ? '1px solid rgba(220, 239, 225, 0.9)' : '1px solid rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isChecked ? '0 2px 10px rgba(0,0,0,0.03)' : 'none'
              }}
            >
              <div>
                <span style={{
                  fontSize: '0.92rem',
                  fontWeight: 800,
                  color: isChecked ? 'var(--pastel-mint-dark)' : 'var(--pastel-text-dark)',
                  display: 'block'
                }}>
                  {meal.label}
                </span>
                {meal.summary && (
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: isChecked ? 'var(--pastel-mint-dark)' : 'var(--pastel-text-muted)'
                  }}>
                    {meal.summary}
                  </span>
                )}
              </div>

              {/* Pastel Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {isChecked ? (
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '6px',
                    background: 'var(--pastel-mint-dark)', color: '#ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                ) : (
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '6px',
                    border: '2px solid rgba(0,0,0,0.15)', background: '#ffffff'
                  }} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
