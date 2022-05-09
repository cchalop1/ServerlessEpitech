import firebase from "../firebase/clientApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(getAuth(firebase));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!loading && user) {
    navigate("/", { replace: true });
    return <></>;
  }
  return (
    <div>
      <div>{error && error.message}</div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() =>
          signInWithEmailAndPassword(getAuth(firebase), email, password)
        }
      >
        Login
      </button>
    </div>
  );
};
export default Login;
