import Skeleton from "react-loading-skeleton";

const WorkoutSkeleton = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <Skeleton height={20} width={`80%`} />
      <Skeleton height={10} width={`60%`} />
      <Skeleton height={10} width={`20%`} />
      <Skeleton height={10} width={`40%`} />
    </div>
  );
};

export default WorkoutSkeleton;
