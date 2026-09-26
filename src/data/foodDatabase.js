/**
 * Centralized Nutrition & Food Database for RYZEUP FITNESS
 * Contains nutrition profiles per 100g or per unit count.
 * Explicitly tracks weight type (raw vs cooked vs serving count).
 */

export const foodCategories = {
  MAIN_CARB: 'Main Carbohydrate',
  PROTEIN: 'Protein Source',
  VEGETABLE: 'Vegetables',
  SNACK: 'Nuts & Seeds',
  PRE_WORKOUT: 'Pre-Workout Fuel'
};

export const foodDatabase = {
  // --- MAIN CARBOHYDRATES ---
  bread: {
    id: 'bread',
    name: 'Whole Wheat Bread',
    category: foodCategories.MAIN_CARB,
    unit: 'slice',
    isCount: true,
    weightType: 'serving',
    label: 'Bread',
    perUnit: {
      calories: 80,
      protein: 3.5,
      carbs: 14.0,
      fat: 1.0,
      fiber: 1.5
    },
    defaultServing: 2,
    minServing: 1,
    maxServing: 6
  },
  oats: {
    id: 'oats',
    name: 'Rolled Oats',
    category: foodCategories.MAIN_CARB,
    unit: 'g',
    isCount: false,
    weightType: 'raw',
    label: 'Oats',
    per100g: {
      calories: 389,
      protein: 16.9,
      carbs: 66.3,
      fat: 6.9,
      fiber: 10.6
    },
    defaultServing: 60,
    minServing: 30,
    maxServing: 150
  },
  dosa: {
    id: 'dosa',
    name: 'Crispy Dosa',
    category: foodCategories.MAIN_CARB,
    unit: 'dosa',
    isCount: true,
    weightType: 'serving',
    label: 'Dosa',
    perUnit: {
      calories: 120,
      protein: 3.0,
      carbs: 22.0,
      fat: 2.5,
      fiber: 1.2
    },
    defaultServing: 2,
    minServing: 1,
    maxServing: 5
  },
  rice: {
    id: 'rice',
    name: 'Steamed White/Brown Rice',
    category: foodCategories.MAIN_CARB,
    unit: 'g',
    isCount: false,
    weightType: 'cooked',
    label: 'Rice',
    per100g: {
      calories: 130,
      protein: 2.7,
      carbs: 28.2,
      fat: 0.4,
      fiber: 0.8
    },
    defaultServing: 200,
    minServing: 100,
    maxServing: 400
  },
  chapathi: {
    id: 'chapathi',
    name: 'Whole Wheat Chapathi',
    category: foodCategories.MAIN_CARB,
    unit: 'chapathi',
    isCount: true,
    weightType: 'serving',
    label: 'Chapathi',
    perUnit: {
      calories: 100,
      protein: 3.1,
      carbs: 18.0,
      fat: 2.2,
      fiber: 2.0
    },
    defaultServing: 3,
    minServing: 1,
    maxServing: 6
  },

  // --- PROTEIN SOURCES ---
  eggs: {
    id: 'eggs',
    name: 'Whole Large Eggs',
    category: foodCategories.PROTEIN,
    unit: 'eggs',
    isCount: true,
    weightType: 'serving',
    label: 'Eggs',
    perUnit: {
      calories: 70,
      protein: 6.2,
      carbs: 0.5,
      fat: 5.0,
      fiber: 0
    },
    defaultServing: 3,
    minServing: 1,
    maxServing: 6
  },
  protein_powder: {
    id: 'protein_powder',
    name: 'Whey Protein Isolate',
    category: foodCategories.PROTEIN,
    unit: 'scoop',
    isCount: true,
    weightType: 'serving',
    label: 'Protein Powder',
    perUnit: {
      calories: 120,
      protein: 24.0,
      carbs: 2.0,
      fat: 1.5,
      fiber: 0
    },
    defaultServing: 1,
    minServing: 1,
    maxServing: 3
  },
  chicken_breast: {
    id: 'chicken_breast',
    name: 'Grilled Chicken Breast',
    category: foodCategories.PROTEIN,
    unit: 'g',
    isCount: false,
    weightType: 'cooked',
    label: 'Chicken Breast',
    per100g: {
      calories: 165,
      protein: 31.0,
      carbs: 0,
      fat: 3.6,
      fiber: 0
    },
    defaultServing: 150,
    minServing: 75,
    maxServing: 350
  },

  // --- VEGETABLES ---
  mixed_veggies: {
    id: 'mixed_veggies',
    name: 'Steamed Mixed Vegetables',
    category: foodCategories.VEGETABLE,
    unit: 'g',
    isCount: false,
    weightType: 'cooked',
    label: 'Mixed Vegetables',
    per100g: {
      calories: 50,
      protein: 2.2,
      carbs: 10.0,
      fat: 0.3,
      fiber: 3.5
    },
    defaultServing: 150,
    minServing: 50,
    maxServing: 300
  },
  leafy_veggies: {
    id: 'leafy_veggies',
    name: 'Fresh Spinach & Leafy Greens',
    category: foodCategories.VEGETABLE,
    unit: 'g',
    isCount: false,
    weightType: 'cooked',
    label: 'Leafy Vegetables',
    per100g: {
      calories: 30,
      protein: 3.0,
      carbs: 4.2,
      fat: 0.4,
      fiber: 2.8
    },
    defaultServing: 150,
    minServing: 50,
    maxServing: 300
  },

  // --- SNACKS (NUTS & SEEDS) ---
  almonds: {
    id: 'almonds',
    name: 'Raw Whole Almonds',
    category: foodCategories.SNACK,
    unit: 'g',
    isCount: false,
    weightType: 'raw',
    label: 'Almonds',
    per100g: {
      calories: 579,
      protein: 21.2,
      carbs: 21.7,
      fat: 49.9,
      fiber: 12.5
    },
    defaultServing: 20,
    minServing: 10,
    maxServing: 50
  },
  peanuts: {
    id: 'peanuts',
    name: 'Roasted Peanuts',
    category: foodCategories.SNACK,
    unit: 'g',
    isCount: false,
    weightType: 'raw',
    label: 'Peanuts',
    per100g: {
      calories: 567,
      protein: 25.8,
      carbs: 16.1,
      fat: 49.2,
      fiber: 8.5
    },
    defaultServing: 25,
    minServing: 10,
    maxServing: 60
  },
  walnuts: {
    id: 'walnuts',
    name: 'Whole Walnuts',
    category: foodCategories.SNACK,
    unit: 'g',
    isCount: false,
    weightType: 'raw',
    label: 'Walnuts',
    per100g: {
      calories: 654,
      protein: 15.2,
      carbs: 13.7,
      fat: 65.2,
      fiber: 6.7
    },
    defaultServing: 20,
    minServing: 10,
    maxServing: 45
  },
  pumpkin_seeds: {
    id: 'pumpkin_seeds',
    name: 'Raw Pumpkin Seeds',
    category: foodCategories.SNACK,
    unit: 'g',
    isCount: false,
    weightType: 'raw',
    label: 'Pumpkin Seeds',
    per100g: {
      calories: 559,
      protein: 30.2,
      carbs: 10.7,
      fat: 49.1,
      fiber: 6.0
    },
    defaultServing: 25,
    minServing: 10,
    maxServing: 50
  },
  sunflower_seeds: {
    id: 'sunflower_seeds',
    name: 'Sunflower Seeds',
    category: foodCategories.SNACK,
    unit: 'g',
    isCount: false,
    weightType: 'raw',
    label: 'Sunflower Seeds',
    per100g: {
      calories: 584,
      protein: 20.8,
      carbs: 20.0,
      fat: 51.5,
      fiber: 8.6
    },
    defaultServing: 25,
    minServing: 10,
    maxServing: 50
  },

  // --- PRE-WORKOUT SPECIFICS ---
  peanut_butter: {
    id: 'peanut_butter',
    name: 'Natural Peanut Butter',
    category: foodCategories.PRE_WORKOUT,
    unit: 'g',
    isCount: false,
    weightType: 'serving',
    label: 'Peanut Butter',
    per100g: {
      calories: 588,
      protein: 25.0,
      carbs: 20.0,
      fat: 50.0,
      fiber: 6.0
    },
    defaultServing: 15,
    minServing: 10,
    maxServing: 40
  },
  banana: {
    id: 'banana',
    name: 'Fresh Ripe Banana',
    category: foodCategories.PRE_WORKOUT,
    unit: 'banana',
    isCount: true,
    weightType: 'serving',
    label: 'Banana',
    perUnit: {
      calories: 105,
      protein: 1.3,
      carbs: 27.0,
      fat: 0.3,
      fiber: 3.1
    },
    defaultServing: 1,
    minServing: 1,
    maxServing: 3
  }
};

