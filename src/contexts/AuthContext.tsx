import { getAuth } from "firebase/auth";
import { createContext, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const initState = {};

export const AuthContext = createContext(initState);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user] = useAuthState(getAuth());
  if (!user) {
    return <Suspense></Suspense>;
  }
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
