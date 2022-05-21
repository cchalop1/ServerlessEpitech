import { User } from "./User";

export type Message = {
  id: string;
  convID: string;
  content: string;
  createdAt: Date;
  user: User;
};
