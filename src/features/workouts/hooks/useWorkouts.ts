import { useQuery } from '@tanstack/react-query';
import { fetchWorkouts } from '../api/workouts.api';

export function useWorkouts() {
  return useQuery({ queryKey: ['workouts'], queryFn: fetchWorkouts });
}
