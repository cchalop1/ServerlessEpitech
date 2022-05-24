import { User } from "./User";

export type Message = {
  id: string;
  convID: string;
  content: string;
  createdAt: any;
  user: User;
  createdTimestamp: number;
};
