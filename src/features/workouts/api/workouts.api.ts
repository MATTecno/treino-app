import { api } from '../../../services/api';
export type Workout = { id: string; name: string; lastAt?: string };

export async function fetchWorkouts(): Promise<Workout[]> {
  const { data } = await api.get('/workouts');
  return data;
}
