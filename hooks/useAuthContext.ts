import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AuthContextType } from "@/context/AuthContext";

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
