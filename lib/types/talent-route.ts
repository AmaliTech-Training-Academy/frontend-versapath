import { Status } from "./api";

export interface TalentRoute {
  id: string;
  name: string;
  roleName: string;
  description: string;
  imageName: string;
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
