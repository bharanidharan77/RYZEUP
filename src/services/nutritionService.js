/**
 * Nutrition Service — Reusable Calorie & Portion Calculation Engine for RYZEUP FITNESS
 * 
 * Automatically calculates dynamic portion sizes based on:
 * - User's Target Calories & Goal (CUT, BULK, RECOMP)
 * - Meal Calorie Allocations (Breakfast 25%, Lunch 30%, Snack 10%, Pre-Workout 10%, Dinner 25%)
 * - Selected food combination (A/B/C options)
 * - Nutrition database per 100g or per unit
 * - RAW vs COOKED weight labeling and sensible rounding
 */

import { foodDatabase, mealCategoryOptions } from '../data/foodDatabase';

const STORAGE_DIET_SELECTION_PREFIX = 'ryzeup_diet_selection_';

/**
 * Calculates exact nutrition metrics for a given food ID and quantity.
 */
export function calculateFoodNutrition(foodId, quantity) {
  const food = foodDatabase[foodId];
  if (!food) {
    return { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, quantity: 0, unit: '', displayLabel: '' };
  }

  const qty = Math.max(0, Number(quantity) || 0);

  let cals = 0, p = 0, c = 0, f = 0, fib = 0;

  if (food.isCount) {
    const factor = qty;
    cals = food.perUnit.calories * factor;
    p = food.perUnit.protein * factor;
    c = food.perUnit.carbs * factor;
    f = food.perUnit.fat * factor;
    fib = (food.perUnit.fiber || 0) * factor;
  } else {
    const factor = qty / 100;
    cals = food.per100g.calories * factor;
    p = food.per100g.protein * factor;
    c = food.per100g.carbs * factor;
    f = food.per100g.fat * factor;
    fib = (food.per100g.fiber || 0) * factor;
  }

  const weightSuffix = food.weightType === 'cooked' ? ' cooked' : (food.weightType === 'raw' ? ' raw' : '');
  const unitStr = food.isCount ? (qty === 1 ? food.unit : `${food.unit}s`) : `g${weightSuffix}`;

  return {
    foodId: food.id,
    name: food.name,
    label: food.label,
    quantity: Math.round(qty),
    unit: food.unit,
    weightType: food.weightType,
    displayQuantity: `${Math.round(qty)} ${unitStr}`,
    calories: Math.round(cals),
    protein: Math.round(p * 10) / 10,
    carbs: Math.round(c * 10) / 10,
    fat: Math.round(f * 10) / 10,
    fiber: Math.round(fib * 10) / 10
  };
}

/**
 * Dynamically calculates recommended portions for a meal given selected foods & meal calorie budget.
 */
