import apiClient from "./apiService";
import { Workspace, WorkspaceMember } from "../components/common/toolbar/types";

/**
 * Fetches all workspaces that belong to the authenticated user
 * @returns Promise with the list of workspaces
 */
export const getWorkspaces = async (): Promise<Workspace[]> => {
  try {
    const response = await apiClient.get("/workspaces");
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    throw error;
  }
};

/**
 * Creates a new workspace
 * @param name The name of the workspace
 * @param description Optional description of the workspace
 * @returns Promise with the created workspace
 */
export const createWorkspace = async (
  name: string,
  description?: string
): Promise<Workspace> => {
  try {
    const response = await apiClient.post("/workspaces", { 
      name,
      description
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating workspace:", error);
    throw error;
  }
};

/**
 * Updates an existing workspace
 * @param id The ID of the workspace to update
 * @param name The new name for the workspace
 * @param description The new description for the workspace
 * @returns Promise with the updated workspace
 */
export const updateWorkspace = async (
  id: string,
  name: string,
  description?: string
): Promise<Workspace> => {
  try {
    const response = await apiClient.put(`/workspaces/${id}`, { 
      name,
      description
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating workspace:", error);
    throw error;
  }
};

/**
 * Deletes a workspace
 * @param id The ID of the workspace to delete
 * @returns Promise with the operation result
 */
export const deleteWorkspace = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/workspaces/${id}`);
  } catch (error) {
    console.error("Error deleting workspace:", error);
    throw error;
  }
};

/**
 * Invites users to a workspace
 * @param id The ID of the workspace
 * @param emails Array of email addresses to invite
 * @param role Role to assign to the invited users
 * @returns Promise with the operation result
 */
export const inviteToWorkspace = async (
  id: string,
  emails: string[],
  role: 'admin' | 'member' = 'member'
): Promise<any> => {
  try {
    const response = await apiClient.post(`/workspaces/${id}/invite`, {
      emails,
      role
    });
    return response.data.data;
  } catch (error) {
    console.error("Error inviting users to workspace:", error);
    throw error;
  }
};

/**
 * Removes a member from a workspace
 * @param workspaceId The ID of the workspace
 * @param userId The ID of the user to remove
 * @returns Promise with the operation result
 */
export const removeMemberFromWorkspace = async (
  workspaceId: string,
  userId: string
): Promise<void> => {
  try {
    await apiClient.delete(`/workspaces/${workspaceId}/members/${userId}`);
  } catch (error) {
    console.error("Error removing member from workspace:", error);
    throw error;
  }
};

/**
 * Gets all members of a workspace
 * @param workspaceId The ID of the workspace
 * @returns Promise with the list of workspace members
 */
export const getWorkspaceMembers = async (
  workspaceId: string
): Promise<WorkspaceMember[]> => {
  try {
    const response = await apiClient.get(`/workspaces/${workspaceId}/members`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching workspace members:", error);
    throw error;
  }
}; 