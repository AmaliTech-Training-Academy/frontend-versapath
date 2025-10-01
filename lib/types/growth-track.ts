import { Status } from "./api";
import { SKill } from "./skills";

export interface GrowthTrack {
  id: string;
  name: string;
  description: string;
  image: string;
  estimatedMonths: string;
  status: Status;
  capsules: Pick<SKill, "id" | "name" | "difficulty" | "proficiencyLevel">[];
  createdAt: string;
  updatedAt: string;
}
