import { User } from "./User";

export type FileMessage = {
    id: string;
    convID: string;
    fileUrl: string;
    createdAt: any;
    user: User;
  };