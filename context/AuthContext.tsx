import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";

// Define the type for the user
import { User } from "@/types/User";

// Define the shape of the context state
interface AuthState {
  user: User | null;
}
// Define the action types and payloads
type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Create the context type
export interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

// Initialize the AuthContext with a default value of undefined
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Auth reducer function with proper types
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Provider component with children props properly typed
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  console.log("AuthContext state: ", state);

  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson) {
      const user = JSON.parse(userJson);

      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
