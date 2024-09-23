import { useLogin } from "@/hooks/useLogin";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const Index = () => {
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
      <div>
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="hover:text-blue-500">Sign up</span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Index;
