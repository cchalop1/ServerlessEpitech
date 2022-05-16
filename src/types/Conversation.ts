import { User } from "firebase/auth";
import { Message } from "./Messages";

export type Conversation = {
  id: string;
  messages: [Message];
  name: String;
  users: [User];
  createAt: Date;
};
