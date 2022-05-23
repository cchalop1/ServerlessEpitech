import Messages from "../components/Messages";
import InputMessage from "../components/InputMessage"
import Headers from "../components/Header";
import Conversations from "../components/Conversations";
import { useState } from "react";

const Home = () => {
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);
  return (
    <div className="h-screen pl-10 pr-10">
      <Headers />
      <Conversations setCurrentConvId={setCurrentConvId} />
      {/* {!currentConvId && <MessagesList currentConvId={currentConvId} />} */}
      <InputMessage />
      {/* <Messages /> */}
    </div>
  );
};
export default Home;
