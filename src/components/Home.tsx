import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(getAuth(firebase));

  const logout = () => {
    signOut(getAuth(firebase));
    navigate("/login", { replace: true });
  };

  if (loading) {
    <div>loading...</div>;
  }

  if (!loading && !user) {
    navigate("/login", { replace: true });
    return <div></div>;
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
export default Home;
