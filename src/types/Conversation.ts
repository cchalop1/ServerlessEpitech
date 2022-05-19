import { User } from "./User";

export type Conversation = {
  id: string;
  icon: String;
  name: String;
  userId: User;
  users: [User];
};
