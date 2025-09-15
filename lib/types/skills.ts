import { Status } from "./api";

export interface SKill {
  id: string;
  name: string;
  difficulty: string;
  proficiencyLevel: "L1" | "L2" | "L3" | "L4";
  categoryType: string | null;
  description: string | null;
  objectives: string | null;
  estimatedHours: number;
  status: Status;
  atomNumber: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
