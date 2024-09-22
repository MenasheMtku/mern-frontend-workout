import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutDispatch } = useWorkoutsContext();

  const logout = () => {
    localStorage.removeItem("user");
    workoutDispatch({ type: "SET_WORKOUTS", payload: null });
    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
