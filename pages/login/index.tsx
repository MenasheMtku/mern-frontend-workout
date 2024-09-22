import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "./index.module.css";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, login, isLoading } = useLogin();

  const router = useRouter();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    await login(email, password);
    router.push("/workouts");
  }

  return (
    <form className={"login"} onSubmit={handleSubmit}>
      <h3>Log in</h3>

      <label>Email</label>
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
        autoFocus
      />
      <label>Password</label>
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit" disabled={isLoading}>
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default index;
