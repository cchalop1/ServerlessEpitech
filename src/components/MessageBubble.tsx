import { Message } from "../types/Messages";
import { Picture } from "../types/Pictures";
import { FileMessage } from "../types/FileMessage";
import { useState } from "react";
import { Link } from "react-router-dom"
import fileLogo from '../assets/file.png'

type MessageBubbleProps = {
  message: Message | Picture | FileMessage;
  ownUID: string;
  hasOwnBefore: boolean;
};

export function MessageBubble({ message, ownUID, hasOwnBefore }: MessageBubbleProps) {
  const [isOwnMessage, _setOwnMessage] = useState(message.user.uid === ownUID);
  const [date, _setDate] = useState(message.createdAt ? new Date(message.createdAt.seconds * 1000) : null)

  return (
    <div className={isOwnMessage ? " self-end" : " self-start"}>
      <div className={"flex " + (!isOwnMessage ? "flex-row" : "flex-row-reverse")}>
        {!hasOwnBefore && <img src={message.user.imageUrl} alt="" className="w-10 h-10 shrink-0 mb-6 rounded-full self-end" />}
        <div className={isOwnMessage ? (hasOwnBefore ? "ml-40 mr-10" : "ml-40") : (hasOwnBefore ? "ml-10 mr-40" : "mr-40")}>
          <div
            className={
              "py-2 px-4 m-[1px] rounded-lg text-white " +
              (isOwnMessage
                ? " bg-blue-700 hover:bg-blue-500"
                : " bg-green-700 hover:bg-green-500")
            }
          >
            {"content" in message && message.content}
            {"imageUrl" in message && <img src={message.imageUrl} />}
            {"fileUrl" in message && <a href={message.fileUrl} className="flex flex-row content-center">
              <img src={fileLogo} alt={`file from ${message.user.username}`} className="w-10" />
              <div className="p-2">File Sent</div>
            </a>}
          </div>
          {!hasOwnBefore && <div>{date?.toLocaleString()}</div>}
        </div>
      </div>
    </div>
  );
}
