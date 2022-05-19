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
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <img className="mx-auto h-12 w-auto" src="https://cdn.icon-icons.com/icons2/2248/PNG/512/firebase_icon_134985.png" alt="Workflow"/>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            </div>
            <div className="pt-5">
              <label className="sr-only">Email Address</label>
              <input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="email"
                  placeholder="Email Address"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() =>
                  signInWithEmailAndPassword(getAuth(firebase), data.email, data.password)}>Login</button>
          <Link className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                to={"/register"}>Register</Link>
          </div>
      </div>
    </div>
  );
};
export default Login;
