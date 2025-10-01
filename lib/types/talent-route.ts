import { Status } from "./api";

export interface TalentRoute {
  id: string;
  name: string;
  roleName: string;
  description: string;
  image: string;
  status: Status;
  tracks: {
    id: string;
    name: string;
    estimatedMonths: number;
    status: Status;
  }[];
  createdAt: string;
  updatedAt: string;
}
