import { useUser } from "../context/UserContext";
import { useState } from "react";

/**
 * Custom hook to access workspace and user information
 * Makes it easy to work with the current workspace and related data
 */
const useWorkspace = () => {
  const {
    activeWorkspace,
    workspaces,
    setActiveWorkspace,
    isLoadingWorkspaces,
    user
  } = useUser();
  
  const [isSwitchingWorkspace, setIsSwitchingWorkspace] = useState(false);
  
  // Combine loading states
  const isLoading = isLoadingWorkspaces || isSwitchingWorkspace;

  /**
   * Switch to a different workspace by ID
   * @param workspaceId The ID of the workspace to switch to
   * @returns boolean indicating if the switch was successful
   */
  const switchWorkspace = async (workspaceId: string): Promise<boolean> => {
    // Don't switch if already switching or if switching to current workspace
    if (isSwitchingWorkspace || (activeWorkspace && activeWorkspace.id === workspaceId)) {
      return false;
    }
    
    const workspace = workspaces.find(w => w.id === workspaceId);
    if (!workspace) return false;
    
    setIsSwitchingWorkspace(true);
    
    try {
      // Add a small delay to show loading state (can be adjusted for UX)
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveWorkspace(workspace);
      return true;
    } finally {
      setTimeout(() => setIsSwitchingWorkspace(false), 200);
    }
  };

  /**
   * Check if the current user is an admin of the active workspace
   * @returns boolean indicating if the user is an admin
   */
  const isWorkspaceAdmin = (): boolean => {
    if (!activeWorkspace || !activeWorkspace.members) return false;
    
    const currentUserMember = activeWorkspace.members.find(
      member => member.id === user?.id
    );
    
    return currentUserMember?.role === 'admin';
  };

  /**
   * Get projects associated with the current workspace
   * This is a placeholder for future implementation
   */
  const getWorkspaceProjects = async () => {
    if (!activeWorkspace) return [];
    
    // This would be implemented when the API endpoint is available
    // For now it returns an empty array
    return [];
  };

  return {
    activeWorkspace,
    workspaces,
    isLoading,
    isSwitchingWorkspace,
    user,
    switchWorkspace,
    isWorkspaceAdmin,
    getWorkspaceProjects,
  };
};

export default useWorkspace; 