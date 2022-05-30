import { User } from "./User";

export type Conversation = {
  id: string;
  icon: string;
  name: string;
  userId: User;
  users: [User];
};
