import { useState, useEffect } from "react";
import axios from "axios";
import { useWorkoutsContext } from "@/hooks/useWorkoutContext";
import { Workout } from "@/types/Workout";
import { useAuthContext } from "@/hooks/useAuthContext";

interface WorkoutFormProps {
  selectedWorkout?: Workout | null;
  resetSelectedWorkout?: () => void;
}

export default function WorkoutForm({
  selectedWorkout,
  resetSelectedWorkout,
}: WorkoutFormProps) {
  const { dispatch } = useWorkoutsContext();
  const { state } = useAuthContext();

  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  // Reset form after successful update or addition
  const resetForm = () => {
    setTitle("");
    setReps("");
    setLoad("");
    setError(null);
    setSuccess(null);
    setEmptyFields([]);
    if (resetSelectedWorkout) {
      resetSelectedWorkout(); // Reset the selected workout (clear edit mode)
    }
  };

  useEffect(() => {
    if (selectedWorkout) {
      setTitle(selectedWorkout.title);
      setReps(selectedWorkout.reps.toString());
      setLoad(selectedWorkout.load.toString());
    }
  }, [selectedWorkout]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!state.user) {
      setError("You must be logged in to add a workout");
      return;
    }
    const config = {
      headers: {
        // Add user token here
        Authorization: `Bearer ${state.user.token}`,
      },
    };
    // Convert reps and load back to numbers before sending the request
    const workout = { title, reps: Number(reps), load: Number(load) };

    try {
      let response;

      if (selectedWorkout) {
        // Update the workout
        selectedWorkout.title = title;
        selectedWorkout.reps = Number(reps);
        selectedWorkout.load = Number(load);

        console.log(selectedWorkout);
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}api/workouts/${selectedWorkout._id}`,
          workout,
          config
        );
        dispatch({ type: "UPDATE_WORKOUT", payload: response.data });
        setSuccess("Workout updated successfully!");
      } else {
        // Add a new workout
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/workouts`,
          workout,
          config
        );
        setSuccess("Workout added successfully!");
        // Dispatch the new workout to update the state without reloading the page
        dispatch({ type: "CREATE_WORKOUT", payload: response.data });
        // Debugging or to do something with the response
        console.log(response.data);
      }
      // Reset the form after success
      resetForm();
    } catch (error: any) {
      setError("Failed to add workout. Please try again.");
      setEmptyFields(error.response.data.emptyFields || []);
      console.error(error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">Add New Workout</h2>

      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={`{mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200} ${
            Array.isArray(emptyFields) && emptyFields.includes("title")
              ? `border-red-500`
              : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="reps"
          className="block text-sm font-medium text-gray-700"
        >
          Reps
        </label>
        <input
          type="number"
          id="reps"
          value={reps}
          onChange={e => setReps(e.target.value)}
          className={`{mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200} ${
            Array.isArray(emptyFields) && emptyFields.includes("reps")
              ? `border-red-500`
              : ""
          }`}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="load"
          className="block text-sm font-medium text-gray-700"
        >
          Load (kg)
        </label>
        <input
          type="number"
          id="load"
          value={load}
          onChange={e => setLoad(e.target.value)}
          className={`{mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200} ${
            Array.isArray(emptyFields) && emptyFields.includes("load")
              ? `border-red-500`
              : ""
          }`}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition duration-300"
      >
        {selectedWorkout ? "Update Workout" : "Add Workout"}
      </button>
      {error && <p>{emptyFields}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}