export function calculateMealPortions(mealKey, mainFoodId, proteinFoodId = null, veggieFoodId = null, mealCalorieTarget = 500) {
  const config = mealCategoryOptions[mealKey];
  if (!config) return { items: [], subtotal: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 } };

  const mainFood = foodDatabase[mainFoodId] || foodDatabase[config.defaultMain];
  const proteinFood = proteinFoodId ? (foodDatabase[proteinFoodId] || null) : null;
  const veggieFood = veggieFoodId ? (foodDatabase[veggieFoodId] || null) : null;

  // Determine calorie split across components
  let mainCalTarget = mealCalorieTarget;
  let proteinCalTarget = 0;
  let veggieCalTarget = 0;

  if (proteinFood && veggieFood) {
    mainCalTarget = mealCalorieTarget * 0.45;
    proteinCalTarget = mealCalorieTarget * 0.45;
    veggieCalTarget = mealCalorieTarget * 0.10;
  } else if (proteinFood) {
    mainCalTarget = mealCalorieTarget * 0.50;
    proteinCalTarget = mealCalorieTarget * 0.50;
  } else if (veggieFood) {
    mainCalTarget = mealCalorieTarget * 0.85;
    veggieCalTarget = mealCalorieTarget * 0.15;
  }

  const items = [];

  // Helper to estimate quantity for a target calorie budget
  const computeQuantity = (food, targetCals) => {
    if (!food) return 0;
    if (food.isCount) {
      const count = Math.round(targetCals / food.perUnit.calories);
      return Math.max(food.minServing, Math.min(food.maxServing, count || food.defaultServing));
    } else {
      const rawGrams = (targetCals / food.per100g.calories) * 100;
      // Round to clean 5g increments
      const roundedGrams = Math.round(rawGrams / 5) * 5;
      return Math.max(food.minServing, Math.min(food.maxServing, roundedGrams || food.defaultServing));
    }
  };

  // 1. Main Food Item
  if (mainFood) {
    const qty = computeQuantity(mainFood, mainCalTarget);
    items.push(calculateFoodNutrition(mainFood.id, qty));
  }

  // 2. Protein Food Item
  if (proteinFood) {
    const qty = computeQuantity(proteinFood, proteinCalTarget);
    items.push(calculateFoodNutrition(proteinFood.id, qty));
  }

  // 3. Veggie Food Item
  if (veggieFood) {
    const qty = computeQuantity(veggieFood, veggieCalTarget);
    items.push(calculateFoodNutrition(veggieFood.id, qty));
  }

  // Subtotal calculation
  const subtotal = items.reduce(
    (acc, curr) => ({
      calories: acc.calories + curr.calories,
      protein: Math.round((acc.protein + curr.protein) * 10) / 10,
      carbs: Math.round((acc.carbs + curr.carbs) * 10) / 10,
      fat: Math.round((acc.fat + curr.fat) * 10) / 10,
      fiber: Math.round((acc.fiber + curr.fiber) * 10) / 10
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  return { items, subtotal };
}

/**
 * Gets user's saved diet selections (or returns default food selections).
 */
export function getUserDietSelections(userId, goalKey = 'cut') {
  const key = `${STORAGE_DIET_SELECTION_PREFIX}${userId}_${goalKey.toLowerCase()}`;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error reading user diet selection:', e);
  }

  return {
    breakfast: { main: 'oats', protein: 'eggs' },
    lunch: { main: 'rice', protein: 'chicken_breast', vegetable: 'mixed_veggies' },
    snack: { main: 'almonds' },
    preWorkout: { main: 'bread', protein: 'peanut_butter' },
    dinner: { main: 'chapathi', protein: 'eggs' }
  };
}

/**
 * Saves user's diet selections (e.g. food swaps).
 */
export function saveUserDietSelections(userId, goalKey, selections) {
  const key = `${STORAGE_DIET_SELECTION_PREFIX}${userId}_${goalKey.toLowerCase()}`;
  try {
    localStorage.setItem(key, JSON.stringify(selections));
    return true;
  } catch (e) {
    console.error('Error saving user diet selection:', e);
    return false;
  }
}

/**
 * Computes full daily flexible diet plan based on target calories and food selections.
 */
export function buildFlexibleDietPlan(userId, goalKey = 'cut', targetCalories = 2000, selections = null) {
  const userSelections = selections || getUserDietSelections(userId, goalKey);
  const totalTargetCals = Number(targetCalories) || 2000;

  const meals = {};
  let totalCals = 0;
  let totalP = 0;
  let totalC = 0;
  let totalF = 0;
  let totalFib = 0;

  Object.keys(mealCategoryOptions).forEach((mealKey) => {
    const cat = mealCategoryOptions[mealKey];
    const mealTargetCal = Math.round(totalTargetCals * cat.targetPercent);
    const sel = userSelections[mealKey] || {};

    const mainId = sel.main || cat.defaultMain;
    const proteinId = sel.protein || cat.defaultProtein || null;
    const vegId = sel.vegetable || cat.defaultVeggie || null;

    const mealData = calculateMealPortions(mealKey, mainId, proteinId, vegId, mealTargetCal);
    meals[mealKey] = {
      name: cat.name,
      targetPercent: cat.targetPercent,
      targetCalories: mealTargetCal,
      selection: { main: mainId, protein: proteinId, vegetable: vegId },
      items: mealData.items,
      subtotal: mealData.subtotal
    };

    totalCals += mealData.subtotal.calories;
    totalP += mealData.subtotal.protein;
    totalC += mealData.subtotal.carbs;
    totalF += mealData.subtotal.fat;
    totalFib += mealData.subtotal.fiber;
  });

  return {
    targetCalories: totalTargetCals,
    dailyTotals: {
      calories: Math.round(totalCals),
      protein: Math.round(totalP),
      carbs: Math.round(totalC),
      fats: Math.round(totalF),
      fiber: Math.round(totalFib)
    },
    remainingCalories: Math.max(0, totalTargetCals - Math.round(totalCals)),
    meals
  };
}
