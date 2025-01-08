import { useAuthContext } from "@/hooks/useAuthContext";
import { useWorkoutsContext } from "@/hooks/useWorkoutContext";
import { Workout } from "@/types/";
import axios from "axios";
import React, { useEffect, useState } from "react";
// ui import
import FormButton from "@/ui/FormButton";
import { FormInput } from "@/ui/FormInput";
import { FormLable } from "@/ui/FormLabel";

interface WorkoutFormProps {
  selectedWorkout?: Workout | null;
  resetSelectedWorkout?: () => void;
}

export default function WorkoutForm({
  selectedWorkout,
  resetSelectedWorkout,
}: WorkoutFormProps) {
  const { dispatch } = useWorkoutsContext();
  const {
    state: { user },
  } = useAuthContext();

  const [form, setForm] = useState<Workout>({
    title: "",
    reps: 0,
    load: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  // Reset form after successful update or addition
  const resetForm = () => {
    setForm({ title: "", reps: 0, load: 0 });
    setError(null);
    setSuccess(null);
    setEmptyFields([]);
    if (resetSelectedWorkout) {
      // Reset the selected workout (clear edit mode)
      resetSelectedWorkout();
    }
  };

  useEffect(() => {
    if (selectedWorkout) {
      setForm({
        title: selectedWorkout.title,
        reps: selectedWorkout.reps,
        load: selectedWorkout.load,
      });
    } else {
      resetForm();
    }
  }, [selectedWorkout]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) {
      setError("You must be logged in to add a workout");
      return;
    }
    const config = {
      headers: {
        // Add user token here
        Authorization: `Bearer ${user.token}`,
      },
    };

    try {
      let response;

      if (selectedWorkout) {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}api/workouts/${selectedWorkout._id}`,
          form,
          config
        );
        dispatch({ type: "UPDATE_WORKOUT", payload: response.data });
        setSuccess("Workout updated successfully!");
        console.log(selectedWorkout);
      } else {
        // Add a new workout
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}api/workouts`,
          form,
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
      className="w-full mx-auto p-4 bg-stone-300 shadow-md rounded-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4">Add New Workout</h2>

      <div className="flex flex-col justify-between gap-4">
        <div className="mb-2">
          <FormLable htmlFor="title">Title</FormLable>
          <FormInput
            id="title"
            value={form.title}
            type="text"
            name="title"
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="mb-4">
            <FormLable htmlFor="reps">Reps</FormLable>
            <FormInput
              type="number"
              id="reps"
              value={form?.reps}
              name="reps"
              onChange={e => setForm({ ...form, reps: Number(e.target.value) })}
            />
          </div>
          <div className="mb-4">
            <FormLable htmlFor="load">Load (kg)</FormLable>
            <FormInput
              type="number"
              id="load"
              value={form.load}
              onChange={e => setForm({ ...form, load: Number(e.target.value) })}
            />
          </div>
        </div>
        <FormButton
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-400  text-white p-2 rounded-md transition duration-300"
        >
          {selectedWorkout ? "Update Workout" : "Add Workout"}
        </FormButton>
      </div>
      {error && <p>{emptyFields}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}
