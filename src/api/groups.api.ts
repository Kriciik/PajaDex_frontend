import axios from "axios";
import type { Group } from "../types/group.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function getGroupsData(): Promise<Group[]> {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL + `/group`,
    { withCredentials: true },
  );
  if (response.status !== 200) throw new Error("Failed to fetch groups");
  if (!response.data) throw new Error("No groups found");
  return response.data;
}

export function useGroupsData() {
  return useQuery<Group[]>({
    queryKey: ["groups"],
    queryFn: getGroupsData,
    placeholderData: (previousData) => previousData,
  });
}

async function createGroup(groupData: {
  name: string;
  color?: string;
}): Promise<Group> {
  const response = await axios.post(
    import.meta.env.VITE_BACKEND_URL + `/group`,
    groupData,
    { withCredentials: true },
  );
  if (response.status !== 200 && response.status !== 201)
    throw new Error("Failed to create group");
  if (!response.data) throw new Error("Failed to create group");
  return response.data;
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      console.error("Error creating group:", error);
    },
  });
}

async function updateGroupCards(payload: {
  groupId: string;
  cardIds: string[];
}) {
  const response = await axios.put(
    import.meta.env.VITE_BACKEND_URL + `/group/cards`,
    payload,
    { withCredentials: true },
  );
  if (response.status !== 200) throw new Error("Failed to update group cards");
  return response.data;
}

export function useUpdateGroupCards() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateGroupCards,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
  });
}

async function getGroupCardIds(groupId: string): Promise<string[]> {
  const response = await axios.get(
    import.meta.env.VITE_BACKEND_URL + `/group/${groupId}/card-ids`,
    { withCredentials: true },
  );
  if (response.status !== 200)
    throw new Error("Failed to fetch group card IDs");
  return response.data;
}

export function useGroupCardIds(groupId: string | null) {
  return useQuery<string[]>({
    queryKey: ["groupCardIds", groupId],
    queryFn: () => getGroupCardIds(groupId!),
    enabled: !!groupId,
  });
}

async function deleteGroup(groupId: string): Promise<void> {
  const response = await axios.delete(
    import.meta.env.VITE_BACKEND_URL + `/group/${groupId}`,
    { withCredentials: true },
  );
  if (response.status !== 200) throw new Error("Failed to delete group");
  return response.data;
}

export function useDeleteGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      console.error("Error deleting group:", error);
    },
  });
}
