import InputMessage from "../components/InputMessage"
import MessagesList from "../components/MessagesList";
import Headers from "../components/Header";
import Conversations from "../components/Conversations";
import { useState } from "react";

const Home = () => {
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);
  return (
    <div className="h-screen pl-10 pr-10">
      <Headers />
      <Conversations setCurrentConvId={setCurrentConvId} />
      {currentConvId && <div className="flex flex-col ml-80 h-screen pb-4">
        <MessagesList currentConvId={currentConvId} />
        <InputMessage currentConvId={currentConvId} />
      </div>}
    </div>
  );
};
export default Home;
