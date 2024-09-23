import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuthContext } from "@/hooks/useAuthContext";

export default function Home() {
  const [message, setMessage] = useState("Loading");
  const router = useRouter();
  const {
    state: { user },
  } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    }
    // Fetch data from the Node.js backend
    axios
      .get("https://mern-backend-workout.onrender.com")
      .then(response => {
        setMessage(response.data.mssg);
        console.log(response.data.mssg);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, [router, user]);

  if (!user) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="text-center flex flex-col gap-4">
      <h1 className="text-2xl">Node js and Next js</h1>

      <p className="font-normal">{message}</p>
    </div>
  );
}
