import firebase from "../firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(getAuth(firebase));

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
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
        onClick={() => {
          createUserWithEmailAndPassword(data.email, data.password);
          navigate("/login", { replace: true });
        }}
      >
        Register
      </button>
      <Link to={"/login"}>login</Link>
    </div>
  );
};

export default Register;
