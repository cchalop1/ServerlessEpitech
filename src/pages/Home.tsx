import firebase from "../firebase/clientApp";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Messages from "../components/Messages";

const Home = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(getAuth(firebase));
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen pl-10 pr-10">
      <div className="flex justify-between pt-2">
        <div className="text-2xl font-bold">EpitechServerless</div>
        <button
          className="font-bold py-2 px-4 rounded-full border-4 border-black hover:bg-black hover:text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <Messages />
    </div>
  );
};
export default Home;
