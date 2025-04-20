import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { getWorkspaces } from "../services/workspaceService";
import { Workspace } from "../components/common/toolbar/types";

interface UserContextProps {
  user: User | null;
  activeWorkspace: Workspace | null;
  setActiveWorkspace: (workspace: Workspace) => void;
  workspaces: Workspace[];
  isLoadingWorkspaces: boolean;
  refreshWorkspaces: () => Promise<void>;
  clearWorkspaceCache: () => void;
  setActiveWorkspaceById: (workspaceId: string) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  preferences?: {
    lastWorkspaceId?: string;
    theme?: string;
    [key: string]: any;
  };
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Local storage keys
const USER_KEY = "user_data";
const LAST_WORKSPACE_KEY = "last_active_workspace";

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(false);
  const [isChangingWorkspace, setIsChangingWorkspace] = useState(false);
  const isRefreshing = useRef(false);
  const initialLoadComplete = useRef(false);
  const lastSavedWorkspaceId = useRef<string | null>(null);

  // Force save workspace ID to localStorage whenever it changes
  const saveWorkspaceIdToLocalStorage = useCallback((workspaceId: string) => {
    console.log(`UserContext - Directly saving workspace ID to localStorage: ${workspaceId}`);
    localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
    lastSavedWorkspaceId.current = workspaceId;
  }, []);

  // Debug logs and ensure localStorage consistency
  useEffect(() => {
    console.log("UserContext - Active workspace:", activeWorkspace);
    if (activeWorkspace) {
      // Verify localStorage has the right value
      const currentStoredId = localStorage.getItem(LAST_WORKSPACE_KEY);
      
      // Only report real inconsistencies, comparing as strings to avoid type issues
      if (currentStoredId && String(currentStoredId) !== String(activeWorkspace.id)) {
        console.log(`UserContext - Fixing localStorage mismatch. Expected: ${activeWorkspace.id}, Got: ${currentStoredId}`);
        localStorage.setItem(LAST_WORKSPACE_KEY, activeWorkspace.id);
        lastSavedWorkspaceId.current = activeWorkspace.id;
      }
    }
  }, [activeWorkspace]);

  // On mount, immediately check localStorage for saved workspace ID
  useEffect(() => {
    const savedId = localStorage.getItem(LAST_WORKSPACE_KEY);
    if (savedId) {
      console.log(`UserContext - Found saved workspace ID on mount: ${savedId}`);
      lastSavedWorkspaceId.current = savedId;
      
      // If we already have workspaces loaded but no active workspace,
      // try to set the active workspace based on the saved ID
      if (workspaces.length > 0 && !activeWorkspace) {
        const savedWorkspace = workspaces.find(w => String(w.id) === savedId);
        if (savedWorkspace) {
          console.log(`UserContext - Auto-selecting saved workspace on mount: ${savedWorkspace.name}`);
          setActiveWorkspace(savedWorkspace);
        }
      }
    } else {
      console.log(`UserContext - No saved workspace ID found on mount`);
    }
  }, [workspaces, activeWorkspace, setActiveWorkspace]);

