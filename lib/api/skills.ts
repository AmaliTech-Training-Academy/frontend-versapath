import useSWR from "swr";
import { Cluster, ItemData, ListData, Tag } from "../types/api";
import { SKill } from "../types/skills";
import { apiRequest } from "./api-request";
import { AddSkillSchemaProps } from "../schemas/add-skill";

const fetcher = (url: string) => apiRequest<ListData<SKill>>(url, "GET");
export function useFetchSkills(pageIndex: number = 0) {
  const endpoint = `/capsules?page=${pageIndex}`;
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  return {
    skills: data,
    isFetchingSkills: isLoading,
    fetchSkillsError: error,
  };
}

export function deleteSkill(skillId: string) {
  const endpoint = `/capsules/${skillId}`;
  return apiRequest<SKill>(endpoint, "DELETE");
}

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
  console.log("FormData entries:", formData);
  const reponse = await apiRequest<ItemData<SKill>>(
    `/capsules`,
    "POST",
    formData
  );
  return reponse;
};
