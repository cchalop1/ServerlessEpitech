import firebase from "../firebase/clientApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(getAuth(firebase));

  const [data, setData] = useState({ email: "", password: "" });

  if (!loading && user) {
    navigate("/", { replace: true });
    return <></>;
  }
  return (
    <div>
      <div>{error && error.message}</div>
      <input
        type="email"
        placeholder="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        value={data.password}
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
      <button
        onClick={() =>
          signInWithEmailAndPassword(getAuth(firebase), data.email, data.password)
        }
      >
        Login
      </button>
      <Link to={"/register"}>register</Link>
    </div>
  );
};
export default Login;
