import { User } from "./User";

export type Picture = {
  id: string;
  convID: string;
  imageUrl: string;
  createdAt: any;
  user: User;
};
