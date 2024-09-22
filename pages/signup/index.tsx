import { useSignup } from "@/hooks/useSignup";
import Link from "next/link";
import { FormEvent, useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signup, isLoading } = useSignup();

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    await signup(email, password);
  }

  return (
    <>
      <form className={"login"} onSubmit={handleSubmit}>
        <h3>Sign up</h3>

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
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
        <div>
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login">
              <span className="hover:text-blue-500">Log in</span>
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default Index;
