import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Shield, Check, Utensils, Dumbbell, HeartPulse, Sparkles, RefreshCw, Plus, Trash2, Edit2, X, AlertCircle } from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { getUserById } from '../services/userService';
import {
  getUserPlanData,
  saveUserPlanOverride,
  saveAdminCustomWorkout,
  getUserOverrides
} from '../services/fitnessService';
import { getUserDietSelections, saveUserDietSelections } from '../services/nutritionService';
import { foodDatabase, mealCategoryOptions } from '../data/foodDatabase';

export default function AdminPlanEditorPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = getUserById(userId);
  const goalKey = (user?.activePlan || 'cut').toLowerCase();
  const initialPlan = getUserPlanData(user?.id, goalKey);

  // Existing Raw Overrides
  const rawUserOverrides = getUserOverrides(user?.id)[goalKey] || {};

  // =========================================================================
  // 1. WORKOUT BUILDER STATE (Multi-Day Split Builder)
  // =========================================================================
  const existingWorkoutObj = rawUserOverrides.adminEditedWorkout || {
    daysPerWeek: 4,
    days: [
      {
        id: 'day_1',
        dayNumber: 1,
        dayName: 'Day 1 — Push (Chest & Shoulders)',
        workouts: [
          { id: 'w_101', name: 'Flat Barbell Bench Press', muscleGroup: 'Chest', sets: 4, reps: 8 },
          { id: 'w_102', name: 'Seated Dumbbell Shoulder Press', muscleGroup: 'Shoulder', sets: 3, reps: 10 }
        ]
      },
      {
        id: 'day_2',
        dayNumber: 2,
        dayName: 'Day 2 — Pull (Back & Biceps)',
        workouts: [
          { id: 'w_103', name: 'Wide-Grip Lat Pulldown', muscleGroup: 'Back', sets: 4, reps: 10 },
          { id: 'w_104', name: 'Barbell Bicep Curl', muscleGroup: 'Bicep', sets: 3, reps: 12 }
        ]
      },
      {
        id: 'day_3',
        dayNumber: 3,
        dayName: 'Day 3 — Legs & Abs',
        workouts: [
          { id: 'w_105', name: 'Barbell Back Squat', muscleGroup: 'Leg', sets: 4, reps: 8 },
          { id: 'w_106', name: 'Hanging Leg Raise', muscleGroup: 'Abs', sets: 3, reps: 15 }
        ]
      },
      {
        id: 'day_4',
        dayNumber: 4,
        dayName: 'Day 4 — Arms & Conditioning',
        workouts: [
          { id: 'w_107', name: 'Tricep Rope Pushdown', muscleGroup: 'Tricep', sets: 3, reps: 12 }
        ]
      }
    ]
  };

  const [daysPerWeek, setDaysPerWeek] = useState(existingWorkoutObj.daysPerWeek || 4);
  const [workoutDays, setWorkoutDays] = useState(existingWorkoutObj.days || []);

  // =========================================================================
  // 2. DIET STATE (Macro Targets + Custom Meals + Foods)
  // =========================================================================
  const [dietForm, setDietForm] = useState({
    targetCalories: initialPlan.meta?.targetCalories || 2000,
    protein: initialPlan.meta?.protein || 180,
    carbs: initialPlan.meta?.carbs || 150,
    fats: initialPlan.meta?.fats || 50
  });

  const [userFoodSelections, setUserFoodSelections] = useState(() => getUserDietSelections(userId, goalKey));
  const [customMeals, setCustomMeals] = useState(rawUserOverrides.customMeals || []);

  // =========================================================================
  // 3. CARDIO STATE (Target Specs + Custom Protocols)
  // =========================================================================
  const [cardioForm, setCardioForm] = useState({
    title: initialPlan.cardio?.title || 'Incline Fat Loss Walk',
    totalDuration: initialPlan.cardio?.targetDurationMinutes || 45,
    incline: initialPlan.cardio?.inclineValue || 12,
    speed: initialPlan.cardio?.speedValue || 4.0
  });

  const [customCardioList, setCustomCardioList] = useState(rawUserOverrides.customCardioList || []);

  // Modal Dialogs & Confirmations
  const [showAddMealModal, setShowAddMealModal] = useState(false);
  const [newMealNameInput, setNewMealNameInput] = useState('');
  const [activeMealForFood, setActiveMealForFood] = useState(null); // meal id to add food
  const [newFoodInput, setNewFoodInput] = useState({ name: '', qty: '1 serving', cal: 200, p: 20, c: 20, f: 5 });

  const [showAddCardioModal, setShowAddCardioModal] = useState(false);
  const [newCardioInput, setNewCardioInput] = useState({ title: '', duration: 30, incline: 10, speed: 4.0 });

  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // { type, id, dayId, name }
  const [validationError, setValidationError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');

  if (!user) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto', textAlign: 'center' }}>
        <GlassCard style={{ padding: '3rem' }}>
          <h2>User Not Found</h2>
          <button onClick={() => navigate('/admin/users')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to User Control Center
          </button>
        </GlassCard>
      </div>
    );
  }

  // --- WORKOUT BUILDER HANDLERS ---
  const handleDaysPerWeekChange = (count) => {
    const num = parseInt(count);
    setDaysPerWeek(num);

    const currentDays = [...workoutDays];
    if (num > currentDays.length) {
      for (let i = currentDays.length + 1; i <= num; i++) {
        currentDays.push({
          id: `day_${Date.now()}_${i}`,
          dayNumber: i,
          dayName: `Day ${i} — Workout Protocol`,
          workouts: [
            { id: `w_${Date.now()}_1`, name: 'Barbell Compound Movement', muscleGroup: 'Chest', sets: 3, reps: 10 }
          ]
        });
      }
    } else if (num < currentDays.length) {
      currentDays.splice(num);
    }
    setWorkoutDays(currentDays);
  };

  const handleDayNameChange = (dayId, newName) => {
    setWorkoutDays(prev => prev.map(d => d.id === dayId ? { ...d, dayName: newName } : d));
  };

  const handleAddExerciseToDay = (dayId) => {
    setWorkoutDays(prev => prev.map(d => {
      if (d.id === dayId) {
        const newEx = {
          id: `w_${Date.now()}_${d.workouts.length + 1}`,
          name: 'Flat Barbell Bench Press',
          muscleGroup: 'Chest',
          sets: 3,
          reps: 10
        };
        return { ...d, workouts: [...d.workouts, newEx] };
      }
      return d;
    }));
  };

  const handleExerciseChange = (dayId, exId, field, value) => {
    setWorkoutDays(prev => prev.map(d => {
      if (d.id === dayId) {
        const updatedWos = d.workouts.map(w => {
          if (w.id === exId) {
            return {
              ...w,
              [field]: field === 'sets' || field === 'reps' ? parseInt(value) || 1 : value
            };
          }
          return w;
        });
        return { ...d, workouts: updatedWos };
      }
      return d;
    }));
  };

  const confirmDeleteExercise = (dayId, exId, exName) => {
    setDeleteConfirmation({ type: 'exercise', id: exId, dayId, name: exName });
  };

  const confirmDeleteDay = (dayId, dayName) => {
    setDeleteConfirmation({ type: 'day', id: dayId, name: dayName });
  };

  // --- DIET HANDLERS ---
  const handleAddMealSubmit = (e) => {
    e.preventDefault();
    if (!newMealNameInput.trim()) return;
    const newMeal = {
      id: `meal_${Date.now()}`,
      name: newMealNameInput.trim(),
      items: [
        { name: 'Oats & Berries', quantity: '1 bowl', calories: 250, protein: 12, carbs: 40, fats: 4 }
      ]
    };
    const updated = [...customMeals, newMeal];
    setCustomMeals(updated);
    setNewMealNameInput('');
    setShowAddMealModal(false);
  };

  const handleAddFoodToMealSubmit = (e) => {
    e.preventDefault();
    if (!activeMealForFood || !newFoodInput.name.trim()) return;

    setCustomMeals(prev => prev.map(m => {
      if (m.id === activeMealForFood) {
        const newItem = {
          name: newFoodInput.name.trim(),
          quantity: newFoodInput.qty,
          calories: parseInt(newFoodInput.cal) || 200,
          protein: parseInt(newFoodInput.p) || 20,
          carbs: parseInt(newFoodInput.c) || 20,
          fats: parseInt(newFoodInput.f) || 5
        };
        return { ...m, items: [...m.items, newItem] };
      }
      return m;
    }));

    setActiveMealForFood(null);
    setNewFoodInput({ name: '', qty: '1 serving', cal: 200, p: 20, c: 20, f: 5 });
  };

  const confirmDeleteMeal = (mealId, mealName) => {
    setDeleteConfirmation({ type: 'meal', id: mealId, name: mealName });
  };

  // --- CARDIO HANDLERS ---
  const handleAddCardioSubmit = (e) => {
    e.preventDefault();
    if (!newCardioInput.title.trim()) return;
    const newCardio = {
      id: `cardio_${Date.now()}`,
      title: newCardioInput.title.trim(),
      duration: parseInt(newCardioInput.duration) || 30,
      incline: parseInt(newCardioInput.incline) || 10,
      speed: parseFloat(newCardioInput.speed) || 4.0
    };
    setCustomCardioList([...customCardioList, newCardio]);
    setNewCardioInput({ title: '', duration: 30, incline: 10, speed: 4.0 });
    setShowAddCardioModal(false);
  };

  const confirmDeleteCardio = (cardioId, cardioTitle) => {
    setDeleteConfirmation({ type: 'cardio', id: cardioId, name: cardioTitle });
  };

  // EXECUTE CONFIRMED DELETION
  const executeDelete = () => {
    if (!deleteConfirmation) return;
    const { type, id, dayId } = deleteConfirmation;

    if (type === 'exercise') {
      setWorkoutDays(prev => prev.map(d => {
        if (d.id === dayId) {
          return { ...d, workouts: d.workouts.filter(w => w.id !== id) };
        }
        return d;
      }));
    } else if (type === 'day') {
      setWorkoutDays(prev => prev.filter(d => d.id !== id));
      setDaysPerWeek(prev => Math.max(1, prev - 1));
    } else if (type === 'meal') {
      setCustomMeals(prev => prev.filter(m => m.id !== id));
    } else if (type === 'cardio') {
      setCustomCardioList(prev => prev.filter(c => c.id !== id));
    }

    setDeleteConfirmation(null);
  };

  // SAVE ALL PLAN CUSTOMIZATIONS FOR SELECTED USER ONLY
  const handleSaveWorkoutPlan = (e) => {
    e.preventDefault();
    setValidationError('');

    // Validation
    if (workoutDays.length === 0) {
      setValidationError('Please configure at least 1 workout day.');
      return;
    }

    for (const d of workoutDays) {
      if (!d.dayName.trim()) {
        setValidationError(`Day ${d.dayNumber} requires a valid day name.`);
        return;
      }
      for (const w of d.workouts) {
        if (!w.name.trim()) {
          setValidationError(`Every workout entry in ${d.dayName} must have a name.`);
          return;
        }
      }
    }

    const workoutBuilderObj = {
      daysPerWeek,
      days: workoutDays
    };

    // 1. Save Workout Builder exclusively to user
    saveAdminCustomWorkout(user.id, goalKey, workoutBuilderObj);

    // 2. Save Diet & Macros
    saveUserPlanOverride(user.id, goalKey, 'meta', {
      ...initialPlan.meta,
      targetCalories: parseInt(dietForm.targetCalories) || 2000,
      protein: parseInt(dietForm.protein) || 180,
      carbs: parseInt(dietForm.carbs) || 150,
      fats: parseInt(dietForm.fats) || 50
    });

    saveUserDietSelections(user.id, goalKey, userFoodSelections);
    saveUserPlanOverride(user.id, goalKey, 'customMeals', customMeals);

    // 3. Save Cardio
    saveUserPlanOverride(user.id, goalKey, 'cardio', {
      ...initialPlan.cardio,
      title: cardioForm.title,
      totalDuration: `${cardioForm.totalDuration} minutes`,
      targetDurationMinutes: parseInt(cardioForm.totalDuration) || 45,
      incline: `${cardioForm.incline}%`,
      inclineValue: parseInt(cardioForm.incline) || 12,
      avgSpeed: `${cardioForm.speed} km/h`,
      speedValue: parseFloat(cardioForm.speed) || 4.0
    });
    saveUserPlanOverride(user.id, goalKey, 'customCardioList', customCardioList);

    setSaveSuccess(`Successfully saved customized workout, diet & cardio plan for ${user.name}!`);
    setTimeout(() => setSaveSuccess(''), 3500);
  };

  const muscleOptions = ['Chest', 'Back', 'Shoulder', 'Bicep', 'Tricep', 'Leg', 'Abs'];

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 4rem auto', width: '100%' }}>
      {/* Top Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button onClick={() => navigate(`/admin/users/${user.id}`)} className="btn-pastel-secondary">
          <ArrowLeft size={16} /> Back to {user.name}'s Progress
        </button>

        <span style={{
          background: 'var(--pastel-peach)',
          color: 'var(--pastel-peach-dark)',
          padding: '0.4rem 1rem',
          borderRadius: '9999px',
          fontWeight: 800,
          fontSize: '0.8rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Shield size={14} /> MASTER WORKOUT BUILDER
        </span>
      </div>

      {/* Title Header Card */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--pastel-baby-blue), var(--pastel-baby-pink))',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
          }}>
            <Sparkles size={28} style={{ color: 'var(--pastel-baby-blue-dark)' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0, letterSpacing: '-0.02em' }}>
              Custom Plan Builder for {user.name}
            </h1>
            <p style={{ color: 'var(--pastel-text-muted)', fontSize: '0.9rem', margin: '0.2rem 0 0 0', fontWeight: 600 }}>
              Active Goal: <strong style={{ color: 'var(--pastel-text-dark)' }}>{goalKey.toUpperCase()} PROTOCOL</strong> • Modifications belong exclusively to {user.name}.
            </p>
          </div>
        </div>
      </GlassCard>

      {validationError && (
        <div style={{ padding: '0.9rem 1.25rem', borderRadius: '1rem', background: 'var(--pastel-baby-pink)', color: 'var(--pastel-baby-pink-dark)', border: '1px solid rgba(247, 178, 198, 0.8)', marginBottom: '1.5rem', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /> {validationError}
        </div>
      )}

      {saveSuccess && (
        <div style={{ padding: '0.9rem 1.25rem', borderRadius: '1rem', background: 'var(--pastel-mint)', color: 'var(--pastel-mint-dark)', border: '1px solid rgba(116, 198, 157, 0.8)', marginBottom: '1.5rem', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={18} /> {saveSuccess}
        </div>
      )}

      {/* ========================================================== */}
      {/* PART 4 — ADMIN WORKOUT BUILDER */}
      {/* ========================================================== */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Dumbbell size={20} style={{ color: 'var(--pastel-mint-dark)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
                Workout Builder
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--pastel-text-muted)', fontWeight: 600 }}>
                Configure multi-day split, custom day names & exercise sets/reps
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: CHOOSE NUMBER OF WORKOUT DAYS PER WEEK */}
        <div style={{ background: 'var(--pastel-cream)', padding: '1.25rem', borderRadius: '1.15rem', marginBottom: '1.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginBottom: '0.65rem' }}>
            Workout Days / Week:
          </label>
          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            {[2, 3, 4, 5, 6].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => handleDaysPerWeekChange(num)}
                style={{
                  padding: '0.55rem 1.35rem',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  borderRadius: '0.85rem',
                  border: daysPerWeek === num ? '2px solid var(--pastel-mint-dark)' : '1px solid rgba(0,0,0,0.08)',
                  background: daysPerWeek === num ? 'var(--pastel-mint)' : '#ffffff',
                  color: daysPerWeek === num ? 'var(--pastel-mint-dark)' : 'var(--pastel-text-dark)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {num} Days
              </button>
            ))}
          </div>
        </div>

        {/* STEP 2 & 3: DAY STRUCTURE & EXERCISE ENTRIES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {workoutDays.map((day) => (
            <div key={day.id} style={{ border: '1.5px solid rgba(0,0,0,0.06)', borderRadius: '1.25rem', padding: '1.35rem', background: 'rgba(255,255,255,0.7)' }}>
              {/* Day Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: '240px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 900, background: 'var(--pastel-baby-blue)', color: 'var(--pastel-baby-blue-dark)', padding: '0.3rem 0.7rem', borderRadius: '9999px', flexShrink: 0 }}>
                    DAY {day.dayNumber}
                  </span>
                  <input
                    type="text"
                    className="glass-input"
                    value={day.dayName}
                    onChange={(e) => handleDayNameChange(day.id, e.target.value)}
                    placeholder="Day Name (e.g. Chest & Triceps)"
                    style={{ fontWeight: 800, fontSize: '1rem', padding: '0.45rem 0.85rem', flex: 1 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => handleAddExerciseToDay(day.id)}
                    className="btn-pastel-primary"
                    style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
                  >
                    <Plus size={14} /> Add Workout
                  </button>

                  {workoutDays.length > 1 && (
                    <button
                      type="button"
                      onClick={() => confirmDeleteDay(day.id, day.dayName)}
                      className="btn-pastel-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: 'var(--pastel-baby-pink-dark)', background: 'var(--pastel-baby-pink)' }}
                      title="Delete Day"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Workouts List inside Day */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {day.workouts.length === 0 ? (
                  <p style={{ fontSize: '0.82rem', color: 'var(--pastel-text-muted)', fontStyle: 'italic', margin: '0.5rem 0' }}>
                    No workouts added to this day yet. Click "+ Add Workout" above.
                  </p>
                ) : (
                  day.workouts.map((ex, exIndex) => (
                    <div key={ex.id} style={{ background: '#ffffff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '0.95rem', padding: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', alignItems: 'center' }}>
                      {/* Exercise Name */}
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--pastel-text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>
                          Workout {exIndex + 1} Name:
                        </label>
                        <input
                          type="text"
                          className="glass-input"
                          value={ex.name}
                          onChange={(e) => handleExerciseChange(day.id, ex.id, 'name', e.target.value)}
                          placeholder="e.g. Flat Barbell Bench Press"
                          style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem', fontWeight: 700, width: '100%' }}
                        />
                      </div>

                      {/* Muscle Group Dropdown */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--pastel-text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>
                          Muscle Group:
                        </label>
                        <select
                          className="glass-input"
                          value={ex.muscleGroup}
                          onChange={(e) => handleExerciseChange(day.id, ex.id, 'muscleGroup', e.target.value)}
                          style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem', fontWeight: 700, width: '100%' }}
                        >
                          {muscleOptions.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>

                      {/* Sets */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--pastel-text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>
                          Sets:
                        </label>
                        <select
                          className="glass-input"
                          value={ex.sets}
                          onChange={(e) => handleExerciseChange(day.id, ex.id, 'sets', e.target.value)}
                          style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem', fontWeight: 700, width: '100%' }}
                        >
                          {[1, 2, 3, 4, 5, 6].map(s => (
                            <option key={s} value={s}>{s} Sets</option>
                          ))}
                        </select>
                      </div>

                      {/* Reps */}
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--pastel-text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>
                          Reps:
                        </label>
                        <select
                          className="glass-input"
                          value={ex.reps}
                          onChange={(e) => handleExerciseChange(day.id, ex.id, 'reps', e.target.value)}
                          style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem', fontWeight: 700, width: '100%' }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(r => (
                            <option key={r} value={r}>{r} Reps</option>
                          ))}
                        </select>
                      </div>

                      {/* Delete Workout Button */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.2rem' }}>
                        <button
                          type="button"
                          onClick={() => confirmDeleteExercise(day.id, ex.id, ex.name)}
                          className="btn-pastel-secondary"
                          style={{ padding: '0.35rem 0.65rem', color: 'var(--pastel-baby-pink-dark)', background: 'var(--pastel-baby-pink)' }}
                          title="Delete Workout"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* ========================================================== */}
      {/* PART 5 — ADMIN DIET ADD MEAL & FOODS */}
      {/* ========================================================== */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-peach)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Utensils size={20} style={{ color: 'var(--pastel-peach-dark)' }} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
              Diet Customization
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowAddMealModal(true)}
            className="btn-pastel-primary"
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
          >
            <Plus size={14} /> Add Meal
          </button>
        </div>

        {/* Macro Targets Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Target Calories</label>
            <input
              type="number"
              className="glass-input"
              value={dietForm.targetCalories}
              onChange={(e) => setDietForm(prev => ({ ...prev, targetCalories: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Protein Target (g)</label>
            <input
              type="number"
              className="glass-input"
              value={dietForm.protein}
              onChange={(e) => setDietForm(prev => ({ ...prev, protein: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Carbs Target (g)</label>
            <input
              type="number"
              className="glass-input"
              value={dietForm.carbs}
              onChange={(e) => setDietForm(prev => ({ ...prev, carbs: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Fats Target (g)</label>
            <input
              type="number"
              className="glass-input"
              value={dietForm.fats}
              onChange={(e) => setDietForm(prev => ({ ...prev, fats: e.target.value }))}
            />
          </div>
        </div>

        {/* Custom Meals List */}
        {customMeals.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--pastel-text-dark)', textTransform: 'uppercase', margin: 0 }}>
              Custom Meals Added for {user.name} ({customMeals.length})
            </h4>

            {customMeals.map(meal => (
              <div key={meal.id} style={{ background: 'var(--pastel-cream)', borderRadius: '1rem', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--pastel-text-dark)', fontWeight: 800 }}>{meal.name}</strong>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setActiveMealForFood(meal.id)}
                      className="btn-pastel-primary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      <Plus size={12} /> Add Food
                    </button>

                    <button
                      type="button"
                      onClick={() => confirmDeleteMeal(meal.id, meal.name)}
                      className="btn-pastel-secondary"
                      style={{ padding: '0.35rem 0.65rem', color: 'var(--pastel-baby-pink-dark)', background: 'var(--pastel-baby-pink)' }}
                    >
                      <Trash2 size={13} /> Delete Meal
                    </button>
                  </div>
                </div>

                {/* Meal Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {meal.items.map((item, iIdx) => (
                    <div key={iIdx} style={{ background: '#ffffff', padding: '0.5rem 0.75rem', borderRadius: '0.65rem', fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700 }}>{item.name} ({item.quantity})</span>
                      <span style={{ color: 'var(--pastel-text-muted)' }}>{item.calories} kcal • {item.protein}P</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* ========================================================== */}
      {/* PART 6 — ADMIN CARDIO PROTOCOLS */}
      {/* ========================================================== */}
      <GlassCard hoverEffect={false} style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--pastel-baby-pink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartPulse size={20} style={{ color: 'var(--pastel-baby-pink-dark)' }} />
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--pastel-text-dark)', margin: 0 }}>
              Cardio Customization
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowAddCardioModal(true)}
            className="btn-pastel-primary"
            style={{ padding: '0.45rem 0.95rem', fontSize: '0.82rem' }}
          >
            <Plus size={14} /> Add Cardio
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Cardio Title</label>
            <input
              type="text"
              className="glass-input"
              value={cardioForm.title}
              onChange={(e) => setCardioForm(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Duration (min)</label>
            <input
              type="number"
              className="glass-input"
              value={cardioForm.totalDuration}
              onChange={(e) => setCardioForm(prev => ({ ...prev, totalDuration: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Inclination</label>
            <input
              type="number"
              className="glass-input"
              value={cardioForm.incline}
              onChange={(e) => setCardioForm(prev => ({ ...prev, incline: e.target.value }))}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--pastel-text-dark)', marginBottom: '0.3rem' }}>Speed (km/h)</label>
            <input
              type="number"
              step="0.5"
              className="glass-input"
              value={cardioForm.speed}
              onChange={(e) => setCardioForm(prev => ({ ...prev, speed: e.target.value }))}
            />
          </div>
        </div>

        {/* Custom Cardio List */}
        {customCardioList.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--pastel-text-dark)', textTransform: 'uppercase', margin: 0 }}>
              Custom Cardio Protocols ({customCardioList.length})
            </h4>
            {customCardioList.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--pastel-cream)', borderRadius: '0.85rem' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--pastel-text-dark)' }}>{c.title}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--pastel-text-muted)', display: 'block' }}>
                    {c.duration} min • Incline: {c.incline}% • Speed: {c.speed} km/h
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => confirmDeleteCardio(c.id, c.title)}
                  className="btn-pastel-secondary"
                  style={{ padding: '0.35rem 0.65rem', color: 'var(--pastel-baby-pink-dark)', background: 'var(--pastel-baby-pink)' }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* SAVE ALL BUTTON */}
      <button
        type="button"
        onClick={handleSaveWorkoutPlan}
        className="btn-pastel-primary"
        style={{ width: '100%', padding: '1.1rem', fontSize: '1.05rem', fontWeight: 800, justifyContent: 'center', borderRadius: '9999px', boxShadow: '0 8px 25px rgba(0,0,0,0.06)' }}
      >
        <Save size={20} /> Save Workout Plan for {user.name}
      </button>

      {/* ========================================================== */}
      {/* MODAL: ADD MEAL */}
      {/* ========================================================== */}
      {showAddMealModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <GlassCard hoverEffect={false} style={{ maxWidth: '420px', width: '100%', padding: '1.75rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Add New Meal</h3>
              <button onClick={() => setShowAddMealModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddMealSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>Meal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Evening Snack"
                  className="glass-input"
                  value={newMealNameInput}
                  onChange={(e) => setNewMealNameInput(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowAddMealModal(false)} className="btn-pastel-secondary">Cancel</button>
                <button type="submit" className="btn-pastel-primary">Create Meal</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: ADD FOOD TO MEAL */}
      {/* ========================================================== */}
      {activeMealForFood && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <GlassCard hoverEffect={false} style={{ maxWidth: '440px', width: '100%', padding: '1.75rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Add Food Item</h3>
              <button onClick={() => setActiveMealForFood(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddFoodToMealSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700 }}>Food Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Brown Rice"
                  className="glass-input"
                  value={newFoodInput.name}
                  onChange={(e) => setNewFoodInput(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700 }}>Quantity</label>
                <input
                  type="text"
                  placeholder="e.g. 150g"
                  className="glass-input"
                  value={newFoodInput.qty}
                  onChange={(e) => setNewFoodInput(prev => ({ ...prev, qty: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>Calories</label>
                  <input
                    type="number"
                    className="glass-input"
                    value={newFoodInput.cal}
                    onChange={(e) => setNewFoodInput(prev => ({ ...prev, cal: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>Protein</label>
                  <input
                    type="number"
                    className="glass-input"
                    value={newFoodInput.p}
                    onChange={(e) => setNewFoodInput(prev => ({ ...prev, p: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>Carbs</label>
                  <input
                    type="number"
                    className="glass-input"
                    value={newFoodInput.c}
                    onChange={(e) => setNewFoodInput(prev => ({ ...prev, c: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700 }}>Fats</label>
                  <input
                    type="number"
                    className="glass-input"
                    value={newFoodInput.f}
                    onChange={(e) => setNewFoodInput(prev => ({ ...prev, f: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setActiveMealForFood(null)} className="btn-pastel-secondary">Cancel</button>
                <button type="submit" className="btn-pastel-primary">Add Item</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: ADD CARDIO */}
      {/* ========================================================== */}
      {showAddCardioModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <GlassCard hoverEffect={false} style={{ maxWidth: '420px', width: '100%', padding: '1.75rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Add Cardio Protocol</h3>
              <button onClick={() => setShowAddCardioModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddCardioSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700 }}>Cardio Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Incline Walk"
                  className="glass-input"
                  value={newCardioInput.title}
                  onChange={(e) => setNewCardioInput(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>Duration (min)</label>
                  <input
                    type="number"
                    className="glass-input"
                    value={newCardioInput.duration}
                    onChange={(e) => setNewCardioInput(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>Inclination</label>
                  <input
                    type="number"
                    className="glass-input"
                    value={newCardioInput.incline}
                    onChange={(e) => setNewCardioInput(prev => ({ ...prev, incline: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700 }}>Speed</label>
                  <input
                    type="number"
                    step="0.5"
                    className="glass-input"
                    value={newCardioInput.speed}
                    onChange={(e) => setNewCardioInput(prev => ({ ...prev, speed: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowAddCardioModal(false)} className="btn-pastel-secondary">Cancel</button>
                <button type="submit" className="btn-pastel-primary">Add Cardio</button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: CONFIRM DELETION */}
      {/* ========================================================== */}
      {deleteConfirmation && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <GlassCard hoverEffect={false} style={{ maxWidth: '400px', width: '100%', padding: '1.75rem', background: '#ffffff', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--pastel-text-dark)', marginBottom: '0.5rem' }}>
              Delete {deleteConfirmation.name}?
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--pastel-text-muted)', marginBottom: '1.5rem' }}>
              Are you sure you want to delete this {deleteConfirmation.type}? This action will remove it from {user.name}'s plan.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmation(null)}
                className="btn-pastel-secondary"
                style={{ padding: '0.6rem 1.25rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeDelete}
                className="btn-pastel-primary"
                style={{ padding: '0.6rem 1.25rem', background: 'var(--pastel-baby-pink)', color: 'var(--pastel-baby-pink-dark)' }}
              >
                Delete
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
