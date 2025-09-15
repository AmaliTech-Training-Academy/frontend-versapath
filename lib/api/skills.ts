import useSWR from "swr";
import {
  Cluster,
  ItemData,
  ListData,
  SingleSkillResponse,
  Tag,
} from "../types/api";
import { SKill } from "../types/skills";
import { apiRequest } from "./api-request";
import { AddSkillSchemaProps } from "../schemas/add-skill";
import { success } from "zod";

const fetcher = (url: string) => apiRequest<ListData<SKill>>(url, "GET");
const singleSKillFetcher = (url: string) =>
  apiRequest<ItemData<SingleSkillResponse>>(url, "GET");
export function useFetchSkills(pageIndex: number = 0) {
  const endpoint = `/capsules?page=${pageIndex}`;
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  return {
    skills: data,
    isFetchingSkills: isLoading,
    fetchSkillsError: error,
  };
}
export const useFetchSingleSkill = (skillId: string) => {
  const endpoint = `/capsules/${skillId}`;
  if (!skillId)
    return {
      skill: null,
      isFetchingSkill: false,
      fetchSkillError: {
        success: false,
        message: "Skill not found",
        errors: "The specified skill could not be found",
      },
    };
  const { data, error, isLoading } = useSWR(endpoint, singleSKillFetcher);
  return {
    skill: data,
    isFetchingSkill: isLoading,
    fetchSkillError: error,
  };
};
export function deleteSkill(skillId: string) {
  const endpoint = `/capsules/${skillId}`;
  return apiRequest<SKill>(endpoint, "DELETE");
}
export const updateSKillAtoms = ({
  existingIds,
  selectedIds,
  skillId,
}: {
  existingIds: string[];
  selectedIds: string[];
  skillId: string;
}) => {
  const endpoint = `/capsules/assignAtom/${skillId}`;
  const idsToAdd = selectedIds.filter((id) => !existingIds.includes(id));
  const idsToRemove = existingIds.filter((id) => !selectedIds.includes(id));

  if (idsToAdd.length === 0 && idsToRemove.length === 0) {
    return Promise.resolve({
      success: true,
      message: "No changes to update",
      data: null,
    } as { success: boolean; message: string; data: null });
  }
  if (idsToAdd.length > 0) {
    return apiRequest<SKill>(endpoint, "PATCH", {
      atomIds: [...new Set(idsToAdd)],
    });
  }
  if (idsToRemove.length > 0) {
    return apiRequest<SKill>(endpoint, "PATCH", {
      removeAtomIds: [...new Set(idsToRemove)],
    });
  }
};
export const handleSkillSubmission = async (
  data: AddSkillSchemaProps,
  {
    existingTags,
    existingCategories,
  }: { existingTags: Tag[]; existingCategories: Cluster[] }
) => {
  const {
    tags,
    categories,
    objectives,
    description,
    name,
    difficulty,
    proficiencyLevel,
    estimatedHours,
    cover, // File object
  } = data;

  // Handle tags logic (existing code)
  const clusterIds = existingCategories
    .filter((category) => categories.includes(category.name || category.id))
    .map((cat) => cat.id);

  const newTags = tags.filter(
    (tag) => !existingTags.some((existingTag) => existingTag.name === tag)
  );

  let tagIds: string[] = [];

  if (newTags.length > 0) {
    const newlyAddedTagsResponse = await apiRequest<
      ItemData<{ id: string; name: string }[]>
    >("/tags/addMultipleTags", "POST", newTags);

    if (!newlyAddedTagsResponse.success) {
      return {
        success: false,
        message: "Failed to add new tags. Consider trying again",
      };
    }

    tagIds =
      newlyAddedTagsResponse.data?.item
        .map((tag) => tag.id)
        .concat(
          existingTags
            .filter((tag) => tags.includes(tag.name))
            .map((tag) => tag.id)
        ) || [];
  } else {
    tagIds = existingTags
      .filter((tag) => tags.includes(tag.name))
      .map((tag) => tag.id);
  }

  // Create FormData for file upload
  const formData = new FormData();
  formData.append(
    "capsule",
    new Blob(
      [
        JSON.stringify({
          name,
          description: description || "",
          objectives: objectives || "",
          proficiencyLevel,
          tagIds,
          clusterIds,
          atomIds: [] as string[],
          estimatedHours,
          difficulty,
        }),
      ],
      { type: "application/json" }
    )
  );
  if (cover) {
    formData.append("image", cover);
  }
  const reponse = await apiRequest<ItemData<SKill>>(
    `/capsules`,
    "POST",
    formData
  );
  return reponse;
};
