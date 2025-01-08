export interface Workout {
  _id?: string;
  title: string;
  reps: number;
  load: number;
  createdAt?: string;
}

export interface User {
  // id: string;
  email: string;
  password: string;
  token?: string;
}
