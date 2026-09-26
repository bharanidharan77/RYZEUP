// Rebuilt Centralized Fitness Database for RYZEUP Fitness
// Enforces 15 100% Unique Workout Programs across CUT, BULK, and RECOMP
// Compliant with Firebase Cloud Firestore per-user schemas.

export const fitnessPlansData = {
  // =========================================================================
  // 1. CUT PLAN (Fat Loss & Muscle Retention)
  // Baseline: 3 Sets | Compounds 12–15 Reps | Isolation 15–18 Reps | Rest 45–75s | 2–3 RIR
  // =========================================================================
  cut: {
    meta: {
      goal: 'CUT',
      description: 'Fat Loss & Lean Muscle Retention Strategy',
      targetCalories: 2000,
      protein: 180,
      carbs: 150,
      fats: 50,
      fiber: 30
    },
    cardio: {
      title: 'High-Efficiency Fat Burning Cardio',
      type: 'Incline Treadmill Walk & HIIT Cycling',
      intensity: 'Moderate-High',
      totalDuration: '35 minutes',
      avgSpeed: '5.2 km/h',
      incline: '4.5%',
      phases: {
        warmup: { duration: '5 mins', activity: 'Flat Treadmill Walk', speed: '4.2 km/h', incline: '0%' },
        main: { duration: '25 mins', activity: 'Incline Treadmill Walk', speed: '5.5 km/h', incline: '5.0%' },
        cooldown: { duration: '5 mins', activity: 'Flat Recovery Walk', speed: '3.8 km/h', incline: '0%' }
      },
      notes: 'Cardio is placed post-workout or in the morning to maximize fat oxidation while maintaining caloric deficit.'
    },
    diet: {
      dailyTotals: { calories: 2000, protein: 180, carbs: 150, fats: 50, fiber: 30 },
      meals: {
        breakfast: {
          name: 'Breakfast — High Protein Fuel',
          items: [
            { name: 'Rolled Oats', quantity: '60 g', calories: 230, protein: 8, carbs: 40, fats: 4, fiber: 6 },
            { name: 'Egg Whites', quantity: '200 g (approx 6 whites)', calories: 104, protein: 22, carbs: 1, fats: 0, fiber: 0 },
            { name: 'Whole Egg', quantity: '1 large', calories: 72, protein: 6, carbs: 0.5, fats: 5, fiber: 0 },
            { name: 'Blueberries', quantity: '80 g', calories: 45, protein: 0.5, carbs: 11, fats: 0.2, fiber: 2 }
          ],
          subtotal: { calories: 451, protein: 36.5, carbs: 52.5, fats: 9.2, fiber: 8 }
        },
        lunch: {
          name: 'Lunch — Lean Protein & Complex Carbs',
          items: [
            { name: 'Grilled Chicken Breast', quantity: '180 g', calories: 295, protein: 55, carbs: 0, fats: 6, fiber: 0 },
            { name: 'Cooked Basmati Rice', quantity: '120 g', calories: 156, protein: 3.5, carbs: 34, fats: 0.4, fiber: 1 },
            { name: 'Steamed Broccoli', quantity: '150 g', calories: 50, protein: 4, carbs: 10, fats: 0.5, fiber: 4 }
          ],
          subtotal: { calories: 501, protein: 62.5, carbs: 44, fats: 6.9, fiber: 5 }
        },
        snack: {
          name: 'Snack / Pre-Workout',
          items: [
            { name: 'Whey Protein Isolate', quantity: '1 scoop (30g)', calories: 115, protein: 25, carbs: 2, fats: 1, fiber: 0 },
            { name: 'Green Apple', quantity: '1 medium (150g)', calories: 80, protein: 0.4, carbs: 21, fats: 0.3, fiber: 4.4 },
            { name: 'Raw Almonds', quantity: '15 g', calories: 87, protein: 3, carbs: 3, fats: 7.5, fiber: 1.8 }
          ],
          subtotal: { calories: 282, protein: 28.4, carbs: 26, fats: 8.8, fiber: 6.2 }
        },
        dinner: {
          name: 'Dinner — Lean Fish & Greens',
          items: [
            { name: 'Baked White Fish / Cod', quantity: '200 g', calories: 210, protein: 44, carbs: 0, fats: 2.5, fiber: 0 },
            { name: 'Roasted Sweet Potato', quantity: '120 g', calories: 108, protein: 2, carbs: 25, fats: 0.2, fiber: 3.8 },
            { name: 'Mixed Leaf Salad & Olive Oil', quantity: '1 bowl + 1 tsp oil', calories: 65, protein: 1, carbs: 3, fats: 5, fiber: 2 }
          ],
          subtotal: { calories: 383, protein: 47, carbs: 28, fats: 7.7, fiber: 5.8 }
        }
      }
    },
    workout: {
      '2days': {
        summary: {
          goal: 'CUT',
          frequency: '2 Days / Week',
          focus: 'Upper / Lower Fatigue-Controlled Maintenance Split',
          weeklyVolume: 'Moderate (12 Sets per day)',
          intensity: 'Moderate Weight (2–3 Reps in Reserve)',
          repPhilosophy: 'Compounds 12–15 Reps | Isolation 15–18 Reps',
          restPhilosophy: '45–60 Seconds Short Recovery',
          progressiveOverload: 'Increase reps to top of range before increasing load.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Upper Body Density',
            muscles: 'Chest, Back, Shoulders, Arms',
            exercises: [
              { exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2-3 RIR', variation: '30-degree incline bench', instructions: 'Control 3-sec eccentric lowering phase.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Wide-Grip Lat Pulldown', targetMuscle: 'Lats & Upper Back', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2-3 RIR', variation: 'Pronated wide grip', instructions: 'Pull smoothly to upper chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Dumbbell Shoulder Press', targetMuscle: 'Front/Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2-3 RIR', variation: 'Seated 90-degree bench', instructions: 'Press without hyperextending back.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Chest Fly (High-to-Low)', targetMuscle: 'Lower/Inner Chest', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Light-Moderate, 2 RIR', variation: 'High cable crossover', instructions: 'Cross hands at bottom contraction.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Straight-Arm Rope Pulldown', targetMuscle: 'Lats & Serratus', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Light-Moderate, 2 RIR', variation: 'Cable rope attachment', instructions: 'Keep arms extended, squeeze lats.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Bayesian Cable Bicep Curl', targetMuscle: 'Biceps Long Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Light-Moderate, 2 RIR', variation: 'Behind-the-back cable', instructions: 'Maintain shoulder extension throughout.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Lower Body & Core Burn',
            muscles: 'Quads, Hamstrings, Calves, Core',
            exercises: [
              { exerciseName: 'Goblet Dumbbell Squat', targetMuscle: 'Quads & Glutes', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2-3 RIR', variation: 'Dumbbell at chest', instructions: 'Squat deep with upright torso.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Dumbbell Romanian Deadlift', targetMuscle: 'Hamstrings & Glutes', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2-3 RIR', variation: 'Dumbbells at sides', instructions: 'Hinge hips backward until stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Leg Press (Wide High Stance)', targetMuscle: 'Glutes & Hamstrings', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: '45-degree Leg Press', instructions: 'Press through heels.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Machine Leg Extension', targetMuscle: 'Quads Isolation', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Seated machine', instructions: 'Pause 1-sec at full extension.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves (Gastrocnemius)', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Smith machine / Calves block', instructions: 'Deep stretch at bottom.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Hanging Knee Raise', targetMuscle: 'Lower Abs', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Bodyweight, 2 RIR', variation: 'Captain’s chair / pullup bar', instructions: 'Control swing, flex pelvis upward.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '3days': {
        summary: {
          goal: 'CUT',
          frequency: '3 Days / Week',
          focus: 'Push / Pull / Legs High-Efficiency Circuit',
          weeklyVolume: 'Moderate High Reps',
          intensity: 'Moderate Weight (2 RIR)',
          repPhilosophy: 'Compounds 12–15 Reps | Isolation 15–18 Reps',
          restPhilosophy: '45–60 Seconds Recovery',
          progressiveOverload: 'Maximize rep capacity prior to weight increases.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Push (Chest, Shoulders, Triceps)',
            muscles: 'Chest, Delts, Triceps',
            exercises: [
              { exerciseName: 'Incline Machine Chest Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Plate-loaded Machine', instructions: 'Focus on upper chest contraction.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Cable Fly (Mid-Height)', targetMuscle: 'Mid Chest', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Dual cable handles', instructions: 'Hug a barrel movement pattern.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Behind back cable', instructions: 'Lead raise with elbows.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Arnold Dumbbell Press', targetMuscle: 'Front & Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Seated DB press', instructions: 'Rotate palms outward as you press.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Tricep Cable Rope Pushdown', targetMuscle: 'Triceps Lateral Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Rope attachment', instructions: 'Spread handles apart at bottom.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Pull (Back, Rear Delts, Biceps)',
            muscles: 'Lats, Upper Back, Rear Delts, Biceps',
            exercises: [
              { exerciseName: 'Neutral-Grip Lat Pulldown', targetMuscle: 'Lats & Lower Trap', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'V-Bar handle', instructions: 'Pull to sternum.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Single-Arm Dumbbell Row', targetMuscle: 'Latissimus Dorsi', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Bench-supported', instructions: 'Drive elbow towards hip.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Face Pull', targetMuscle: 'Rear Delts & Upper Traps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Rope at eye level', instructions: 'Pull rope to ears, rotate shoulders.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Incline Dumbbell Curl', targetMuscle: 'Biceps Long Head', sets: 3, repRange: '12-15', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Alternating arms', instructions: 'Full arm extension stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Preacher Curl', targetMuscle: 'Biceps Short Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'EZ bar cable attachment', instructions: 'Constant cable tension at top.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 3,
            dayName: 'Day 3 — Legs & Core Pump',
            muscles: 'Quads, Hamstrings, Glutes, Calves',
            exercises: [
              { exerciseName: 'Leg Press (Narrow Stance)', targetMuscle: 'Quads Outer Sweep', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2 RIR', variation: 'Feet low on sled', instructions: 'Lower sled until knees reach 90 degrees.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lying Leg Curl', targetMuscle: 'Hamstrings Isolation', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Squeeze hamstrings at top.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Dumbbell Walking Lunges', targetMuscle: 'Quads & Glutes', sets: 3, repRange: '12-15 (per leg)', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Dumbbells held at sides', instructions: 'Step long, keep torso upright.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Calf Raise', targetMuscle: 'Soleus / Calves', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Hold stretch 2s at bottom.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Abdominal Cable Crunch', targetMuscle: 'Rectus Abdominis', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Rope on knees', instructions: 'Flex upper spine downward.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '4days': {
        summary: {
          goal: 'CUT',
          frequency: '4 Days / Week',
          focus: 'Targeted Bodypart Split (Chest+Tri, Back+Bi, Shoulders, Legs)',
          weeklyVolume: 'Moderate Volume per Muscle',
          intensity: 'Controlled Fatigue (2 RIR)',
          repPhilosophy: 'Compounds 12–15 Reps | Isolation 15–18 Reps',
          restPhilosophy: '45–60 Seconds Rest',
          progressiveOverload: 'Rep progression first to avoid joint strain during deficit.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Chest & Triceps (Deficit Focus)',
            muscles: 'Chest & Triceps',
            exercises: [
              { exerciseName: 'Flat Dumbbell Bench Press', targetMuscle: 'Mid Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Neutral-to-pronated grip', instructions: 'Lower dumbbells deep, press up.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Incline Cable Chest Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Incline bench between cables', instructions: 'Constant tension across chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Pec Deck Flye', targetMuscle: 'Chest Isolation', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Seated machine', instructions: 'Squeeze handles together at center.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Overhead Cable Rope Extension', targetMuscle: 'Triceps Long Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Facing away from pulley', instructions: 'Extend arms fully overhead.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Single-Arm Tricep Cable Pushdown', targetMuscle: 'Triceps Lateral Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'No attachment handle', instructions: 'Lock elbow at side, pull down.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Back & Biceps (Deficit Focus)',
            muscles: 'Back & Biceps',
            exercises: [
              { exerciseName: 'Chest-Supported Machine Row', targetMuscle: 'Mid Back & Rhomboids', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Neutral grip handles', instructions: 'Pull elbows back without lower back strain.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lat Pulldown (Reverse Grip)', targetMuscle: 'Lower Lats', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Underhand shoulder-width', instructions: 'Pull bar to collarbone.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Single-Arm Cable High Row', targetMuscle: 'Upper Lat & Rear Delt', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'High pulley kneeling', instructions: 'Drive elbow past torso.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'EZ-Bar Cable Bicep Curl', targetMuscle: 'Biceps Overall', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Low cable pulley', instructions: 'Strict movement, no hip swing.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Dumbbell Hammer Curl', targetMuscle: 'Brachialis & Forearms', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Seated neutral grip', instructions: 'Curl dumbbell directly upward.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 3,
            dayName: 'Day 3 — Deltoids & Core (Deficit Focus)',
            muscles: 'Front, Side, Rear Delts & Core',
            exercises: [
              { exerciseName: 'Machine Overhead Shoulder Press', targetMuscle: 'Front & Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Seated machine', instructions: 'Controlled press overhead.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Slight forward lean', instructions: 'Raise dumbbells to shoulder height.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Reverse Pec Deck Flye', targetMuscle: 'Rear Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Chest against pad', instructions: 'Fly arms outwards.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Dumbbell Front Raise', targetMuscle: 'Front Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Alternating arms', instructions: 'Raise to eye level.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Decline Bench Sit-Up', targetMuscle: 'Upper Abs', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Bodyweight, 2 RIR', variation: 'Decline bench', instructions: 'Flex abdominals at top.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 4,
            dayName: 'Day 4 — Leg Conditioning & Calves',
            muscles: 'Quads, Hamstrings, Calves',
            exercises: [
              { exerciseName: 'Hack Squat Machine', targetMuscle: 'Quads Focus', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2 RIR', variation: 'Shoulder-width stance', instructions: 'Squat deep into quad stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Leg Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Seated machine', instructions: 'Smooth flex & extension.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Bulgarian Split Squat', targetMuscle: 'Quads & Glutes', sets: 3, repRange: '12-15 (per leg)', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Rear foot elevated on bench', instructions: 'Keep front knee tracking straight.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Leg Press Calf Press', targetMuscle: 'Calves', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Toes on sled edge', instructions: 'Extend ankles fully.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Ab Wheel Rollout', targetMuscle: 'Core Stability', sets: 3, repRange: '12-15', restSeconds: 45, intensity: 'Bodyweight, 2 RIR', variation: 'Kneeling', instructions: 'Roll out slowly keeping core braced.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '5days': {
        summary: {
          goal: 'CUT',
          frequency: '5 Days / Week',
          focus: 'Single Muscle Group Density Split',
          weeklyVolume: 'Moderate Volume (15 Sets per day)',
          intensity: 'Strict 2 RIR Fatigue Control',
          repPhilosophy: 'Compounds 12–15 Reps | Isolation 15–18 Reps',
          restPhilosophy: '45–60 Seconds Rest',
          progressiveOverload: 'Prioritize rep quality & muscle burn over heavy loads.'
        },
        days: [
          { dayNumber: 1, dayName: 'Day 1 — Chest Density', muscles: 'Chest Isolation & Flyes', exercises: [ { exerciseName: 'Incline Dumbbell Flye', targetMuscle: 'Upper Chest', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: '30-deg bench', instructions: 'Feel deep chest stretch.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Flat Barbell Bench Press', targetMuscle: 'Mid Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Medium grip', instructions: 'Touch chest lightly.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Crossover (Low to High)', targetMuscle: 'Upper/Inner Chest', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Low pulleys', instructions: 'Scoop hands upward.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Push-Ups', targetMuscle: 'Chest Finisher', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Bodyweight, 2 RIR', variation: 'Standard', instructions: 'Pump out rep count.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 2, dayName: 'Day 2 — Back Sculpt', muscles: 'Lats & Mid Back', exercises: [ { exerciseName: 'Lat Pulldown (Wide Grip)', targetMuscle: 'Upper Lats', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Lat bar', instructions: 'Pull to collarbone.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Cable Row (Wide Neutral)', targetMuscle: 'Rhomboids', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Wide lat bar handle', instructions: 'Squeeze shoulder blades.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm High Pulldown', targetMuscle: 'Lower Lat', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Kneeling single cable', instructions: 'Pull elbow straight to hip.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Dumbbell Shrugs', targetMuscle: 'Upper Traps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Standing DB', instructions: 'Shrug upwards.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 3, dayName: 'Day 3 — Deltoid Isolation', muscles: 'Shoulder 3 Heads', exercises: [ { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Dumbbells', instructions: 'Pinky slightly raised at top.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Rear Delt Flye', targetMuscle: 'Rear Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Cross cables no handle', instructions: 'Pull cables apart across body.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Dumbbell OHP', targetMuscle: 'Front Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Dumbbells', instructions: 'Press overhead smoothly.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Dumbbell Front Raise', targetMuscle: 'Front Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Alternating', instructions: 'Raise to eye level.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 4, dayName: 'Day 4 — Leg Conditioning', muscles: 'Quads, Hams, Glutes', exercises: [ { exerciseName: 'Leg Press', targetMuscle: 'Quads', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2 RIR', variation: 'Standard foot placement', instructions: 'Press through foot arches.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lying Leg Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Curling motion.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Machine Leg Extension', targetMuscle: 'Quads', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Pause 1s at top.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Full ankle extension.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 5, dayName: 'Day 5 — Arm Hypertrophy & Core', muscles: 'Biceps, Triceps, Core', exercises: [ { exerciseName: 'EZ-Bar Bicep Curl', targetMuscle: 'Biceps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Inner grip', instructions: 'Strict curls.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Tricep Straight Bar Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Cable', instructions: 'Press down.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Dumbbell Hammer Curl', targetMuscle: 'Brachialis', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Neutral DB', instructions: 'Curl up.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Overhead DB Tricep Extension', targetMuscle: 'Triceps Long Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Two hand DB', instructions: 'Extend arms.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Plank Hold', targetMuscle: 'Core Stability', sets: 3, repRange: '45-60s hold', restSeconds: 45, intensity: 'Bodyweight', variation: 'Elbow plank', instructions: 'Keep body in straight line.', imageUrl: '', videoUrl: '' } ] }
        ]
      },

      '6days': {
        summary: {
          goal: 'CUT',
          frequency: '6 Days / Week',
          focus: 'PPL A/B Alternating Fat-Loss Volume Split',
          weeklyVolume: 'High Frequency, Moderate Daily Load',
          intensity: 'Strict 2–3 RIR (Avoid central nervous system burn out)',
          repPhilosophy: 'Compounds 12–15 Reps | Isolation 15–18 Reps',
          restPhilosophy: '45–60 Seconds Short Rest',
          progressiveOverload: 'Push A and Push B use completely distinct exercise selections.'
        },
        days: [
          { dayNumber: 1, dayName: 'Push A (Chest Focus)', muscles: 'Upper Chest & Side Delts', exercises: [ { exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: '30-deg bench', instructions: 'Deep chest stretch.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Machine Chest Press', targetMuscle: 'Mid Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Flat machine', instructions: 'Press forward.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Dumbbell', instructions: 'Raise side delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Tricep Rope Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Rope cable', instructions: 'Spread handles.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 2, dayName: 'Pull A (Lat Focus)', muscles: 'Lats & Biceps', exercises: [ { exerciseName: 'Wide-Grip Lat Pulldown', targetMuscle: 'Wide Lats', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Lat bar', instructions: 'Pull to chest.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Cable Row (V-Bar)', targetMuscle: 'Mid Back', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Close V-bar', instructions: 'Squeeze back.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Dumbbell Curl', targetMuscle: 'Biceps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Alternating arms', instructions: 'Curl up.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Face Pull', targetMuscle: 'Rear Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Rope', instructions: 'Pull to ears.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 3, dayName: 'Legs A (Quad Focus)', muscles: 'Quads & Calves', exercises: [ { exerciseName: 'Goblet Squat', targetMuscle: 'Quads', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2 RIR', variation: 'Dumbbell', instructions: 'Deep squat.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Leg Extension', targetMuscle: 'Quads', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Squeeze quads.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Full stretch.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Hanging Knee Raise', targetMuscle: 'Abs', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Bodyweight', variation: 'Bar', instructions: 'Raise knees.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 4, dayName: 'Push B (Shoulder Focus)', muscles: 'Delts & Triceps', exercises: [ { exerciseName: 'Seated Dumbbell Shoulder Press', targetMuscle: 'Front Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Dumbbells', instructions: 'Press overhead.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Chest Flye (Mid Height)', targetMuscle: 'Mid Chest', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Dual cables', instructions: 'Flye together.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Low cable', instructions: 'Constant tension.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm Cable Extension', targetMuscle: 'Triceps', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Cable', instructions: 'Extend arm.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 5, dayName: 'Pull B (Upper Back Focus)', muscles: 'Rhomboids, Rear Delts & Biceps', exercises: [ { exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Upper Back', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Overhand grip', instructions: 'Pull to ribs.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm DB Row', targetMuscle: 'Lats', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Dumbbell', instructions: 'Drive elbow back.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Preacher EZ-Bar Curl', targetMuscle: 'Biceps Short Head', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Preacher bench', instructions: 'Isolated bicep curl.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Reverse Pec Deck', targetMuscle: 'Rear Delts', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Fly rear delts.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 6, dayName: 'Legs B (Hamstring Focus)', muscles: 'Hamstrings & Glutes', exercises: [ { exerciseName: 'Dumbbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 3, repRange: '12-15', restSeconds: 75, intensity: 'Moderate, 2 RIR', variation: 'Dumbbells', instructions: 'Hinge at hips.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Leg Press (Wide Stance)', targetMuscle: 'Glutes & Quads', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate, 2 RIR', variation: 'Sled', instructions: 'Press heels.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lying Leg Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Curl hamstrings.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Machine', instructions: 'Ankle extension.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Ab Cable Crunch', targetMuscle: 'Abs', sets: 3, repRange: '15-18', restSeconds: 45, intensity: 'Moderate, 2 RIR', variation: 'Rope cable', instructions: 'Flex spine.', imageUrl: '', videoUrl: '' } ] }
        ]
      }
    }
  },

  // =========================================================================
  // 2. BULK PLAN (Hypertrophy & Progressive Overload)
  // Baseline: 3–4 Sets | Compounds 6–10 Reps | Isolation 10–15 Reps | Rest 90–150s | 1–2 RIR
  // =========================================================================
  bulk: {
    meta: {
      goal: 'BULK',
      description: 'Maximum Muscle Hypertrophy & Calorie Surplus Strategy',
      targetCalories: 2800,
      protein: 190,
      carbs: 340,
      fats: 70,
      fiber: 35
    },
    cardio: {
      title: 'Controlled Low-Intensity Active Recovery Cardio',
      type: 'Light Incline Walk',
      intensity: 'Low',
      totalDuration: '15 minutes',
      avgSpeed: '4.2 km/h',
      incline: '2.0%',
      phases: {
        warmup: { duration: '3 mins', activity: 'Flat Walk', speed: '3.8 km/h', incline: '0%' },
        main: { duration: '10 mins', activity: 'Gentle Walk', speed: '4.5 km/h', incline: '2.0%' },
        cooldown: { duration: '2 mins', activity: 'Easy Walk', speed: '3.5 km/h', incline: '0%' }
      },
      notes: 'Cardio is kept brief to preserve all surplus calories for muscle synthesis and systemic recovery.'
    },
    diet: {
      dailyTotals: { calories: 2800, protein: 190, carbs: 340, fats: 70, fiber: 35 },
      meals: {
        breakfast: {
          name: 'Breakfast — High Calorie Mass Builder',
          items: [
            { name: 'Whole Grain Oats', quantity: '100 g', calories: 380, protein: 13, carbs: 67, fats: 7, fiber: 10 },
            { name: 'Whole Eggs', quantity: '3 large', calories: 216, protein: 18, carbs: 1.5, fats: 15, fiber: 0 },
            { name: 'Whole Milk', quantity: '250 ml', calories: 150, protein: 8, carbs: 12, fats: 8, fiber: 0 },
            { name: 'Banana', quantity: '1 large', calories: 120, protein: 1.5, carbs: 31, fats: 0.4, fiber: 3.5 }
          ],
          subtotal: { calories: 866, protein: 40.5, carbs: 111.5, fats: 30.4, fiber: 13.5 }
        },
        lunch: {
          name: 'Lunch — Heavy Anabolic Plate',
          items: [
            { name: 'Lean Ground Beef (90/10)', quantity: '200 g', calories: 350, protein: 40, carbs: 0, fats: 20, fiber: 0 },
            { name: 'Jasmine White Rice', quantity: '250 g cooked', calories: 325, protein: 6, carbs: 72, fats: 0.8, fiber: 1.5 },
            { name: 'Avocado', quantity: '50 g', calories: 80, protein: 1, carbs: 4, fats: 7.5, fiber: 3.4 }
          ],
          subtotal: { calories: 755, protein: 47, carbs: 76, fats: 28.3, fiber: 4.9 }
        },
        snack: {
          name: 'Snack / Pre-Workout Shake',
          items: [
            { name: 'Whey Protein Blend', quantity: '1.5 scoops (45g)', calories: 180, protein: 36, carbs: 4, fats: 2, fiber: 0 },
            { name: 'Peanut Butter', quantity: '30 g (2 tbsp)', calories: 190, protein: 8, carbs: 7, fats: 16, fiber: 2 },
            { name: 'Quick Oats (in shake)', quantity: '40 g', calories: 150, protein: 5, carbs: 27, fats: 2.5, fiber: 4 }
          ],
          subtotal: { calories: 520, protein: 49, carbs: 38, fats: 20.5, fiber: 6 }
        },
        dinner: {
          name: 'Dinner — Recovery & Muscle Growth Meal',
          items: [
            { name: 'Chicken Thighs (Skinless)', quantity: '200 g', calories: 330, protein: 48, carbs: 0, fats: 14, fiber: 0 },
            { name: 'Mashed Potatoes (with butter)', quantity: '250 g', calories: 270, protein: 5, carbs: 52, fats: 6, fiber: 4 },
            { name: 'Steamed Asparagus', quantity: '100 g', calories: 20, protein: 2.2, carbs: 4, fats: 0.2, fiber: 2 }
          ],
          subtotal: { calories: 620, protein: 55.2, carbs: 56, fats: 20.2, fiber: 6 }
        }
      }
    },
    workout: {
      '2days': {
        summary: {
          goal: 'BULK',
          frequency: '2 Days / Week',
          focus: 'Heavy Upper / Lower Compound Overload Program',
          weeklyVolume: 'High Load per Session (14 Heavy Sets)',
          intensity: 'Heavy / Moderate-Heavy (1–2 Reps in Reserve)',
          repPhilosophy: 'Compounds 6–10 Reps | Isolation 10–15 Reps',
          restPhilosophy: '90–120 Seconds Long Recovery',
          progressiveOverload: 'Increase weight once top rep target (10 reps) is achieved with clean form.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Heavy Upper Compound Strength',
            muscles: 'Chest, Lats, Shoulders, Arms',
            exercises: [
              { exerciseName: 'Barbell Flat Bench Press', targetMuscle: 'Mid Chest', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Standard barbell grip', instructions: 'Drive feet into floor, press explosively.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Weighted Pull-Up / Lat Pulldown', targetMuscle: 'Latissimus Dorsi', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Pronated grip', instructions: 'Full extension to chin over bar.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Barbell Overhead Press', targetMuscle: 'Front Deltoids', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Strict standing press', instructions: 'Press overhead without hip dip.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Chest-Supported T-Bar Row', targetMuscle: 'Mid Back & Rhomboids', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Neutral grip handle', instructions: 'Squeeze shoulder blades together hard.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'EZ-Bar Skull Crusher', targetMuscle: 'Triceps Long & Lateral', sets: 3, repRange: '10-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Incline bench EZ-bar', instructions: 'Lower bar behind head, extend arms.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Heavy Incline Dumbbell Curl', targetMuscle: 'Biceps Long Head', sets: 3, repRange: '10-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: '45-degree bench', instructions: 'Maintain shoulder extension stretch.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Heavy Lower Compound Mass',
            muscles: 'Quads, Hamstrings, Glutes, Calves',
            exercises: [
              { exerciseName: 'Barbell Back Squat (High Bar)', targetMuscle: 'Quads & Glutes', sets: 4, repRange: '6-8', restSeconds: 150, intensity: 'Heavy, 1-2 RIR', variation: 'High bar stance', instructions: 'Squat below parallel, drive up through heels.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Conventional Barbell Deadlift', targetMuscle: 'Posterior Chain & Hamstrings', sets: 3, repRange: '6-8', restSeconds: 150, intensity: 'Heavy, 1 RIR', variation: 'Conventional stance', instructions: 'Keep bar path close to shins.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Leg Press (Heavy 45-Degree)', targetMuscle: 'Quads Bulk', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Medium foot stance', instructions: 'Lower sled deep without lower back lift.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lying Hamstring Leg Curl', targetMuscle: 'Hamstrings Isolation', sets: 3, repRange: '10-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Controlled 2-sec lowering.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Heavy Smith Calf Raise', targetMuscle: 'Gastrocnemius', sets: 4, repRange: '10-12', restSeconds: 75, intensity: 'Heavy, 1 RIR', variation: 'Block under toes', instructions: 'Pause 1s at top extension.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '3days': {
        summary: {
          goal: 'BULK',
          frequency: '3 Days / Week',
          focus: 'Heavy Push / Pull / Legs Hypertrophy Split',
          weeklyVolume: 'High Intensity per Muscle Group',
          intensity: 'Heavy / Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 6–10 Reps | Isolation 10–15 Reps',
          restPhilosophy: '90–120 Seconds Rest',
          progressiveOverload: 'Focus on adding weight to primary compound movements.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Push (Heavy Hypertrophy)',
            muscles: 'Chest, Shoulders, Triceps',
            exercises: [
              { exerciseName: 'Incline Barbell Bench Press', targetMuscle: 'Upper Chest', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: '30-degree incline', instructions: 'Lower with control to upper sternum.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Flat Dumbbell Press', targetMuscle: 'Mid Chest', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Flat bench DB', instructions: 'Deep stretch at bottom.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Heavy Dumbbell Press', targetMuscle: 'Front Deltoids', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Seated bench', instructions: 'Press overhead to full lock.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Behind back cable', instructions: 'Constant cable load.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Weighted Parallel Bar Dips', targetMuscle: 'Triceps & Lower Chest', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Dip belt weighted', instructions: 'Keep torso upright for triceps.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Pull (Heavy Hypertrophy)',
            muscles: 'Back & Biceps',
            exercises: [
              { exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Mid Back', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Overhand grip', instructions: 'Pull bar to lower ribs.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lat Pulldown (Neutral V-Bar)', targetMuscle: 'Latissimus Dorsi', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'V-Bar handle', instructions: 'Pull to upper chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Single-Arm Dumbbell Row', targetMuscle: 'Lats & Rhomboids', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Bench supported', instructions: 'Heavy row, drive elbow back.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Barbell Bicep Curl', targetMuscle: 'Biceps Overall', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Straight barbell', instructions: 'No swinging, strict curl.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Dumbbell Hammer Curl', targetMuscle: 'Brachialis & Forearms', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Neutral grip', instructions: 'Squeeze top contraction.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 3,
            dayName: 'Day 3 — Legs (Heavy Hypertrophy)',
            muscles: 'Quads, Hamstrings, Calves',
            exercises: [
              { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads & Glutes', sets: 4, repRange: '6-8', restSeconds: 150, intensity: 'Heavy, 1-2 RIR', variation: 'Back Squat', instructions: 'Squat below parallel.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Barbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 4, repRange: '8-10', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Hinge hips back, feel stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Machine Hack Squat', targetMuscle: 'Quads Isolation', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Machine', instructions: 'Deep quad flex.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Hamstring Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Seated machine', instructions: 'Squeeze hamstrings.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Calf Raise Machine', targetMuscle: 'Calves', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Heavy, 1 RIR', variation: 'Standing machine', instructions: 'Full extension.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '4days': {
        summary: {
          goal: 'BULK',
          frequency: '4 Days / Week',
          focus: 'Targeted Bodypart Specialization Split (Chest, Back, Shoulders+Arms, Legs)',
          weeklyVolume: 'High Volume & High Intensity',
          intensity: 'Heavy / Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 6–10 Reps | Isolation 10–15 Reps',
          restPhilosophy: '90–120 Seconds Rest',
          progressiveOverload: 'Increase load progressively on primary lifts.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Chest Specialization',
            muscles: 'Chest Focus',
            exercises: [
              { exerciseName: 'Flat Barbell Bench Press', targetMuscle: 'Mid Chest', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Explosive drive.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Incline DB', instructions: 'Deep stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Chest Flye (Low to High)', targetMuscle: 'Upper Inner Chest', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Low cable', instructions: 'Scoop hands up.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Decline Machine Chest Press', targetMuscle: 'Lower Chest', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Machine', instructions: 'Press downward.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Back Specialization',
            muscles: 'Back Thickness & Width',
            exercises: [
              { exerciseName: 'Meadow Row (T-Bar / Barbell)', targetMuscle: 'Mid Back & Lat', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Single arm barbell end', instructions: 'Drive elbow high.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lat Pulldown (Wide Grip)', targetMuscle: 'Upper Lats', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Wide grip bar', instructions: 'Pull to chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Cable Row (Wide Neutral)', targetMuscle: 'Rhomboids', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Neutral handle', instructions: 'Squeeze shoulder blades.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Barbell Shrugs', targetMuscle: 'Upper Traps', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Heavy, 1 RIR', variation: 'Overhand barbell', instructions: 'Shrug shoulders to ears.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 3,
            dayName: 'Day 3 — Shoulders & Arms',
            muscles: 'Deltoids, Biceps & Triceps',
            exercises: [
              { exerciseName: 'Seated Dumbbell Shoulder Press', targetMuscle: 'Delts', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Heavy overhead press.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Dumbbell', instructions: 'Raise side delts.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Close-Grip Bench Press', targetMuscle: 'Triceps Compound', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell narrow grip', instructions: 'Lower to mid chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Preacher Curl (EZ-Bar)', targetMuscle: 'Biceps Short Head', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Preacher bench', instructions: 'Strict curl.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 4,
            dayName: 'Day 4 — Legs Heavy',
            muscles: 'Quads, Hamstrings & Calves',
            exercises: [
              { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads', sets: 4, repRange: '6-8', restSeconds: 150, intensity: 'Heavy, 1-2 RIR', variation: 'High bar', instructions: 'Deep squat.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Stiff-Legged Deadlift', targetMuscle: 'Hamstrings', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Keep legs nearly straight.', imageUrl: '', videoUrl: '' },
              { exerciseName: '45-Degree Leg Press', targetMuscle: 'Quads', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1 RIR', variation: 'Sled', instructions: 'Heavy leg press.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Heavy, 1 RIR', variation: 'Machine', instructions: 'Full stretch.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '5days': {
        summary: {
          goal: 'BULK',
          frequency: '5 Days / Week',
          focus: 'Bodybuilding Hypertrophy Split (Chest+Tri, Back+Bi, Legs, Shoulders, Arms)',
          weeklyVolume: 'Maximum Muscle Building Volume',
          intensity: 'Heavy / Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 6–10 Reps | Isolation 10–15 Reps',
          restPhilosophy: '90–120 Seconds Rest',
          progressiveOverload: 'Overload weight consistently.'
        },
        days: [
          { dayNumber: 1, dayName: 'Day 1 — Chest & Triceps', muscles: 'Chest & Triceps', exercises: [ { exerciseName: 'Incline Barbell Bench Press', targetMuscle: 'Upper Chest', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Heavy incline press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Flat Dumbbell Press', targetMuscle: 'Mid Chest', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Deep stretch.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Chest Flye', targetMuscle: 'Chest Isolation', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Cable handles', instructions: 'Squeeze chest.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Skull Crushers (EZ-Bar)', targetMuscle: 'Triceps', sets: 3, repRange: '10-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'EZ bar', instructions: 'Lower behind head.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 2, dayName: 'Day 2 — Back & Biceps', muscles: 'Back & Biceps', exercises: [ { exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Mid Back', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Overhand', instructions: 'Heavy row.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lat Pulldown (Neutral Grip)', targetMuscle: 'Lats', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy, 1-2 RIR', variation: 'V-Bar', instructions: 'Pull to chest.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm Dumbbell Row', targetMuscle: 'Lats', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Dumbbell', instructions: 'Row to hip.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Barbell Curl', targetMuscle: 'Biceps', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Barbell', instructions: 'Strict bicep curl.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 3, dayName: 'Day 3 — Legs Mass', muscles: 'Quads & Hamstrings', exercises: [ { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads', sets: 4, repRange: '6-8', restSeconds: 150, intensity: 'Heavy, 1-2 RIR', variation: 'Back Squat', instructions: 'Deep depth.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Barbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 4, repRange: '8-10', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Hinge back.', imageUrl: '', videoUrl: '' }, { exerciseName: '45-Degree Leg Press', targetMuscle: 'Quads', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Sled', instructions: 'Heavy leg press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lying Hamstring Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Curl hamstrings.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 4, dayName: 'Day 4 — Shoulders', muscles: 'Delts & Traps', exercises: [ { exerciseName: 'Standing Overhead Press', targetMuscle: 'Front Delts', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Strict press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Cable', instructions: 'Lateral raise.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Reverse Pec Deck', targetMuscle: 'Rear Delts', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Fly rear delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Dumbbell Shrugs', targetMuscle: 'Traps', sets: 3, repRange: '10-12', restSeconds: 75, intensity: 'Heavy', variation: 'Dumbbells', instructions: 'Shrug shoulders.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 5, dayName: 'Day 5 — Arms & Accessories', muscles: 'Biceps & Triceps Heavy', exercises: [ { exerciseName: 'Close-Grip Bench Press', targetMuscle: 'Triceps Compound', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell narrow grip', instructions: 'Press narrow grip.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Incline Dumbbell Curl', targetMuscle: 'Biceps Long Head', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: '45-deg bench', instructions: 'Deep bicep curl.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Tricep Rope Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Spread handles.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Preacher EZ-Bar Curl', targetMuscle: 'Biceps Short Head', sets: 3, repRange: '10-12', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Preacher bench', instructions: 'Strict curl.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Ab Cable Crunch', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Flex spine.', imageUrl: '', videoUrl: '' } ] }
        ]
      },

      '6days': {
        summary: {
          goal: 'BULK',
          frequency: '6 Days / Week',
          focus: 'PPL A/B Hypertrophy Overload Split',
          weeklyVolume: 'Maximum Frequency & Progressive Volume',
          intensity: 'Heavy / Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 6–10 Reps | Isolation 10–15 Reps',
          restPhilosophy: '90–120 Seconds Rest',
          progressiveOverload: 'Push A and Push B use completely distinct exercise selections.'
        },
        days: [
          { dayNumber: 1, dayName: 'Push A (Heavy Flat Pressing)', muscles: 'Chest & Shoulders', exercises: [ { exerciseName: 'Flat Barbell Bench Press', targetMuscle: 'Mid Chest', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Heavy press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Dumbbell OHP', targetMuscle: 'Delts', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Dumbbell', instructions: 'Overhead press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Cable', instructions: 'Lateral raise.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Weighted Dips', targetMuscle: 'Triceps & Lower Chest', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Dip belt', instructions: 'Dip down.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 2, dayName: 'Pull A (Heavy Rowing)', muscles: 'Mid Back & Biceps', exercises: [ { exerciseName: 'Barbell Bent-Over Row', targetMuscle: 'Mid Back', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Overhand', instructions: 'Pull to ribs.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lat Pulldown (Neutral V-Bar)', targetMuscle: 'Lats', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'V-Bar', instructions: 'Pull to chest.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Face Pull', targetMuscle: 'Rear Delts', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Pull to eyes.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Barbell Curl', targetMuscle: 'Biceps', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Barbell', instructions: 'Strict curl.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 3, dayName: 'Legs A (Heavy Squatting)', muscles: 'Quads & Calves', exercises: [ { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads', sets: 4, repRange: '6-8', restSeconds: 150, intensity: 'Heavy, 1-2 RIR', variation: 'High bar', instructions: 'Squat below parallel.', imageUrl: '', videoUrl: '' }, { exerciseName: '45-Degree Leg Press', targetMuscle: 'Quads', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Sled', instructions: 'Heavy press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lying Hamstring Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Curl hamstrings.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Heavy', variation: 'Machine', instructions: 'Full stretch.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 4, dayName: 'Push B (Heavy Incline Pressing)', muscles: 'Upper Chest & Side Delts', exercises: [ { exerciseName: 'Incline Barbell Bench Press', targetMuscle: 'Upper Chest', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Incline Barbell', instructions: 'Incline press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Flat Dumbbell Bench Press', targetMuscle: 'Mid Chest', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Dumbbells', instructions: 'Deep stretch press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Dumbbell', instructions: 'Raise side delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Tricep Rope Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Spread handles.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 5, dayName: 'Pull B (Heavy Vertical Pulling)', muscles: 'Wide Lats & Arms', exercises: [ { exerciseName: 'Weighted Pull-Up', targetMuscle: 'Lats', sets: 4, repRange: '6-8', restSeconds: 120, intensity: 'Heavy, 1-2 RIR', variation: 'Bodyweight + weight', instructions: 'Chin over bar.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm Dumbbell Row', targetMuscle: 'Lats', sets: 4, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Dumbbell', instructions: 'Heavy row.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Reverse Pec Deck', targetMuscle: 'Rear Delts', sets: 3, repRange: '10-15', restSeconds: 75, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Fly rear delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Incline Dumbbell Curl', targetMuscle: 'Biceps Long Head', sets: 3, repRange: '10-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'Incline bench', instructions: 'Full bicep stretch.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 6, dayName: 'Legs B (Heavy Posterior Chain)', muscles: 'Hamstrings & Glutes', exercises: [ { exerciseName: 'Conventional Barbell Deadlift', targetMuscle: 'Posterior Chain', sets: 3, repRange: '5-6', restSeconds: 180, intensity: 'Heavy, 1 RIR', variation: 'Barbell', instructions: 'Heavy deadlift.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Barbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 3, repRange: '8-10', restSeconds: 120, intensity: 'Heavy', variation: 'Barbell', instructions: 'Hinge hips.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Machine Hack Squat', targetMuscle: 'Quads', sets: 3, repRange: '8-10', restSeconds: 90, intensity: 'Heavy', variation: 'Machine', instructions: 'Hack squat.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Calf Raise', targetMuscle: 'Calves', sets: 4, repRange: '10-15', restSeconds: 75, intensity: 'Heavy', variation: 'Machine', instructions: 'Ankle extension.', imageUrl: '', videoUrl: '' } ] }
        ]
      }
    }
  },

  // =========================================================================
  // 3. RECOMP PLAN (Body Recomposition — Balanced Growth & Fat Loss)
  // Baseline: 3 Sets | Compounds 8–12 Reps | Isolation 12–15 Reps | Rest 60–90s | 1–2 RIR
  // =========================================================================
  recomp: {
    meta: {
      goal: 'RECOMP',
      description: 'Body Recomposition — Simultaneous Muscle Gain & Fat Loss Strategy',
      targetCalories: 2350,
      protein: 185,
      carbs: 220,
      fats: 60,
      fiber: 32
    },
    cardio: {
      title: 'Balanced Interval & Moderate Cardio Routine',
      type: 'Treadmill Incline Walk & Light Interval Jogging',
      intensity: 'Moderate',
      totalDuration: '25 minutes',
      avgSpeed: '5.8 km/h',
      incline: '3.0%',
      phases: {
        warmup: { duration: '5 mins', activity: 'Brisk Walk', speed: '4.5 km/h', incline: '1.0%' },
        main: { duration: '15 mins', activity: 'Interval Jog / Incline Walk', speed: '6.5 km/h', incline: '3.0%' },
        cooldown: { duration: '5 mins', activity: 'Cool-down Walk', speed: '4.0 km/h', incline: '0%' }
      },
      notes: 'Cardio provides steady caloric burn while preserving maximum energy for intense weight lifting sessions.'
    },
    diet: {
      dailyTotals: { calories: 2350, protein: 185, carbs: 220, fats: 60, fiber: 32 },
      meals: {
        breakfast: {
          name: 'Breakfast — Balanced Protein & Complex Carbs',
          items: [
            { name: 'Oatmeal', quantity: '70 g', calories: 265, protein: 9, carbs: 46, fats: 4.5, fiber: 7 },
            { name: 'Egg Whites + Whole Egg', quantity: '150g whites + 1 egg', calories: 150, protein: 23, carbs: 1, fats: 5, fiber: 0 },
            { name: 'Strawberries', quantity: '100 g', calories: 32, protein: 0.7, carbs: 7.7, fats: 0.3, fiber: 2 }
          ],
          subtotal: { calories: 447, protein: 32.7, carbs: 54.7, fats: 9.8, fiber: 9 }
        },
        lunch: {
          name: 'Lunch — Sustained Energy Plate',
          items: [
            { name: 'Grilled Turkey Breast', quantity: '180 g', calories: 240, protein: 50, carbs: 0, fats: 3.5, fiber: 0 },
            { name: 'Quinoa (Cooked)', quantity: '150 g', calories: 180, protein: 6.5, carbs: 32, fats: 3, fiber: 4 },
            { name: 'Roasted Vegetables', quantity: '150 g', calories: 75, protein: 2.5, carbs: 12, fats: 2, fiber: 4 }
          ],
          subtotal: { calories: 495, protein: 59, carbs: 44, fats: 8.5, fiber: 8 }
        },
        snack: {
          name: 'Snack / Pre-Workout',
          items: [
            { name: 'Whey Protein', quantity: '1 scoop (30g)', calories: 120, protein: 24, carbs: 3, fats: 1.5, fiber: 0 },
            { name: 'Rice Cakes', quantity: '2 cakes', calories: 70, protein: 1.5, carbs: 15, fats: 0.5, fiber: 0.6 },
            { name: 'Almond Butter', quantity: '15 g', calories: 95, protein: 3, carbs: 3, fats: 8.5, fiber: 1.5 }
          ],
          subtotal: { calories: 285, protein: 28.5, carbs: 21, fats: 10.5, fiber: 2.1 }
        },
        dinner: {
          name: 'Dinner — High Protein Lean Meal',
          items: [
            { name: 'Atlantic Salmon Fillet', quantity: '180 g', calories: 370, protein: 38, carbs: 0, fats: 23, fiber: 0 },
            { name: 'Baked Sweet Potato', quantity: '150 g', calories: 135, protein: 2.5, carbs: 31, fats: 0.2, fiber: 4.8 },
            { name: 'Steamed Green Beans', quantity: '100 g', calories: 31, protein: 1.8, carbs: 7, fats: 0.1, fiber: 2.7 }
          ],
          subtotal: { calories: 536, protein: 42.3, carbs: 38, fats: 23.3, fiber: 7.5 }
        }
      }
    },
    workout: {
      '2days': {
        summary: {
          goal: 'RECOMP',
          frequency: '2 Days / Week',
          focus: 'Full Body A / Full Body B Balanced Recomposition Split',
          weeklyVolume: 'Moderate Volume (12 Total Sets per session)',
          intensity: 'Moderate-Heavy (1–2 Reps in Reserve)',
          repPhilosophy: 'Compounds 8–12 Reps | Isolation 12–15 Reps',
          restPhilosophy: '60–90 Seconds Moderate Rest',
          progressiveOverload: 'Gradually increase reps and then load while maintaining form.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Full Body Routine A',
            muscles: 'Chest, Lats, Quads, Delts, Abs',
            exercises: [
              { exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: '30-degree incline', instructions: 'Control 2-sec lowering, press.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lat Pulldown (Neutral Grip)', targetMuscle: 'Latissimus Dorsi', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'V-Bar handle', instructions: 'Pull smoothly to chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Leg Press (45-Degree)', targetMuscle: 'Quads & Glutes', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Medium stance', instructions: 'Full range leg press.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Dumbbell', instructions: 'Lead raise with elbows.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Tricep Rope Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Rope cable', instructions: 'Spread handles at bottom.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Decline Bench Ab Crunch', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Bodyweight, 1 RIR', variation: 'Decline bench', instructions: 'Flex spine upward.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Full Body Routine B',
            muscles: 'Back, Hamstrings, Shoulders, Biceps, Calves',
            exercises: [
              { exerciseName: 'Barbell Romanian Deadlift', targetMuscle: 'Hamstrings & Glutes', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Barbell stance', instructions: 'Hinge hips back until stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Chest-Supported Row Machine', targetMuscle: 'Mid Back', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Chest pad support', instructions: 'Squeeze shoulder blades.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Dumbbell Shoulder Press', targetMuscle: 'Front Delts', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Press overhead.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Incline Dumbbell Bicep Curl', targetMuscle: 'Biceps Long Head', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: '45-deg bench', instructions: 'Full bicep stretch.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lying Hamstring Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Curl hamstrings.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Pause at peak extension.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '3days': {
        summary: {
          goal: 'RECOMP',
          frequency: '3 Days / Week',
          focus: 'Full Body A / B / C Recomposition Program',
          weeklyVolume: 'Moderate Balanced Volume',
          intensity: 'Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 8–12 Reps | Isolation 12–15 Reps',
          restPhilosophy: '60–90 Seconds Rest',
          progressiveOverload: 'Systematically increase reps then load.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Full Body Routine A',
            muscles: 'Quads, Chest, Lats',
            exercises: [
              { exerciseName: 'Goblet Dumbbell Squat', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbell at chest', instructions: 'Deep squat stance.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Flat Dumbbell Press', targetMuscle: 'Mid Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Lower dumbbells deep, press.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Cable Row (V-Bar)', targetMuscle: 'Mid Back', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'V-Bar', instructions: 'Pull to abdominal wall.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Cable handle', instructions: 'Raise side delts.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'EZ-Bar Bicep Curl', targetMuscle: 'Biceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'EZ bar', instructions: 'Strict curl.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Full Body Routine B',
            muscles: 'Hamstrings, Shoulders, Upper Back',
            exercises: [
              { exerciseName: 'Barbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Hinge hips back.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Overhead Barbell Press', targetMuscle: 'Shoulders', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Strict press', instructions: 'Press overhead.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lat Pulldown (Wide Grip)', targetMuscle: 'Lats', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Wide grip bar', instructions: 'Pull to collarbone.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Overhead Cable Rope Extension', targetMuscle: 'Triceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Cable rope', instructions: 'Extend overhead.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Hanging Knee Raise', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Bodyweight', variation: 'Bar', instructions: 'Raise knees.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 3,
            dayName: 'Day 3 — Full Body Routine C',
            muscles: 'Legs, Chest, Arms',
            exercises: [
              { exerciseName: 'Hack Squat Machine', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Machine', instructions: 'Deep squat.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Incline Machine Chest Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Machine', instructions: 'Press up.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Face Pull', targetMuscle: 'Rear Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Rope', instructions: 'Pull to ears.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Dumbbell Hammer Curl', targetMuscle: 'Brachialis', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Dumbbells', instructions: 'Neutral grip curl.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Extend calves.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '4days': {
        summary: {
          goal: 'RECOMP',
          frequency: '4 Days / Week',
          focus: 'Upper A / Lower A / Upper B / Lower B Recomposition Split',
          weeklyVolume: 'Balanced Upper/Lower Frequency',
          intensity: 'Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 8–12 Reps | Isolation 12–15 Reps',
          restPhilosophy: '60–90 Seconds Rest',
          progressiveOverload: 'Upper A/B and Lower A/B use distinct exercise variations.'
        },
        days: [
          {
            dayNumber: 1,
            dayName: 'Day 1 — Upper Body A',
            muscles: 'Chest, Lats, Side Delts',
            exercises: [
              { exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Incline DB', instructions: 'Press up.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lat Pulldown (Neutral Grip)', targetMuscle: 'Lats', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'V-Bar', instructions: 'Pull to chest.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Dumbbell Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Dumbbell', instructions: 'Raise side delts.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Tricep Rope Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Rope cable', instructions: 'Spread handles.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 2,
            dayName: 'Day 2 — Lower Body A',
            muscles: 'Quads & Calves',
            exercises: [
              { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'High bar', instructions: 'Squat below parallel.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Lying Hamstring Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Curl hamstrings.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Leg Extension', targetMuscle: 'Quads', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Extend quads.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Full stretch.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 3,
            dayName: 'Day 3 — Upper Body B',
            muscles: 'Delts, Mid Back, Arms',
            exercises: [
              { exerciseName: 'Seated Dumbbell Shoulder Press', targetMuscle: 'Front Delts', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Press overhead.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Cable Row (Wide Neutral)', targetMuscle: 'Mid Back', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Wide neutral handle', instructions: 'Row to ribs.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Rear Delt Flye', targetMuscle: 'Rear Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Cable', instructions: 'Fly rear delts.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Standing Barbell Bicep Curl', targetMuscle: 'Biceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Straight bar', instructions: 'Strict bicep curl.', imageUrl: '', videoUrl: '' }
            ]
          },
          {
            dayNumber: 4,
            dayName: 'Day 4 — Lower Body B',
            muscles: 'Hamstrings, Glutes & Abs',
            exercises: [
              { exerciseName: 'Dumbbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Hinge hips back.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Bulgarian Split Squat', targetMuscle: 'Quads & Glutes', sets: 3, repRange: '8-12 (per leg)', restSeconds: 75, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Bench elevated foot', instructions: 'Keep torso straight.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Seated Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Seated machine', instructions: 'Extend ankle.', imageUrl: '', videoUrl: '' },
              { exerciseName: 'Cable Ab Crunch', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Rope cable', instructions: 'Flex spine.', imageUrl: '', videoUrl: '' }
            ]
          }
        ]
      },

      '5days': {
        summary: {
          goal: 'RECOMP',
          frequency: '5 Days / Week',
          focus: 'Upper / Lower / Push / Pull / Legs Hybrid Recomposition Split',
          weeklyVolume: 'Moderate Volume per Bodypart',
          intensity: 'Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 8–12 Reps | Isolation 12–15 Reps',
          restPhilosophy: '60–90 Seconds Rest',
          progressiveOverload: 'Progress rep counts steadily before adding weight.'
        },
        days: [
          { dayNumber: 1, dayName: 'Day 1 — Upper Body Recomp', muscles: 'Chest & Back', exercises: [ { exerciseName: 'Flat Dumbbell Press', targetMuscle: 'Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Press deep.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lat Pulldown', targetMuscle: 'Lats', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Wide grip', instructions: 'Pull to chest.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing DB Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Dumbbell', instructions: 'Raise delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Bicep Curl', targetMuscle: 'Biceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Cable bar', instructions: 'Curl up.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 2, dayName: 'Day 2 — Lower Body Recomp', muscles: 'Quads & Hams', exercises: [ { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Back Squat', instructions: 'Squat depth.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Lying Hamstring Curl', targetMuscle: 'Hamstrings', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Machine', instructions: 'Curl hamstrings.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Leg Extension', targetMuscle: 'Quads', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Extend quads.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Full stretch.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 3, dayName: 'Day 3 — Push Focus', muscles: 'Shoulders & Triceps', exercises: [ { exerciseName: 'Seated Dumbbell Shoulder Press', targetMuscle: 'Delts', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Dumbbells', instructions: 'Press overhead.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Chest Flye', targetMuscle: 'Chest', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Dual cables', instructions: 'Flye handles.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Cable', instructions: 'Raise side delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Tricep Overhead Extension', targetMuscle: 'Triceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Extend overhead.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 4, dayName: 'Day 4 — Pull Focus', muscles: 'Upper Back & Biceps', exercises: [ { exerciseName: 'Seated Cable Row', targetMuscle: 'Back', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'V-Bar', instructions: 'Row to belly.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm High Pulldown', targetMuscle: 'Lats', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Single cable', instructions: 'Pull to hip.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Face Pull', targetMuscle: 'Rear Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Pull to eyes.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Incline DB Curl', targetMuscle: 'Biceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy, 1 RIR', variation: 'Incline bench', instructions: 'Curl up.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 5, dayName: 'Day 5 — Legs & Core', muscles: 'Legs & Abs', exercises: [ { exerciseName: 'Leg Press', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Sled', instructions: 'Leg press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Dumbbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'Dumbbells', instructions: 'Hinge hips.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Ankle extension.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Decline Bench Sit-Up', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Bodyweight', variation: 'Decline bench', instructions: 'Sit up.', imageUrl: '', videoUrl: '' } ] }
        ]
      },

      '6days': {
        summary: {
          goal: 'RECOMP',
          frequency: '6 Days / Week',
          focus: 'Upper A / Lower A / Push / Pull / Upper B / Lower B Recomposition Program',
          weeklyVolume: 'Moderate High Volume across 6 Days',
          intensity: 'Moderate-Heavy (1–2 RIR)',
          repPhilosophy: 'Compounds 8–12 Reps | Isolation 12–15 Reps',
          restPhilosophy: '60–90 Seconds Rest',
          progressiveOverload: 'Distinct exercise variations between Upper A/B and Lower A/B.'
        },
        days: [
          { dayNumber: 1, dayName: 'Upper A', muscles: 'Chest & Lats', exercises: [ { exerciseName: 'Incline Dumbbell Press', targetMuscle: 'Upper Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Incline DB', instructions: 'Press up.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Wide-Grip Lat Pulldown', targetMuscle: 'Lats', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Lat bar', instructions: 'Pull down.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing DB Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Dumbbell', instructions: 'Raise delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Tricep Rope Pushdown', targetMuscle: 'Triceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Spread handles.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 2, dayName: 'Lower A', muscles: 'Quads & Calves', exercises: [ { exerciseName: 'Barbell Back Squat', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'High bar', instructions: 'Squat depth.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Leg Press', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'Sled', instructions: 'Press leg press.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Standing Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Full stretch.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Hanging Knee Raise', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Bodyweight', variation: 'Bar', instructions: 'Raise knees.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 3, dayName: 'Push', muscles: 'Shoulders & Triceps', exercises: [ { exerciseName: 'Standing Overhead Press', targetMuscle: 'Delts', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Press overhead.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Flat Dumbbell Press', targetMuscle: 'Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'Dumbbells', instructions: 'Press dumbbells.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Lateral Raise', targetMuscle: 'Side Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Cable', instructions: 'Lateral raise.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Overhead Cable Extension', targetMuscle: 'Triceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Extend overhead.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 4, dayName: 'Pull', muscles: 'Upper Back & Biceps', exercises: [ { exerciseName: 'Barbell Row', targetMuscle: 'Mid Back', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Overhand', instructions: 'Row to ribs.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Single-Arm Pulldown', targetMuscle: 'Lats', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'Single cable', instructions: 'Pull to hip.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Face Pull', targetMuscle: 'Rear Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Rope cable', instructions: 'Pull to eyes.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Incline DB Curl', targetMuscle: 'Biceps', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Incline bench', instructions: 'Curl up.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 5, dayName: 'Upper B', muscles: 'Chest Flyes & Rear Delts', exercises: [ { exerciseName: 'Flat Barbell Bench Press', targetMuscle: 'Chest', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Press barbell.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Cable Row (V-Bar)', targetMuscle: 'Mid Back', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'V-Bar', instructions: 'Row to belly.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Rear Delt Fly', targetMuscle: 'Rear Delts', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Cable', instructions: 'Fly rear delts.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Preacher EZ-Bar Curl', targetMuscle: 'Biceps Short Head', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Preacher bench', instructions: 'Strict curl.', imageUrl: '', videoUrl: '' } ] },
          { dayNumber: 6, dayName: 'Lower B', muscles: 'Hamstrings & Abs', exercises: [ { exerciseName: 'Barbell Romanian Deadlift', targetMuscle: 'Hamstrings', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy, 1-2 RIR', variation: 'Barbell', instructions: 'Hinge hips.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Hack Squat', targetMuscle: 'Quads', sets: 3, repRange: '8-12', restSeconds: 90, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Hack squat.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Seated Calf Raise', targetMuscle: 'Calves', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Machine', instructions: 'Ankle extension.', imageUrl: '', videoUrl: '' }, { exerciseName: 'Cable Ab Crunch', targetMuscle: 'Abs', sets: 3, repRange: '12-15', restSeconds: 60, intensity: 'Moderate-Heavy', variation: 'Cable rope', instructions: 'Flex spine.', imageUrl: '', videoUrl: '' } ] }
        ]
      }
    }
  }
};