  // Load user data from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse user data from localStorage", error);
          localStorage.removeItem(USER_KEY);
        }
      }
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  // Function to clear workspace cache
  const clearWorkspaceCache = useCallback(() => {
    console.log("UserContext - Clearing workspace cache");
    localStorage.removeItem(LAST_WORKSPACE_KEY);
    lastSavedWorkspaceId.current = null;
    setActiveWorkspace(null);
  }, []);

  // Function to refresh workspaces without auto-selecting
  const refreshWorkspaces = useCallback(async () => {
    // Prevent concurrent refreshes
    if (!isAuthenticated || isRefreshing.current) {
      console.log("UserContext - Refresh skipped (not authenticated or already refreshing)");
      return;
    }
    
    isRefreshing.current = true;
    setIsLoadingWorkspaces(true);
    
    try {
      console.log("UserContext - Refreshing workspaces");
      const fetchedWorkspaces = await getWorkspaces();
      console.log(`UserContext - Refreshed ${fetchedWorkspaces.length} workspaces`);
      
      // Update workspaces state
      setWorkspaces(fetchedWorkspaces);
      
      // Check if this is happening during initialization
      const isInitialLoad = !initialLoadComplete.current;
      
      if (fetchedWorkspaces.length > 0) {
        // If we have a saved ID in our ref (which was updated by setActiveWorkspaceById), use that
        // instead of reading from localStorage, which might be stale
        const targetWorkspaceId = lastSavedWorkspaceId.current || localStorage.getItem(LAST_WORKSPACE_KEY);
        console.log(`UserContext - Target workspace ID after refresh: ${targetWorkspaceId || "none"}`);
        
        // If we have workspaces but no active workspace, we need to select one
        const needsWorkspaceSelection = !activeWorkspace || 
          // Or if active workspace is not in the fetched list anymore - using String comparison for type safety
          !fetchedWorkspaces.some(w => String(w.id) === String(activeWorkspace.id));
        
        if (needsWorkspaceSelection) {
          let workspaceToActivate: Workspace | undefined;
          
          // Try to find workspace by saved ID
          if (targetWorkspaceId) {
            // Convert string ID from localStorage to the same type as workspace IDs (likely number)
            // Using == instead of === for type-converting comparison, or explicitly convert types
            workspaceToActivate = fetchedWorkspaces.find(w => String(w.id) === targetWorkspaceId);
            if (workspaceToActivate) {
              console.log(`UserContext - Found saved workspace: ${workspaceToActivate.name}`);
            } else {
              console.log(`UserContext - Saved workspace ID (${targetWorkspaceId}) not found in fetched workspaces`);
            }
          }
          
          // If no saved workspace found, use the first one
          if (!workspaceToActivate) {
            workspaceToActivate = fetchedWorkspaces[0];
            console.log(`UserContext - Using first workspace: ${workspaceToActivate.name}`);
          }
          
          // Set the active workspace
          setActiveWorkspace(workspaceToActivate);
          
          // Make sure localStorage is correctly set with the selected workspace - use direct update
          // for maximum reliability during initialization
          if (isInitialLoad) {
            console.log(`UserContext - Initial load: Directly setting localStorage to: ${workspaceToActivate.id}`);
            localStorage.setItem(LAST_WORKSPACE_KEY, workspaceToActivate.id);
            lastSavedWorkspaceId.current = workspaceToActivate.id;
          } else {
            // Update the saved ref value but don't override localStorage with fallback choices
            // unless we didn't have a target ID to begin with
            if (!targetWorkspaceId || String(workspaceToActivate.id) === targetWorkspaceId) {
              saveWorkspaceIdToLocalStorage(workspaceToActivate.id);
            } else {
              console.log(`UserContext - Keeping requested ID in localStorage: ${targetWorkspaceId}`);
              lastSavedWorkspaceId.current = targetWorkspaceId;
            }
          }
        } else if (activeWorkspace) {
          // If we already have an active workspace, make sure localStorage matches it
          console.log(`UserContext - Keeping current workspace: ${activeWorkspace.name}`);
          
          // For initial load, directly set localStorage for maximum reliability
          if (isInitialLoad) {
            console.log(`UserContext - Initial load: Ensuring localStorage matches active workspace: ${activeWorkspace.id}`);
            localStorage.setItem(LAST_WORKSPACE_KEY, activeWorkspace.id);
            lastSavedWorkspaceId.current = activeWorkspace.id;
          } else if (targetWorkspaceId && String(activeWorkspace.id) !== targetWorkspaceId) {
            // If there's a target ID that doesn't match active workspace, preserve it
            console.log(`UserContext - Preserving target workspace ID in localStorage: ${targetWorkspaceId}`);
          } else {
            saveWorkspaceIdToLocalStorage(activeWorkspace.id);
          }
        }
      } else {
        // No workspaces available
        console.log("UserContext - No workspaces available, clearing active workspace");
        setActiveWorkspace(null);
        localStorage.removeItem(LAST_WORKSPACE_KEY);
        lastSavedWorkspaceId.current = null;
      }
      
      initialLoadComplete.current = true;
    } catch (error) {
      console.error("Failed to refresh workspaces", error);
      initialLoadComplete.current = true; // Mark as complete even on error
    } finally {
      setIsLoadingWorkspaces(false);
      isRefreshing.current = false;
    }
  }, [isAuthenticated, saveWorkspaceIdToLocalStorage, activeWorkspace]);

  // Initialize workspaces and user data
  useEffect(() => {
    console.log(`UserContext - Auth state changed: ${isAuthenticated ? 'authenticated' : 'not authenticated'}, initialLoad: ${initialLoadComplete.current ? 'complete' : 'not complete'}`);
    
    if (isAuthenticated) {
      if (!initialLoadComplete.current) {
        console.log("UserContext - Initial authenticated load starting");
        
        // Always read the latest localStorage value first
        const latestSavedId = localStorage.getItem(LAST_WORKSPACE_KEY);
        if (latestSavedId) {
          console.log(`UserContext - Latest saved workspace ID before refresh: ${latestSavedId}`);
          lastSavedWorkspaceId.current = latestSavedId;
        }
        
        (async () => {
          try {
            await refreshWorkspaces();
            console.log("UserContext - Initial workspace load complete");
            
            // After refreshing, ensure the localStorage value is consistent
            if (activeWorkspace) {
              console.log(`UserContext - Ensuring localStorage has correct ID after refresh: ${activeWorkspace.id}`);
              saveWorkspaceIdToLocalStorage(activeWorkspace.id);
            }
          } catch (error) {
            console.error("Error during initial workspace load:", error);
            initialLoadComplete.current = true; // Mark as complete even on error to prevent endless retries
          }
        })();
      }
    } else {
      // Reset when user logs out
      console.log("UserContext - Reset on auth change to unauthenticated");
      setWorkspaces([]);
      setActiveWorkspace(null);
      initialLoadComplete.current = false;
      localStorage.removeItem(LAST_WORKSPACE_KEY);
      lastSavedWorkspaceId.current = null;
    }
  }, [isAuthenticated, refreshWorkspaces, activeWorkspace, saveWorkspaceIdToLocalStorage]);

  // Update localStorage when active workspace changes
  const handleSetActiveWorkspace = useCallback((workspace: Workspace) => {
    console.log(`UserContext - handleSetActiveWorkspace called with: ${workspace.name} (${workspace.id})`);
    
    // Don't do anything if trying to set the same workspace
    if (activeWorkspace && activeWorkspace.id === workspace.id) {
      console.log("UserContext - Workspace is already active, not changing");
      // Still ensure localStorage is correct
      localStorage.setItem(LAST_WORKSPACE_KEY, workspace.id);
      lastSavedWorkspaceId.current = workspace.id;
      return;
    }
    
    setIsChangingWorkspace(true);
    
    // Save directly to localStorage first for maximum reliability
    console.log(`UserContext - Directly updating localStorage with workspace ID: ${workspace.id}`);
    localStorage.setItem(LAST_WORKSPACE_KEY, workspace.id);
    lastSavedWorkspaceId.current = workspace.id;
    
    // Then update state for UI
    setActiveWorkspace(workspace);
    
    console.log(`UserContext - Active workspace changed to: ${workspace.name} (${workspace.id})`);
    
    // No need to verify localStorage as we directly set it above
    // This was causing false positive inconsistency reports
    
    // Delay turning off loading slightly for better UX
    setTimeout(() => {
      setIsChangingWorkspace(false);
    }, 200);
  }, [activeWorkspace]);

  // Function to activate a workspace by ID
  const setActiveWorkspaceById = useCallback((workspaceId: string) => {
    console.log(`UserContext - Setting active workspace by ID: ${workspaceId}`);
    
    // Save ID directly to localStorage first
    console.log(`UserContext - Directly updating localStorage with workspace ID: ${workspaceId}`);
    localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
    lastSavedWorkspaceId.current = workspaceId; // Save to ref for persistence during refresh
    
    // Log all available workspace IDs for debugging
    console.log(`UserContext - Current workspaces:`, workspaces.map(w => `${w.name} (${w.id}) type:${typeof w.id}`));
    
    // Find the workspace with this ID - be extra careful with type handling
    const workspace = workspaces.find(w => String(w.id) === String(workspaceId));
    if (workspace) {
      console.log(`UserContext - Found workspace with ID ${workspaceId}: ${workspace.name}`);
      // Then update state
      setActiveWorkspace(workspace);
    } else {
      console.error(`UserContext - No workspace found with ID: ${workspaceId}`);
      
      // Double check that we tried with the latest data
      if (!isRefreshing.current) {
        console.log(`UserContext - Trying to refresh workspaces to find ID: ${workspaceId}`);
        
        // Keep track of the ID we're looking for during refresh
        const requestedId = String(workspaceId); // Ensure it's a string
        
        // We'll refresh and directly fetch fresh workspaces to avoid stale closure
        (async () => {
          try {
            // Refresh workspaces
            await refreshWorkspaces();
            
            // Directly fetch fresh workspaces from API instead of using stale workspaces from closure
            const freshWorkspaces = await getWorkspaces();
            console.log(`UserContext - Using fresh workspaces data directly from API, found ${freshWorkspaces.length} workspaces`);
            console.log(`UserContext - Fresh workspaces:`, freshWorkspaces.map(w => `${w.name} (${w.id}) type:${typeof w.id}`));
            
            // Find workspace in the fresh data - very explicit type handling
            let refreshedWorkspace = null;
            
            for (const w of freshWorkspaces) {
              const wsId = String(w.id);
              const reqId = String(requestedId);
              console.log(`UserContext - Comparing workspace ${w.name} ID: ${wsId} (type: ${typeof w.id}) with requested ID: ${reqId} match:${wsId === reqId}`);
              
              if (wsId === reqId) {
                refreshedWorkspace = w;
                break;
              }
            }
            
            if (refreshedWorkspace) {
              console.log(`UserContext - Found workspace after refresh: ${refreshedWorkspace.name}`);
              // Update localStorage again to ensure it has the latest value
              localStorage.setItem(LAST_WORKSPACE_KEY, requestedId);
              setActiveWorkspace(refreshedWorkspace);
            } else {
              console.error(`UserContext - Workspace still not found after refresh, using first workspace`);
              // Use first workspace as fallback
              if (freshWorkspaces.length > 0) {
                setActiveWorkspace(freshWorkspaces[0]);
                // Update localStorage with fallback
                localStorage.setItem(LAST_WORKSPACE_KEY, String(freshWorkspaces[0].id));
              }
            }
          } catch (error) {
            console.error("Error refreshing workspaces:", error);
            // Use current workspaces state as fallback in case of API error
            if (workspaces.length > 0) {
              setActiveWorkspace(workspaces[0]);
              localStorage.setItem(LAST_WORKSPACE_KEY, String(workspaces[0].id));
            }
          }
        })();
      } else if (workspaces.length > 0) {
        // If already refreshing, just use first workspace
        console.log(`UserContext - Already refreshing, using first workspace as fallback`);
        setActiveWorkspace(workspaces[0]);
        localStorage.setItem(LAST_WORKSPACE_KEY, String(workspaces[0].id));
      }
    }
  }, [workspaces, setActiveWorkspace, refreshWorkspaces]);

  // Function to restore workspace from localStorage without setting default
  const restoreWorkspaceFromLocalStorage = useCallback((availableWorkspaces: Workspace[]): Workspace | null => {
    if (availableWorkspaces.length === 0) return null;
    
    // Get last active workspace from localStorage
    const savedId = lastSavedWorkspaceId.current || localStorage.getItem(LAST_WORKSPACE_KEY);
    console.log("UserContext - Restoring from localStorage, last ID:", savedId);
    
    if (savedId) {
      // Find the workspace by ID - using String comparison for type safety
      const savedWorkspace = availableWorkspaces.find(w => String(w.id) === savedId);
      if (savedWorkspace) {
        console.log("UserContext - Found saved workspace:", savedWorkspace.name);
        return savedWorkspace;
      } else {
        console.log("UserContext - Saved workspace not found, will use first available");
      }
    } else {
      console.log("UserContext - No saved workspace ID found, will use first available");
    }
    
    return availableWorkspaces[0];
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      activeWorkspace,
      setActiveWorkspace: handleSetActiveWorkspace,
      workspaces,
      isLoadingWorkspaces: isLoadingWorkspaces || isChangingWorkspace,
      refreshWorkspaces,
      clearWorkspaceCache,
      setActiveWorkspaceById,
    }),
    [
      user, 
      activeWorkspace, 
      workspaces, 
      isLoadingWorkspaces, 
      isChangingWorkspace, 
      handleSetActiveWorkspace,
      refreshWorkspaces,
      clearWorkspaceCache,
      setActiveWorkspaceById
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
