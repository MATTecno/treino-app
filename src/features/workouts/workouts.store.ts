import { create } from 'zustand';
import type { Workout, Exercise } from './workouts.types';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

type WorkoutsState = {
  workouts: Workout[];
  createWorkout: (name: string) => Workout;
  renameWorkout: (workoutId: string, name: string) => void;
  deleteWorkout: (workoutId: string) => void;

  addExercise: (workoutId: string, exercise: Omit<Exercise, 'id'>) => void;
  removeExercise: (workoutId: string, exerciseId: string) => void;
};

export const useWorkoutsStore = create<WorkoutsState>((set, get) => ({
  workouts: [
    { id: '1', name: 'Push A', createdAt: new Date().toISOString(), exercises: [] },
    { id: '2', name: 'Pull B', createdAt: new Date().toISOString(), exercises: [] },
  ],

  createWorkout: (name) => {
    const w: Workout = { id: uid(), name, createdAt: new Date().toISOString(), exercises: [] };
    set({ workouts: [w, ...get().workouts] });
    return w;
  },

  renameWorkout: (workoutId, name) => {
    set({
      workouts: get().workouts.map(w => (w.id === workoutId ? { ...w, name } : w)),
    });
  },

  deleteWorkout: (workoutId) => {
    set({ workouts: get().workouts.filter(w => w.id !== workoutId) });
  },

  addExercise: (workoutId, exercise) => {
    set({
      workouts: get().workouts.map(w => {
        if (w.id !== workoutId) return w;
        const ex: Exercise = { id: uid(), ...exercise };
        return { ...w, exercises: [...w.exercises, ex] };
      }),
    });
  },

  removeExercise: (workoutId, exerciseId) => {
    set({
      workouts: get().workouts.map(w => {
        if (w.id !== workoutId) return w;
        return { ...w, exercises: w.exercises.filter(e => e.id !== exerciseId) };
      }),
    });
  },
}));
