import { getAuth } from "firebase/auth";
import { createContext, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const initState = {};

export const AuthContext = createContext(initState);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, loading] = useAuthState(getAuth());
  const navigate = useNavigate();
  if (loading) {
    return <Suspense children={<div>loading...</div>}></Suspense>;
  }
  if (!user || !loading) {
    navigate("/login");
    return <Suspense children={<div>loading...</div>}></Suspense>;
  }
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
