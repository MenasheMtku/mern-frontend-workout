import Link from "next/link";
import { useRouter } from "next/router";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/hooks/useAuthContext";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const {
    state: { user },
  } = useAuthContext();

  // const { user } = useAuthContext();
  const { logout } = useLogout();

  function handleLogout(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    logout();
    console.log("user logged out");
    router.push("/");
  }

  return (
    <header className="w-full bg-slate-400">
      <nav className="p-4 text-white max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center px-4">
          <Link href="/" id="link" className="text-2xl font-extrabold">
            <Image
              src="/images/Gym-Logo.png"
              alt="logo"
              width={80}
              height={80}
            />
          </Link>
          <ul className="flex space-x-4 items-baseline font-semibold text-black">
            <Link href={"/"} id="link">
              Home
            </Link>
            {!user && (
              <>
                <Link href={"/login"} id="link">
                  Log in
                </Link>
                <Link href={"/signup"} id="link">
                  Sign up
                </Link>
              </>
            )}
            {user && (
              <>
                <li>
                  <Link href={"/workouts"} id="link">
                    Workouts
                  </Link>
                </li>
                <li>
                  <p className=" bg-green-700 text-slate-200 px-[8px] py-[4px] rounded-md">
                    {" "}
                    Hi {user.email.split("@")[0]}
                  </p>
                </li>
                <li>
                  <button
                    className=" bg-slate-700  text-slate-200 px-[8px] py-[4px] font-semibold border-green-400 rounded-md"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
