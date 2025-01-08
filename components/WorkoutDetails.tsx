import axios from "axios";
import { FC } from "react";
// import trash icon
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { formatDistanceToNow } from "date-fns";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useWorkoutsContext } from "@/hooks/useWorkoutContext";

// Workout interface
import { Workout } from "@/types/";

interface WorkoutProps {
  workout: Workout;
  onEdit: (workout: Workout) => void;
}

const WorkoutDetails: FC<WorkoutProps> = ({ workout, onEdit }) => {
  const { dispatch } = useWorkoutsContext();
  const {
    state: { user },
  } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${workout._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: "DELETE_WORKOUT", payload: workout });
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <>
      <div key={workout._id} className="mb-2 p-3 bg-slate-200">
        <h4 className="font-semibold mb-2">{workout.title}</h4>
        <div className="flex justify-between items-end">
          <ul>
            <li>
              <a>Reps: </a>
              {workout.reps}
            </li>
            <li>
              <a>Load (kg): </a>
              {workout.load}
            </li>
            <li>
              <a>Created in: </a>
              {formatDistanceToNow(new Date(workout.createdAt ?? ""), {
                addSuffix: true,
              })}
            </li>
          </ul>
          <div className="flex gap-6">
            <button
              className="bg-slate-600 text-white p-2 rounded-lg"
              onClick={handleDelete}
            >
              <FaRegTrashAlt />
            </button>
            <button
              className="bg-slate-600 text-white p-2 rounded-lg"
              onClick={() => onEdit(workout)}
            >
              <MdEdit />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkoutDetails;
