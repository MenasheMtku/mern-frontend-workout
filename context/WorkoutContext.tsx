import { createContext, useReducer, ReactNode, Dispatch } from "react";

import { Workout } from "@/types/Workout";

// Define the structure of the context state
interface WorkoutsState {
  workouts: Workout[] | null;
}

// Define action types for the reducer
type WorkoutAction =
  | { type: "SET_WORKOUTS"; payload: Workout[] | null }
  | { type: "CREATE_WORKOUT"; payload: Workout }
  | { type: "DELETE_WORKOUT"; payload: Workout }
  | { type: "UPDATE_WORKOUT"; payload: Workout };

// Create the context with proper types
interface WorkoutsContextType extends WorkoutsState {
  dispatch: Dispatch<WorkoutAction>;
}

export const WorkoutsContext = createContext<WorkoutsContextType | undefined>(
  undefined
);

// Reducer function with TypeScript types
export const workoutsReducer = (
  state: WorkoutsState,
  action: WorkoutAction
): WorkoutsState => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload ?? [],
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...(state.workouts || [])],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: (state.workouts || []).filter(
          workout => workout._id !== action.payload._id
        ),
      };
    case "UPDATE_WORKOUT":
      return {
        workouts:
          state.workouts ||
          [].map((workout: Workout) =>
            workout._id === action.payload._id ? action.payload : workout
          ),
      };
    default:
      return state;
  }
};

// Define the props type for the provider component
interface WorkoutsContextProviderProps {
  children: ReactNode;
}

export const WorkoutsContextProvider = ({
  children,
}: WorkoutsContextProviderProps) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
// Export the type for external usage
export type { WorkoutsContextType };
