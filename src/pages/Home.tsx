import InputMessage from "../components/InputMessage"
import MessagesList from "../components/MessagesList";
import Headers from "../components/Header";
import Conversations from "../components/Conversations";
import { useState } from "react";

const Home = () => {
  const [currentConvId, setCurrentConvId] = useState<string | null>(null);
  return (
    <div className="h-screen pl-10 pr-10 flex flex-col">
      <Headers />
      <div className="flex-grow flex flex-row">
        <Conversations setCurrentConvId={setCurrentConvId} />
        {currentConvId && <div className="flex-grow flex flex-col h-[90vh] ml-80 pb-4">
          <MessagesList currentConvId={currentConvId} />
          <InputMessage currentConvId={currentConvId} />
        </div>}
      </div>
    </div>
  );
};
export default Home;
