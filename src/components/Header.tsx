import { UserIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import NotifyDropdown from "./NotifyDropdown";

type HeaderProps = {
  setCurrentConvId: any;
};

const Headers = ({ setCurrentConvId }: HeaderProps) => {
  const authUser = useContext(AuthContext) as any;
  const navigate = useNavigate();

  return (
    <div className="flex justify-between pt-2">
      <div
        className="text-2xl font-bold select-none cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        EpitechServerlessChat
      </div>
      <div className="flex">
        <div className="h-12 w-12 cursor-pointer hover:bg-neutral-100 p-1 rounded-3xl flex justify-center items-center">
          <UserIcon
            className="h-8 w-8"
            onClick={() => navigate("/profile", { replace: true })}
          />
        </div>

        <div>
          <NotifyDropdown setCurrentConvId={setCurrentConvId} />
        </div>

        <button
          className="font-bold py-2 px-4 rounded-full border-4 border-black hover:bg-black hover:text-white"
          onClick={authUser.logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Headers;
