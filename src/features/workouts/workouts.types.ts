export type Exercise = {
  id: string;
  name: string;
  muscleGroup?: string;
};

export type Workout = {
  id: string;
  name: string;
  createdAt: string;
  exercises: Exercise[];
};
