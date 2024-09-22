import { ReactNode } from "react";
import Navbar from "./Navbar";
import { AuthContextProvider } from "@/context/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthContextProvider>
      <Navbar />
      <main className="max-w-[1440px] mx-auto p-4">{children}</main>
    </AuthContextProvider>
  );
}
