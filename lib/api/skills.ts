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
import { LessonContentsResponse, SkillAtom } from "../types/skill-atom";

const fetcher = (url: string) => apiRequest<ListData<SKill>>(url, "GET");
const singleSKillFetcher = (url: string) =>
  apiRequest<ItemData<SingleSkillResponse>>(url, "GET");
export function useFetchSkills(pageIndex: number = 0) {
  const endpoint = `/capsules?page=${pageIndex}&size=10`;
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  return {
    skills: data,
    isFetchingSkills: isLoading,
    fetchSkillsError: error,
  };
}
export const useFetchSingleSkill = (skillId: string) => {
  const endpoint = `/capsules/${skillId}`;
  const { data, error, isLoading } = useSWR(endpoint, singleSKillFetcher);
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
export const updateSKillAtoms = async ({
  existingIds,
  selectedIds,
  skillId,
}: {
  existingIds: string[];
  selectedIds: string[];
  skillId: string;
}) => {
  const endpoint = `/capsules/assignAtom/${skillId}`;
  const deleteEndpoint = `/capsules/removeAtom?capsuleId=${skillId}`;
  const idsToAdd = selectedIds.filter((id) => !existingIds.includes(id));
  const idsToRemove = existingIds.filter((id) => !selectedIds.includes(id));

  if (idsToAdd.length === 0 && idsToRemove.length === 0) {
    return {
      success: true,
      message: "No changes to update",
      data: null,
    };
  }

  try {
    const resultPromises = [];

    if (idsToAdd.length > 0) {
      resultPromises.push(
        apiRequest<SKill>(endpoint, "PATCH", {
          atomIds: [...new Set(idsToAdd)],
        })
      );
    }

    if (idsToRemove.length > 0) {
      resultPromises.push(
        apiRequest<SKill>(deleteEndpoint, "DELETE", {
          atomIds: [...new Set(idsToRemove)],
        })
      );
    }

    const results = await Promise.all(resultPromises);

    const allSuccessful = results.every((result) => result.success);

    if (!allSuccessful) {
      const failedResult = results.find((result) => !result.success);
      return {
        success: false,
        message: failedResult?.message || "Failed to update skill atoms",
        errors: failedResult?.errors || ["Update operation failed"],
      };
    }

    return {
      success: true,
      message: "Skill atoms updated successfully",
      data: results,
    };
  } catch (error) {
    console.error("Error updating skill atoms:", error);
    return {
      success: false,
      message: "An unexpected error occurred while updating skill atoms",
      errors: [error instanceof Error ? error.message : "Unknown error"],
    };
  }
};
export const handleSkillSubmission = async (
  data: AddSkillSchemaProps,
  {
    existingTags,
    existingCategories,
    newCategoriesIds,
    newTagsIds,
  }: {
    existingTags: Tag[];
    existingCategories: Cluster[];
    newCategoriesIds?: string[];
    newTagsIds?: string[];
  }
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
    cover,
  } = data;

  const clusterIds = existingCategories
    .filter((category) => categories?.includes(category.name || category.id))
    .map((cat) => cat.id)
    .concat(newCategoriesIds || []);

  // Get existing tag IDs from selected tags
  const existingTagIds = existingTags
    .filter((tag) => tags?.includes(tag.name))
    .map((tag) => tag.id);

  // Get new tags that need to be created (not in existing tags and not from API search)
  const newTagsToCreate = tags?.filter(
    (tag) =>
      !existingTags.some((existingTag) => existingTag.name === tag) &&
      !(newTagsIds && newTagsIds.length > 0) // Only create if no API results were selected
  );

  let tagIds: string[] = [...existingTagIds];

  // Add new tag IDs from API search results
  if (newTagsIds && newTagsIds.length > 0) {
    tagIds = [...tagIds, ...newTagsIds];
  }

  // Create new tags if any
  if (newTagsToCreate && newTagsToCreate.length > 0) {
    const newlyAddedTagsResponse = await apiRequest<
      ItemData<{ id: string; name: string }[]>
    >("/tags/addMultipleTags", "POST", newTagsToCreate);

    if (!newlyAddedTagsResponse.success) {
      return {
        success: false,
        message: "Failed to add new tags. Consider trying again",
      };
    }

    const newlyCreatedTagIds =
      newlyAddedTagsResponse.data?.item.map((tag) => tag.id) || [];

    tagIds = [...tagIds, ...newlyCreatedTagIds];
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
  const response = await apiRequest<ItemData<SKill>>(
    `/capsules`,
    "POST",
    formData
  );
  return response;
};
export const removeLessonDuplicates = (lessons: SkillAtom[]) => {
  const uniqueLessons: SkillAtom[] = [
    ...new Set(lessons.map((obj) => JSON.stringify(obj))),
  ].map((str) => JSON.parse(str));
  return uniqueLessons;
};

export const useFetchLesson = (lessonId: string) => {
  const endpoint = `/atoms/${lessonId}`;
  const { data, error, isLoading } = useSWR(endpoint, (url) =>
    apiRequest<ItemData<SkillAtom>>(url, "GET")
  );
  return {
    lesson: data,
    isFetchingLesson: isLoading,
    fetchLessonError: error,
  };
};

export const useFetchLessonContents = (moodlePageId: string) => {
  const endpoint = `/moodle/fetch-single-content?pageId=${moodlePageId}`;
  const { data, error, isLoading } = useSWR(endpoint, (url) =>
    apiRequest<ItemData<LessonContentsResponse>>(url, "GET")
  );
  return {
    lessonContents: data,
    isFetchingLessonContents: isLoading,
    fetchLessonContentsError: error,
  };
};

export const searchCategories = async (
  query: string
): Promise<{ name: string; id: string }[]> => {
  const response = await apiRequest<ListData<{ id: string; name: string }>>(
    `/clusters/filter?name=${query}`,
    "GET"
  );

  return (
    response?.data?.items.map((category) => ({
      name: category.name,
      id: category.id,
    })) || []
  );
};

export const searchTags = async (
  query: string
): Promise<{ name: string; id: string }[]> => {
  const response = await apiRequest<ListData<{ id: string; name: string }>>(
    `/tags/filter?name=${query}`,
    "GET"
  );

  return (
    response?.data?.items.map((tag) => ({
      name: tag.name,
      id: tag.id,
    })) || []
  );
};
