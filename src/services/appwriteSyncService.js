/**
 * Appwrite Sync Service — Live Appwrite Database Integration for RYZEUP FITNESS
 * Syncs user profiles and daily progress logs to Appwrite Cloud.
 */

import { databases, account } from '../lib/appwrite';
import { Query, ID } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || 'ryzeup_db';
const PROFILES_COLLECTION_ID = 'user_profiles';
const PROGRESS_COLLECTION_ID = 'user_progress';

const isAppwriteConfigured = () => {
  const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
  return Boolean(projectId && projectId !== 'your_appwrite_project_id_here');
};

/**
 * Sync or create a user profile document in Appwrite
 */
export async function syncUserProfileToAppwrite(user) {
  if (!isAppwriteConfigured() || !user || !user.id) return null;

  try {
    // Check if profile exists
    const existing = await databases.listDocuments(
      DATABASE_ID,
      PROFILES_COLLECTION_ID,
      [Query.equal('userId', user.id)]
    );

    const profileData = {
      userId: user.id,
      name: user.name || user.username || 'Athlete',
      email: user.email || '',
      activePlan: user.activePlan || 'cut',
      role: user.role || 'user'
    };

    if (existing.documents.length > 0) {
      const docId = existing.documents[0].$id;
      return await databases.updateDocument(DATABASE_ID, PROFILES_COLLECTION_ID, docId, profileData);
    } else {
      return await databases.createDocument(DATABASE_ID, PROFILES_COLLECTION_ID, ID.unique(), profileData);
    }
  } catch (err) {
    console.warn('Appwrite Profile Sync notice:', err.message || err);
    return null;
  }
}

/**
 * Save daily progress record to Appwrite user_progress collection
 */
export async function syncDailyProgressToAppwrite(userId, dateStr, trackingData) {
  if (!isAppwriteConfigured() || !userId) return null;

  try {
    const dietMeals = trackingData.diet || {};
    const completedMeals = (dietMeals.breakfast ? 1 : 0) + (dietMeals.lunch ? 1 : 0) + (dietMeals.dinner ? 1 : 0);
    const dietCompleted = Boolean(completedMeals >= 3 || trackingData.dietCompleted);

    const cardioMinutes = parseInt(trackingData.cardio?.minutes || trackingData.cardioMinutes || 0);
    const workoutCompleted = Boolean(trackingData.workout?.completed || trackingData.workoutCompleted);

    const payload = {
      userId,
      date: dateStr,
      dietCompleted,
      cardioMinutes,
      workoutCompleted,
      notes: trackingData.notes || JSON.stringify({
        diet: trackingData.diet || {},
        exerciseLogs: trackingData.workout?.exerciseLogs || {}
      })
    };

    // Check if record for user + date already exists
    const existing = await databases.listDocuments(
      DATABASE_ID,
      PROGRESS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.equal('date', dateStr)
      ]
    );

    if (existing.documents.length > 0) {
      const docId = existing.documents[0].$id;
      return await databases.updateDocument(DATABASE_ID, PROGRESS_COLLECTION_ID, docId, payload);
    } else {
      return await databases.createDocument(DATABASE_ID, PROGRESS_COLLECTION_ID, ID.unique(), payload);
    }
  } catch (err) {
    console.warn('Appwrite Progress Sync notice:', err.message || err);
    return null;
  }
}

/**
 * Fetch user daily progress logs from Appwrite
 */
export async function fetchProgressFromAppwrite(userId, dateStr) {
  if (!isAppwriteConfigured() || !userId) return null;

  try {
    const res = await databases.listDocuments(
      DATABASE_ID,
      PROGRESS_COLLECTION_ID,
      [
        Query.equal('userId', userId),
        Query.equal('date', dateStr)
      ]
    );

    if (res.documents.length > 0) {
      const doc = res.documents[0];
      let parsedNotes = {};
      try {
        if (doc.notes && doc.notes.startsWith('{')) {
          parsedNotes = JSON.parse(doc.notes);
        }
      } catch (e) {}

      return {
        date: doc.date,
        userId: doc.userId,
        diet: parsedNotes.diet || { breakfast: doc.dietCompleted, lunch: doc.dietCompleted, dinner: doc.dietCompleted },
        cardio: { minutes: doc.cardioMinutes || 0, completed: doc.cardioMinutes >= 30 },
        workout: { completed: doc.workoutCompleted, exerciseLogs: parsedNotes.exerciseLogs || {} }
      };
    }
  } catch (err) {
    console.warn('Appwrite Fetch Progress notice:', err.message || err);
  }
  return null;
}
