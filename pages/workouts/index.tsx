"use client";

import { useAuthContext } from "@/hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
// components
import WorkoutDetails from "@/components/WorkoutDetails";
import WorkoutForm from "@/components/WorkoutForm";

// Import skeleton CSS
import "react-loading-skeleton/dist/skeleton.css";

import WorkoutSkeleton from "@/components/WorkoutSkeleton";
// Workout interface
import { Workout } from "@/types/";
// context hook
import { useWorkoutsContext } from "@/hooks/useWorkoutContext";
import { useRouter } from "next/router";

export default function Workouts() {
  const { workouts, dispatch } = useWorkoutsContext();
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  // check if there is any data
  const [loading, setLoading] = useState(true);

  const {
    state: { user },
  } = useAuthContext();
  const router = useRouter();

  const resetSelectedWorkout = () => {
    // Reset to null to go back to "Add Workout" mode
    setSelectedWorkout(null);
  };

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get<Workout[]>(
          `${process.env.NEXT_PUBLIC_API_URL}api/workouts`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        dispatch({ type: "SET_WORKOUTS", payload: response.data });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  const handleEditWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
  };

  return (
    <div className="flex flex-col gap-4 bg-red-200 p-4 min-h-screen">
      <h1 className="text-center py-3 text-3xl">Workouts Page</h1>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_2fr]">
        <div>
          <WorkoutForm
            selectedWorkout={selectedWorkout}
            resetSelectedWorkout={resetSelectedWorkout}
          />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {loading
            ? // Render skeletons while loading
              Array(6)
                .fill(0)
                .map((_, idx) => <WorkoutSkeleton key={idx} />)
            : workouts &&
              workouts.map((workout: Workout) => (
                <WorkoutDetails
                  workout={workout}
                  key={workout._id}
                  onEdit={handleEditWorkout}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
