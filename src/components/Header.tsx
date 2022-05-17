import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Headers = () => {
  const authUser = useContext(AuthContext) as any;

  return (
    <div className="flex justify-between pt-2">
      <div className="text-2xl font-bold">EpitechServerlessChat</div>
      <button
        className="font-bold py-2 px-4 rounded-full border-4 border-black hover:bg-black hover:text-white"
        onClick={authUser.logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Headers;
