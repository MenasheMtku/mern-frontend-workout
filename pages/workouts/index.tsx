import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
// components
import WorkoutDetails from "@/components/WorkoutDetails";
import WorkoutForm from "@/components/WorkoutForm";
// Workout interface
import { Workout } from "@/types/Workout";
// context hook
import { useWorkoutsContext } from "@/hooks/useWorkoutContext";

export default function Workouts() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const { state } = useAuthContext();

  const resetSelectedWorkout = () => {
    // Reset to null to go back to "Add Workout" mode
    setSelectedWorkout(null);
  };

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get<Workout[]>(
          `${process.env.NEXT_PUBLIC_API_URL}api/workouts`,
          {
            headers: {
              Authorization: `Bearer ${state.user?.token}`,
            },
          }
        );
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    if (state.user) {
      fetchWorkouts();
    }
  }, [dispatch, state.user]);

  const handleEditWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center py-3 text-3xl">Workouts Page</h1>

      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {workouts &&
            workouts.map((workout: Workout) => (
              <WorkoutDetails
                workout={workout}
                key={workout._id}
                onEdit={handleEditWorkout}
              />
            ))}
        </div>
        <div>
          <WorkoutForm
            selectedWorkout={selectedWorkout}
            resetSelectedWorkout={resetSelectedWorkout}
          />
        </div>
      </div>
    </div>
  );
}
