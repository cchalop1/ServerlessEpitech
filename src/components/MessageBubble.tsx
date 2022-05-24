import { Message } from "../types/Messages";
import { useState } from "react";

type MessageBubbleProps = {
  message: Message;
  ownUID: string;
  hasOwnBefore: boolean;
};

export function MessageBubble({ message, ownUID, hasOwnBefore }: MessageBubbleProps) {
  const [isOwnMessage, _setOwnMessage] = useState(message.user.uid === ownUID);
  const [date, _setDate] = useState(new Date(message.createdAt.seconds * 1000))

  return (
    <div className={isOwnMessage ? " self-end" : " self-start"}>
      <div className={"flex " + (!isOwnMessage ? "flex-row" : "flex-row-reverse")}>
        {!hasOwnBefore ? <img src={message.user.imageUrl} alt="" className="w-10 h-10 rounded-full mx-2 mb-6 self-end" /> : <div className="w-10 mx-2 my-0" />}
        <div className={isOwnMessage ? "ml-40" : "mr-40"}>
          <div
            className={
              "py-2 px-4 m-[1px] rounded-lg text-white" +
              (isOwnMessage
                ? " bg-blue-700 hover:bg-blue-500"
                : " bg-green-700 hover:bg-green-500")
            }
          >
            {message.content}
          </div>
          {!hasOwnBefore && <div>{date.toLocaleString()}</div>}
        </div>
      </div>
    </div>
  );
}