/**
 * Meal Configuration Templates mapping allowed alternatives for each meal.
 */
export const mealCategoryOptions = {
  breakfast: {
    name: 'Breakfast',
    targetPercent: 0.25, // 25% of daily calories
    mainCarbs: ['oats', 'bread', 'dosa', 'rice', 'chapathi'],
    proteins: ['eggs', 'protein_powder', 'chicken_breast'],
    defaultMain: 'oats',
    defaultProtein: 'eggs'
  },
  lunch: {
    name: 'Lunch',
    targetPercent: 0.30, // 30% of daily calories
    mainCarbs: ['rice', 'dosa', 'chapathi'],
    proteins: ['chicken_breast', 'eggs', 'protein_powder'],
    vegetables: ['mixed_veggies', 'leafy_veggies'],
    defaultMain: 'rice',
    defaultProtein: 'chicken_breast',
    defaultVeggie: 'mixed_veggies'
  },
  snack: {
    name: 'Snack',
    targetPercent: 0.10, // 10% of daily calories
    mainCarbs: ['almonds', 'peanuts', 'walnuts', 'pumpkin_seeds', 'sunflower_seeds'],
    defaultMain: 'almonds'
  },
  preWorkout: {
    name: 'Pre-Workout',
    targetPercent: 0.10, // 10% of daily calories
    mainCarbs: ['bread', 'oats', 'banana'],
    proteins: ['peanut_butter', 'protein_powder'],
    defaultMain: 'bread',
    defaultProtein: 'peanut_butter'
  },
  dinner: {
    name: 'Dinner',
    targetPercent: 0.25, // 25% of daily calories
    mainCarbs: ['chapathi', 'rice', 'dosa'],
    proteins: ['eggs', 'chicken_breast', 'protein_powder'],
    defaultMain: 'chapathi',
    defaultProtein: 'eggs'
  }
};
