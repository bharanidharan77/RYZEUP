import React, { useState, useEffect } from 'react';
import { Utensils, PieChart, Apple, Coffee, Moon, Zap, RefreshCw, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import GlassCard from '../common/GlassCard';
import ScrollReveal from '../common/ScrollReveal';
import { foodDatabase, mealCategoryOptions } from '../../data/foodDatabase';
import { buildFlexibleDietPlan, getUserDietSelections, saveUserDietSelections } from '../../services/nutritionService';
import { getCurrentUser } from '../../services/userService';

export default function DietView({ goalKey, planData }) {
  const currentUser = getCurrentUser();
  const userId = currentUser?.id || 'demo_user';
  const targetCalories = planData?.meta?.targetCalories || 2000;

  const [selections, setSelections] = useState(() => getUserDietSelections(userId, goalKey));
  const [dietPlan, setDietPlan] = useState(() => buildFlexibleDietPlan(userId, goalKey, targetCalories, selections));
  const [saveToast, setSaveToast] = useState('');
  const [showDefaultView, setShowDefaultView] = useState(false);

  const [expandedMeals, setExpandedMeals] = useState({
    breakfast: true,
    lunch: true,
    snack: true,
    preWorkout: true,
    dinner: true
  });

  useEffect(() => {
    const updatedPlan = buildFlexibleDietPlan(userId, goalKey, targetCalories, selections);
    setDietPlan(updatedPlan);
  }, [userId, goalKey, targetCalories, selections]);

  const toggleMeal = (key) => {
    setExpandedMeals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSwapFood = (mealKey, fieldKey, newFoodId) => {
    const newSelections = {
      ...selections,
      [mealKey]: {
        ...selections[mealKey],
        [fieldKey]: newFoodId
      }
    };
    setSelections(newSelections);
    saveUserDietSelections(userId, goalKey, newSelections);

    setSaveToast(`Recalculated portions for ${mealCategoryOptions[mealKey]?.name}!`);
    setTimeout(() => setSaveToast(''), 2500);
  };

  const mealIcons = {
    breakfast: <Coffee size={22} style={{ color: 'var(--pastel-peach-dark)' }} />,
    lunch: <Utensils size={22} style={{ color: 'var(--pastel-mint-dark)' }} />,
    snack: <Apple size={22} style={{ color: 'var(--pastel-baby-blue-dark)' }} />,
    preWorkout: <Zap size={22} style={{ color: 'var(--pastel-lavender-dark)' }} />,
    dinner: <Moon size={22} style={{ color: 'var(--pastel-baby-pink-dark)' }} />
  };

  const mealBadgeColors = {
    breakfast: { bg: 'var(--pastel-peach)', color: 'var(--pastel-peach-dark)' },
    lunch: { bg: 'var(--pastel-mint)', color: 'var(--pastel-mint-dark)' },
    snack: { bg: 'var(--pastel-baby-blue)', color: 'var(--pastel-baby-blue-dark)' },
    preWorkout: { bg: 'var(--pastel-lavender)', color: 'var(--pastel-lavender-dark)' },
    dinner: { bg: 'var(--pastel-baby-pink)', color: 'var(--pastel-baby-pink-dark)' }
  };

  const { dailyTotals, remainingCalories, meals } = dietPlan;

  return (
    <div>
      {/* Toast Notification */}
      {saveToast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--pastel-mint)',
          color: 'var(--pastel-mint-dark)',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '0.85rem 1.5rem',
          borderRadius: '9999px',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          zIndex: 1000
        }}>
          <Check size={18} /> {saveToast}
        </div>
      )}

      {/* DAILY NUTRITION TARGET & REMAINING BANNER */}
      <GlassCard hoverEffect={false} style={{ padding: '1.75rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--pastel-baby-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PieChart size={22} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <h3 style={{ fontSize: '1.3rem', margin: 0, fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                  FLEXIBLE DIET PLAN ({goalKey.toUpperCase()})
                </h3>
                {planData?.isDietAdminEdited ? (
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
                    ADMIN UPDATED
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
                    DEFAULT DIET
                  </span>
                )}
              </div>
              <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.82rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
                Select your preferred foods. Portions automatically scale to match your targets.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {planData?.isDietAdminEdited && (
              <button
                type="button"
                onClick={() => setShowDefaultView(prev => !prev)}
                className="btn-pastel-secondary"
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.78rem', fontWeight: 800 }}
              >
                {showDefaultView ? 'Show Admin Customized Plan' : 'View Default Baseline Plan'}
              </button>
            )}

            <span className={`goal-pill goal-pill-${goalKey}`} style={{ fontSize: '0.8rem', padding: '0.35rem 0.9rem' }}>
              <Sparkles size={13} /> {goalKey.toUpperCase()} CALORIE ENGINE
            </span>
          </div>
        </div>

        {/* 4 STAT TILES: Target, Planned, Remaining, Macros */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem' }}>
          <div style={{ background: 'var(--pastel-cream)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Daily Target</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginTop: '0.2rem' }}>
              {targetCalories} <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--pastel-text-muted)' }}>kcal</span>
            </div>
          </div>

          <div style={{ background: 'var(--pastel-baby-blue)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--pastel-baby-blue-dark)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Planned Total</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-baby-blue-dark)', marginTop: '0.2rem' }}>
              {dailyTotals.calories} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>kcal</span>
            </div>
          </div>

          <div style={{ background: 'var(--pastel-mint)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--pastel-mint-dark)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Remaining</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-mint-dark)', marginTop: '0.2rem' }}>
              {remainingCalories} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>kcal</span>
            </div>
          </div>

          <div style={{ background: 'var(--pastel-peach)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--pastel-peach-dark)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Protein Target</span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-peach-dark)', marginTop: '0.2rem' }}>
              {dailyTotals.protein} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>g</span>
            </div>
          </div>
        </div>

        {/* Macro Pill Indicators */}
        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem', fontWeight: 700 }}>
          <span style={{ color: 'var(--pastel-text-dark)' }}>
            Carbohydrates: <strong style={{ color: 'var(--pastel-peach-dark)' }}>{dailyTotals.carbs}g</strong>
          </span>
          <span style={{ color: 'var(--pastel-text-dark)' }}>
            Fats: <strong style={{ color: 'var(--pastel-lavender-dark)' }}>{dailyTotals.fats}g</strong>
          </span>
          <span style={{ color: 'var(--pastel-text-dark)' }}>
            Fiber: <strong style={{ color: 'var(--pastel-baby-blue-dark)' }}>{dailyTotals.fiber}g</strong>
          </span>
        </div>
      </GlassCard>

      {/* 5 FLEXIBLE MEAL SECTIONS */}
      <ScrollReveal delay={100}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {Object.keys(mealCategoryOptions).map((mealKey) => {
            const config = mealCategoryOptions[mealKey];
            const meal = meals[mealKey];
            if (!meal) return null;

            const isExpanded = expandedMeals[mealKey];
            const badgeStyle = mealBadgeColors[mealKey] || { bg: 'var(--pastel-cream)', color: 'var(--pastel-text-dark)' };

            return (
              <GlassCard key={mealKey} hoverEffect={false} style={{ padding: '1.5rem' }}>
                {/* Header with Title & Meal Total */}
                <div 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', cursor: 'pointer' }}
                  onClick={() => toggleMeal(mealKey)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: badgeStyle.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {mealIcons[mealKey]}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                          {meal.name}
                        </h3>
                        <span style={{ background: badgeStyle.bg, color: badgeStyle.color, padding: '0.15rem 0.6rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>
                          ~{Math.round(config.targetPercent * 100)}% Target
                        </span>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
                        {meal.items.length} Food Options Selected
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                      {meal.subtotal.calories} <span style={{ fontSize: '0.75rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>kcal</span>
                    </div>
                    <button className="btn-pastel-secondary" style={{ padding: '0.3rem 0.5rem', borderRadius: '50%' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Food Controls & Recommendations */}
                {isExpanded && (
                  <div style={{ marginTop: '1.35rem', paddingTop: '1.15rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    
                    {/* SWAP SELECTOR TOOLBAR */}
                    <div style={{ 
                      background: 'var(--pastel-cream)', 
                      padding: '1rem 1.25rem', 
                      borderRadius: '1.25rem', 
                      marginBottom: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
                        <RefreshCw size={14} style={{ color: 'var(--pastel-baby-blue-dark)' }} /> SWAP FOOD CHOICES:
                      </div>

                      {/* Main Carb Selector */}
                      {config.mainCarbs && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-muted)' }}>Main Food:</label>
                          <select
                            className="glass-input"
                            value={meal.selection.main}
                            onChange={(e) => handleSwapFood(mealKey, 'main', e.target.value)}
                            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', fontWeight: 700 }}
                          >
                            {config.mainCarbs.map(id => (
                              <option key={id} value={id}>{foodDatabase[id]?.name || id}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Protein Selector */}
                      {config.proteins && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-muted)' }}>Protein:</label>
                          <select
                            className="glass-input"
                            value={meal.selection.protein}
                            onChange={(e) => handleSwapFood(mealKey, 'protein', e.target.value)}
                            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', fontWeight: 700 }}
                          >
                            {config.proteins.map(id => (
                              <option key={id} value={id}>{foodDatabase[id]?.name || id}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* Vegetable Selector */}
                      {config.vegetables && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-muted)' }}>Veggies:</label>
                          <select
                            className="glass-input"
                            value={meal.selection.vegetable}
                            onChange={(e) => handleSwapFood(mealKey, 'vegetable', e.target.value)}
                            style={{ padding: '0.45rem 0.75rem', fontSize: '0.82rem', fontWeight: 700 }}
                          >
                            {config.vegetables.map(id => (
                              <option key={id} value={id}>{foodDatabase[id]?.name || id}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {/* FOOD ITEMS PORTION & NUTRITION CARDS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                      {meal.items.map((item, idx) => (
                        <div 
                          key={idx}
                          style={{ 
                            background: '#ffffff', 
                            border: '1px solid rgba(0,0,0,0.05)', 
                            borderRadius: '1rem', 
                            padding: '1rem 1.25rem',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '1rem'
                          }}
                        >
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
                                {item.name}
                              </h4>
                              <span style={{ 
                                background: badgeStyle.bg, 
                                color: badgeStyle.color, 
                                padding: '0.2rem 0.65rem', 
                                borderRadius: '9999px', 
                                fontSize: '0.78rem', 
                                fontWeight: 800 
                              }}>
                                Recommended: {item.displayQuantity}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
                              Weight Basis: <span style={{ textTransform: 'uppercase', fontWeight: 700 }}>{item.weightType}</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '1rem', textAlign: 'center', fontSize: '0.82rem' }}>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--pastel-text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Calories</span>
                              <strong style={{ color: 'var(--pastel-text-dark)', fontWeight: 800 }}>{item.calories} kcal</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--pastel-text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Protein</span>
                              <strong style={{ color: 'var(--pastel-mint-dark)', fontWeight: 800 }}>{item.protein}g</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--pastel-text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Carbs</span>
                              <strong style={{ color: 'var(--pastel-peach-dark)', fontWeight: 800 }}>{item.carbs}g</strong>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.65rem', color: 'var(--pastel-text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>Fats</span>
                              <strong style={{ color: 'var(--pastel-lavender-dark)', fontWeight: 800 }}>{item.fat}g</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* MEAL SUBTOTAL SUMMARY FOOTER */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.85rem',
                      background: badgeStyle.bg,
                      padding: '0.85rem 1.25rem',
                      borderRadius: '1rem'
                    }}>
                      <span style={{ fontWeight: 800, fontSize: '0.85rem', color: badgeStyle.color, textTransform: 'uppercase' }}>
                        {meal.name} Total
                      </span>
                      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.85rem', fontWeight: 700, color: badgeStyle.color }}>
                        <span>Calories: <strong>{meal.subtotal.calories} kcal</strong></span>
                        <span>Protein: <strong>{meal.subtotal.protein}g</strong></span>
                        <span>Carbs: <strong>{meal.subtotal.carbs}g</strong></span>
                        <span>Fat: <strong>{meal.subtotal.fat}g</strong></span>
                      </div>
                    </div>

                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </ScrollReveal>

      {/* GRAND DAILY NUTRITION TOTAL FOOTER */}
      <ScrollReveal delay={150}>
        <GlassCard hoverEffect={false} style={{ padding: '1.75rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), var(--pastel-cream))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Sparkles size={24} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
            <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 800, color: 'var(--pastel-text-dark)' }}>
              DAILY DIET SUMMARY & MACROS ({goalKey.toUpperCase()})
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.85rem' }}>
            <div style={{ background: 'var(--pastel-cream)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--pastel-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Calories</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginTop: '0.2rem' }}>
                {dailyTotals.calories} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>kcal</span>
              </div>
            </div>

            <div style={{ background: 'var(--pastel-mint)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--pastel-mint-dark)', textTransform: 'uppercase', fontWeight: 700 }}>Total Protein</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-mint-dark)', marginTop: '0.2rem' }}>
                {dailyTotals.protein} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>g</span>
              </div>
            </div>

            <div style={{ background: 'var(--pastel-peach)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--pastel-peach-dark)', textTransform: 'uppercase', fontWeight: 700 }}>Total Carbs</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-peach-dark)', marginTop: '0.2rem' }}>
                {dailyTotals.carbs} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>g</span>
              </div>
            </div>

            <div style={{ background: 'var(--pastel-lavender)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--pastel-lavender-dark)', textTransform: 'uppercase', fontWeight: 700 }}>Total Fats</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-lavender-dark)', marginTop: '0.2rem' }}>
                {dailyTotals.fats} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>g</span>
              </div>
            </div>

            <div style={{ background: 'var(--pastel-baby-blue)', padding: '1rem', borderRadius: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--pastel-baby-blue-dark)', textTransform: 'uppercase', fontWeight: 700 }}>Total Fiber</span>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pastel-baby-blue-dark)', marginTop: '0.2rem' }}>
                {dailyTotals.fiber} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>g</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </ScrollReveal>
    </div>
  );
}
