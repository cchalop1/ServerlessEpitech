import { Message } from "./Messages";

export type Notification = {
  id: string;
  createdAt: number;
  message: Message;
  notifiedUserId: string;
};
