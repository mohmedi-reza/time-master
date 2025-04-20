import React, { useState, useRef, useEffect } from "react";
import Icon from "../icon/icon.component";
import { Workspace } from "./types";
import { useUser } from "../../../context/UserContext";

// Local storage key
const LAST_WORKSPACE_KEY = "last_active_workspace";

interface WorkspaceSelectorProps {
  workspaces?: Workspace[];
  selectedWorkspace?: string;
  onWorkspaceChange?: (workspaceId: string) => void;
  onAddWorkspace?: () => void;
  isLoading?: boolean;
}

const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  workspaces: externalWorkspaces,
  selectedWorkspace: externalSelectedWorkspace,
  onWorkspaceChange: externalOnWorkspaceChange,
  onAddWorkspace,
  isLoading: externalLoading,
}) => {
  const { workspaces: contextWorkspaces, activeWorkspace, isLoadingWorkspaces, setActiveWorkspaceById } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isChangingWorkspace, setIsChangingWorkspace] = useState(false);
  const [lastSavedId, setLastSavedId] = useState<string | null>(() => localStorage.getItem(LAST_WORKSPACE_KEY));
  const [initialLoading, setInitialLoading] = useState(true);
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const hasInitialized = useRef(false);
  const hasSetInitialWorkspace = useRef(false);
  
  // Use external values if provided, otherwise fall back to context
  const workspaces = externalWorkspaces?.length ? externalWorkspaces : contextWorkspaces;
  
  // For debugging, log when activeWorkspace changes
  useEffect(() => {
    if (activeWorkspace) {
      console.log(`WorkspaceSelector - Active workspace changed: ${activeWorkspace.name} (${activeWorkspace.id})`);
    }
  }, [activeWorkspace]);
  
  // Initial loading effect - hide selector until we determine initial state
  useEffect(() => {
    if (workspaces.length > 0 && !hasInitialized.current) {
      console.log('WorkspaceSelector - Initial data received, completing initialization');
      
      // Short delay to allow other components to initialize
      setTimeout(() => {
        setInitialLoading(false);
        hasInitialized.current = true;
      }, 100);
    }
  }, [workspaces]);
  
  // Initialize workspace from localStorage if needed
  useEffect(() => {
    // Only run this once when workspaces are loaded and we have a saved ID
    if (workspaces.length > 0 && lastSavedId && !hasSetInitialWorkspace.current && !activeWorkspace) {
      console.log(`WorkspaceSelector - Setting initial workspace from localStorage: ${lastSavedId}`);
      
      // Check if the saved workspace exists in our list
      const workspaceExists = workspaces.some(w => String(w.id) === String(lastSavedId));
      
      if (workspaceExists) {
        // Use the context function to set it
        if (!externalOnWorkspaceChange) {
          console.log(`WorkspaceSelector - Initializing workspace from localStorage: ${lastSavedId}`);
          setActiveWorkspaceById(lastSavedId);
        }
      } else {
        console.log(`WorkspaceSelector - Saved workspace ID ${lastSavedId} not found in workspaces`);
      }
      
      hasSetInitialWorkspace.current = true;
    }
  }, [workspaces, lastSavedId, activeWorkspace, externalOnWorkspaceChange, setActiveWorkspaceById]);
  
  // Update lastSavedId when activeWorkspace changes to keep them in sync
  useEffect(() => {
    if (activeWorkspace) {
      const currentId = String(activeWorkspace.id);
      if (lastSavedId !== currentId) {
        console.log(`WorkspaceSelector - Syncing lastSavedId with active workspace: ${currentId}`);
        setLastSavedId(currentId);
      }
    }
  }, [activeWorkspace, lastSavedId]);
  
  // When localStorage changes, check if we need to update our selection
  useEffect(() => {
    const currentStoredId = localStorage.getItem(LAST_WORKSPACE_KEY);
    if (currentStoredId && lastSavedId !== currentStoredId) {
      console.log(`WorkspaceSelector - Detected localStorage change: ${currentStoredId}, updating lastSavedId`);
      setLastSavedId(currentStoredId);
    }
  }, [lastSavedId]);
  
  // Determine the selected workspace ID with multiple fallbacks
  // We prioritize external selection, then context, then localStorage, then first workspace
  const selectedWorkspaceId = externalSelectedWorkspace || 
                            (activeWorkspace ? String(activeWorkspace.id) : null) || 
                            lastSavedId || 
                            (workspaces.length > 0 ? String(workspaces[0].id) : undefined);
  
  // Additional logging for debugging selection state
  useEffect(() => {
    if (selectedWorkspaceId) {
      console.log(`WorkspaceSelector - Current selected ID: ${selectedWorkspaceId}, lastSavedId: ${lastSavedId}, activeWorkspace: ${activeWorkspace?.id}`);
    }
  }, [selectedWorkspaceId, lastSavedId, activeWorkspace]);
  
  // Ensure lastSavedId stays in sync with localStorage
  useEffect(() => {
    const storedId = localStorage.getItem(LAST_WORKSPACE_KEY);
    if (storedId && storedId !== lastSavedId) {
      console.log(`WorkspaceSelector - Syncing internal state with localStorage: ${storedId}`);
      setLastSavedId(storedId);
    }
  }, [lastSavedId]);
  
  const isLoading = externalLoading !== undefined ? 
                    externalLoading : 
                    (isLoadingWorkspaces || isChangingWorkspace || initialLoading);

  // Check localStorage on mount and when it changes
  useEffect(() => {
    const checkLocalStorage = () => {
      const savedId = localStorage.getItem(LAST_WORKSPACE_KEY);
      if (savedId !== lastSavedId) {
        console.log(`WorkspaceSelector - Setting lastSavedId to: ${savedId}`);
        setLastSavedId(savedId);
      }
    };
    
    checkLocalStorage();
    
    // Listen for localStorage changes in other tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === LAST_WORKSPACE_KEY) {
        console.log(`WorkspaceSelector - localStorage changed: ${event.newValue}`);
        setLastSavedId(event.newValue);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [lastSavedId]);

  // Function to handle workspace change
  const handleWorkspaceChange = async (workspaceId: string) => {
    // Don't change if it's the same workspace or if already loading
    if (workspaceId === selectedWorkspaceId || isChangingWorkspace) return;
    
    console.log(`WorkspaceSelector - Changing to workspace: ${workspaceId}`);
    setIsChangingWorkspace(true);
    
    try {
      // Save to localStorage immediately
      localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
      setLastSavedId(workspaceId);
      
      if (externalOnWorkspaceChange) {
        console.log("WorkspaceSelector - Using external handler");
        externalOnWorkspaceChange(workspaceId);
      } else {
        console.log("WorkspaceSelector - Using context handler");
        
        // Find the workspace object to set directly
        const workspaceObj = workspaces.find(w => String(w.id) === String(workspaceId));
        if (workspaceObj) {
          console.log(`WorkspaceSelector - Found workspace object: ${workspaceObj.name}`);
          setActiveWorkspaceById(String(workspaceId));
        } else {
          console.log(`WorkspaceSelector - No workspace object found, using ID method`);
          setActiveWorkspaceById(String(workspaceId));
        }
      }
    } finally {
      // After a short delay, turn off loading state
      setTimeout(() => {
        setIsChangingWorkspace(false);
      }, 200);
    }
    
    // Close dropdown after selection is complete, using a small delay
    setTimeout(() => {
      if (dropdownRef.current) {
        dropdownRef.current.open = false;
      }
      setIsOpen(false);
    }, 150);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.open = false;
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get the selected workspace name with strong type handling
  let selectedWorkspace = null;
  
  if (selectedWorkspaceId && workspaces.length > 0) {
    // Log all workspace IDs for debugging
    console.log(`WorkspaceSelector - Looking for ID: ${selectedWorkspaceId} in workspaces:`, 
      workspaces.map(w => `${w.name} (${w.id}, type: ${typeof w.id})`));
    
    // Very explicit type handling to find the workspace
    for (const workspace of workspaces) {
      const wsId = String(workspace.id);
      const targetId = String(selectedWorkspaceId);
      const matches = wsId === targetId;
      
      console.log(`WorkspaceSelector - Comparing ${workspace.name}: ${wsId} with ${targetId}, matches: ${matches}`);
      
      if (matches) {
        selectedWorkspace = workspace;
        console.log(`WorkspaceSelector - Found matching workspace: ${workspace.name}`);
        break;
      }
    }
  }
  
  // Fall back if not found
  if (!selectedWorkspace && workspaces.length > 0) {
    console.log(`WorkspaceSelector - No matching workspace found, using fallback`);
    
    if (lastSavedId) {
      // Try with lastSavedId
      selectedWorkspace = workspaces.find(w => String(w.id) === String(lastSavedId)) || null;
    }
    
    // Last resort, use first workspace
    if (!selectedWorkspace) {
      selectedWorkspace = workspaces[0];
      console.log(`WorkspaceSelector - Using first workspace: ${workspaces[0].name}`);
    }
  }
  
  const selectedWorkspaceName = selectedWorkspace?.name || 
    (workspaces.length === 0 ? "No workspaces" : "Select workspace");
  
  console.log(`WorkspaceSelector - Final name in dropdown: "${selectedWorkspaceName}"`);

  // Skeleton loading state
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center w-fit gap-2 animate-pulse">
        <div className="h-8 w-32 bg-base-300 rounded-lg"></div>
        <div className="h-8 w-8 bg-base-300 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center w-fit gap-2">
      <details 
        ref={dropdownRef}
        className="dropdown"
        open={isOpen}
        onToggle={(e) => setIsOpen(e.currentTarget.open)}
      >
        <summary className="select select-sm select-bordered w-fit focus:outline-none focus:border-primary bg-base-100 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2 px-3 cursor-pointer">
          <span className="flex items-center gap-2">
            <Icon name="folder" className="text-primary text-lg" />
            {selectedWorkspaceName || "Select workspace"}
            <Icon name="arrowDown1" className="text-primary text-lg" />
          </span>
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box border border-base-content/10 z-10 w-52 p-2 shadow-md mt-1">
          {workspaces.length === 0 && (
            <li className="text-sm opacity-70 px-3 py-1">No workspaces</li>
          )}
          
          {workspaces.map(workspace => {
            // Extra logging to debug selection issues
            const wsId = String(workspace.id);
            const selId = String(selectedWorkspaceId || "");
            const isSelected = wsId === selId;
            
            if (wsId === selId) {
              console.log(`WorkspaceSelector - Workspace ${workspace.name} (${wsId}) is selected`);
            }
            
            return (
              <li
                key={workspace.id}
                className={workspace.isDisabled ? "opacity-50" : ""}
              >
                <a
                  onClick={() => {
                    if (!workspace.isDisabled) {
                      handleWorkspaceChange(String(workspace.id));
                    }
                  }}
                  className={`${
                    isSelected ? "bg-primary/10 text-primary font-medium" : ""
                  } ${
                    workspace.isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                  } flex justify-between items-center`}
                >
                  <span>{workspace.name}</span>
                  {isSelected && (
                    <Icon name="tickCircle" className="text-primary text-base" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </details>
      <button
        title="Add workspace"
        onClick={onAddWorkspace}
        className="btn btn-square btn-ghost rounded-xl hover:bg-primary/10 transition-all duration-300"
      >
        <Icon name="addSquare" className="text-2xl text-primary" />
      </button>
    </div>
  );
};

export default WorkspaceSelector;
