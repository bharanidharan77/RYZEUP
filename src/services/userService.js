/**
 * User Service — Manages RYZEUP FITNESS User Authentication & Profile State
 * Prepares user architecture for future Firebase Authentication integration.
 */

const STORAGE_USERS_KEY = 'ryzeup_users_v2';
const STORAGE_CURRENT_USER_KEY = 'ryzeup_current_user_v2';

// Seed Initial Mock Users
const INITIAL_USERS = [
  {
    id: 'usr_cut_01',
    username: 'user',
    email: 'marcus@ryzeup.fit',
    name: 'Marcus Vance',
    role: 'user',
    hasCompletedOnboarding: true,
    defaultPlan: 'cut',
    activePlan: 'cut',
    personalInfo: {
      name: 'Marcus Vance',
      age: 28,
      gender: 'Male',
      disabilityOrInjury: 'Mild left shoulder impingement (avoid behind-neck presses)',
      otherNotes: 'Prefers high protein diet and morning workouts.'
    },
    bodyMeasurements: {
      weight: 82.5, // kg
      height: 180, // cm
      waist: 84, // cm
      neck: 39, // cm
      arm: 38, // cm
      chest: 104 // cm
    }
  },
  {
    id: 'usr_bulk_02',
    username: 'sarah',
    email: 'sarah@ryzeup.fit',
    name: 'Sarah Connor',
    role: 'user',
    hasCompletedOnboarding: true,
    defaultPlan: 'bulk',
    activePlan: 'bulk',
    personalInfo: {
      name: 'Sarah Connor',
      age: 26,
      gender: 'Female',
      disabilityOrInjury: 'None',
      otherNotes: 'Focusing on leg and glute hypertrophy.'
    },
    bodyMeasurements: {
      weight: 62.0,
      height: 168,
      waist: 68,
      neck: 32,
      arm: 29,
      chest: 88
    }
  },
  {
    id: 'usr_recomp_03',
    username: 'alex',
    email: 'alex@ryzeup.fit',
    name: 'Alex Mercer',
    role: 'user',
    hasCompletedOnboarding: true,
    defaultPlan: 'recomp',
    activePlan: 'recomp',
    personalInfo: {
      name: 'Alex Mercer',
      age: 31,
      gender: 'Male',
      disabilityOrInjury: 'Past lower back strain (prefers chest-supported rows)',
      otherNotes: 'Recomposition goal post-rehab.'
    },
    bodyMeasurements: {
      weight: 75.0,
      height: 175,
      waist: 79,
      neck: 37,
      arm: 36,
      chest: 99
    }
  },
  {
    id: 'usr_new_04',
    username: 'newuser',
    email: 'newbie@ryzeup.fit',
    name: 'New Athlete',
    role: 'user',
    hasCompletedOnboarding: false,
    defaultPlan: null,
    activePlan: null,
    personalInfo: {
      name: '',
      age: '',
      gender: 'Male',
      disabilityOrInjury: '',
      otherNotes: ''
    },
    bodyMeasurements: {
      weight: '',
      height: '',
      waist: '',
      neck: '',
      arm: '',
      chest: ''
    }
  },
  {
    id: 'usr_admin_99',
    username: 'admin',
    email: 'headcoach@ryzeup.fit',
    name: 'Head Coach Admin',
    role: 'admin',
    hasCompletedOnboarding: true,
    defaultPlan: null,
    activePlan: null,
    personalInfo: {
      name: 'Head Coach Admin',
      age: 35,
      gender: 'Male',
      disabilityOrInjury: 'None',
      otherNotes: 'Master Administrator'
    },
    bodyMeasurements: {}
  }
];

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored users:', e);
  }
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(INITIAL_USERS));
  return INITIAL_USERS;
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving stored users:', e);
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading current user:', e);
  }
  const users = getStoredUsers();
  const defaultUser = users.find(u => u.username === 'user') || users[0];
  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(defaultUser));
  return defaultUser;
}

export function loginUser(usernameInput, passwordInput, targetRole = 'user') {
  const users = getStoredUsers();
  const cleanUsername = (usernameInput || '').trim().toLowerCase();

  if (!cleanUsername) {
    return { success: false, message: 'Please provide a username or email.' };
  }

  let matchedUser = users.find(
    u => u.username.toLowerCase() === cleanUsername || u.email.toLowerCase() === cleanUsername
  );

  if (targetRole === 'admin') {
    if (cleanUsername === 'admin' || (matchedUser && matchedUser.role === 'admin')) {
      matchedUser = matchedUser || users.find(u => u.role === 'admin');
    } else {
      return { success: false, message: 'Invalid admin account credentials.' };
    }
  }

  if (!matchedUser) {
    matchedUser = {
      id: `usr_${Date.now()}`,
      username: cleanUsername,
      email: `${cleanUsername}@ryzeup.fit`,
      name: cleanUsername.charAt(0).toUpperCase() + cleanUsername.slice(1),
      role: targetRole,
      hasCompletedOnboarding: false,
      defaultPlan: null,
      activePlan: null,
      personalInfo: { name: cleanUsername, age: 25, gender: 'Male', disabilityOrInjury: '', otherNotes: '' },
      bodyMeasurements: { weight: 70, height: 175, waist: 80, neck: 36, arm: 32, chest: 95 }
    };
    users.push(matchedUser);
    saveStoredUsers(users);
  }

  localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(matchedUser));
  return { success: true, user: matchedUser };
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
}

export function saveOnboardingInfo(userId, personalInfo, bodyMeasurements) {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      name: personalInfo.name || users[index].name,
      personalInfo: { ...users[index].personalInfo, ...personalInfo },
      bodyMeasurements: { ...users[index].bodyMeasurements, ...bodyMeasurements }
    };
    saveStoredUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser.id === userId) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(users[index]));
    }
  }
}

export function selectFitnessPlan(userId, planKey) {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    const updatedUser = {
      ...users[index],
      hasCompletedOnboarding: true,
      defaultPlan: users[index].defaultPlan || planKey,
      activePlan: planKey
    };
    users[index] = updatedUser;
    saveStoredUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser.id === userId) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }
    return updatedUser;
  }
  return null;
}

export function updateActivePlan(userId, newPlanKey) {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.id === userId);

  if (index !== -1) {
    const updatedUser = {
      ...users[index],
      activePlan: newPlanKey
    };
    users[index] = updatedUser;
    saveStoredUsers(users);

    const currentUser = getCurrentUser();
    if (currentUser.id === userId) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }
    return updatedUser;
  }
  return null;
}

export function getAllUsers() {
  return getStoredUsers().filter(u => u.role !== 'admin');
}

export function getUserById(userId) {
  const users = getStoredUsers();
  return users.find(u => u.id === userId) || null;
}
