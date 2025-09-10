import { SkillAtom } from "@/lib/types/skill-atom";
import { apiRequest } from "./api-request";
import { ApiError } from "./reset-password";
import { ApiResponse, ItemData, ListData } from "../types/api";


export const atomApi = {
  fetchAtoms: async () => {
    const result = await apiRequest<ListData<SkillAtom>>("/atoms", "GET");

    if (result.success === true && result.data && "items" in result.data) {
      return result.data?.items;
    }
    throw new ApiError(
      404,
      result.message || "Failed to fetch atoms: Unexpected response structure"
    );
  },

  createAtom: async (atom: {
    name: string;
    description: string;
    objectives: string;
    estimatedHours: number;
    status: string;
  }) => {
    const result = await apiRequest<ItemData<SkillAtom>>(
      "/atoms",
      "POST",
      atom
    );
    if (!result.success) {
      throw new ApiError(404, result.message || "Failed to create atom");
    }

    return result.data?.item;
  },

  deleteAtom: async (id: string): Promise<{ success: boolean }> => {
    const result = await apiRequest<{ message: string }>(
      `/atoms/${id}`,
      "DELETE"
    );

    if (!result.success) {
      throw new ApiError(404, result.message || "Failed to delete atom");
    }

    return { success: true };
  },

  updateAtom: async (id: string, payload: Partial<SkillAtom>) => {
    const result = await apiRequest<ItemData<SkillAtom>>(
      `/atoms/${id}`,
      "PATCH",
      payload
    );

    if (!result.success) {
      throw new ApiError(404, result.message || "Failed to update atom");
    }
    if (result.data?.item) return result.data.item;
    return null;
  },
};
