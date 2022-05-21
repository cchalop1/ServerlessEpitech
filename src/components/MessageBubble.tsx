import { Message } from "../types/Messages";
import { useState } from "react";

type MessageBubbleProps = {
  message: Message;
  ownUID: string;
};

export function MessageBubble({ message, ownUID }: MessageBubbleProps) {
  const [isOwnMessage, _setOwnMessage] = useState(message.user.uid === ownUID);

  return (
    <div className={isOwnMessage ? " self-end" : " self-start"}>
      <div className={"flex " + (!isOwnMessage ? "flex-row" : "flex-row-reverse")}>
        <img src={message.user.imageUrl} alt="" className="w-10 h-10 rounded-full mx-2" />
        <div
          className={
            "py-2 px-4 m-1 rounded-lg text-white" +
            (isOwnMessage
              ? " bg-blue-700 hover:bg-blue-500"
              : " bg-green-700 hover:bg-green-500")
          }
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
