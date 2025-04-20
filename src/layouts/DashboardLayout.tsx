import React, { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Toolbar from "../components/common/Toolbar";
import Sidebar from "../components/common/Sidebar";
import { useUser } from "../context/UserContext";

// Local storage key
const LAST_WORKSPACE_KEY = "last_active_workspace";

const DashboardLayout: React.FC = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "fa";
  const navigate = useNavigate();
  const { activeWorkspace, workspaces, setActiveWorkspace, refreshWorkspaces, setActiveWorkspaceById } = useUser();
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | undefined>(() => {
    // Initialize with localStorage value if available
    const savedId = localStorage.getItem(LAST_WORKSPACE_KEY);
    return savedId || undefined;
  });
  const initialLoadComplete = useRef(false);
  const hasRestoredFromStorage = useRef(false);
  const isInitializing = useRef(true);
  const isRefreshing = useRef(false);
  const refreshCount = useRef(0);

  // When the component mounts, check for stored workspace and start fresh loading
  useEffect(() => {
    const initializeComponent = async () => {
      if (initialLoadComplete.current) return;
      console.log('DashboardLayout - Initializing component');
      
      // Check localStorage first
      const savedId = localStorage.getItem(LAST_WORKSPACE_KEY);
      if (savedId) {
        console.log(`DashboardLayout - Found saved workspace ID: ${savedId}`);
        setSelectedWorkspaceId(savedId);
        hasRestoredFromStorage.current = true;
      }
      
      // Now refresh workspaces - this will also set the active workspace
      console.log('DashboardLayout - Starting initial workspace refresh');
      await refreshWorkspaces();
      
      // After workspaces are loaded, we should have a proper active workspace
      console.log('DashboardLayout - Initial refresh completed');
      initialLoadComplete.current = true;
      isInitializing.current = false;
    };
    
    initializeComponent();
  }, []); // Empty deps to run only once on mount

  // Update internal state when context changes after initialization completed
  useEffect(() => {
    if (isInitializing.current) return;
    
    if (activeWorkspace?.id && activeWorkspace.id !== selectedWorkspaceId) {
      console.log(`DashboardLayout - Updating selected workspace from context: ${activeWorkspace.id}`);
      setSelectedWorkspaceId(activeWorkspace.id);
      
      // Save to localStorage for persistence
      localStorage.setItem(LAST_WORKSPACE_KEY, activeWorkspace.id);
    }
  }, [activeWorkspace, selectedWorkspaceId]);

  // When the selected ID changes manually (not from context), update the active workspace
  useEffect(() => {
    if (isInitializing.current) return;
    
    if (selectedWorkspaceId && workspaces.length > 0) {
      const workspaceExists = workspaces.some(w => String(w.id) === selectedWorkspaceId);
      
      if (workspaceExists && (!activeWorkspace || String(activeWorkspace.id) !== selectedWorkspaceId)) {
        console.log(`DashboardLayout - Selected ID changed, setting active workspace: ${selectedWorkspaceId}`);
        setActiveWorkspaceById(selectedWorkspaceId);
      }
    }
  }, [selectedWorkspaceId, workspaces, activeWorkspace, setActiveWorkspaceById]);

  // When workspaces load or change, check if we have a selectedWorkspaceId that needs to be set
  useEffect(() => {
    if (isInitializing.current) return;
    
    // Log what's in workspaces to debug
    console.log("DashboardLayout - Workspaces state:", workspaces.map(w => `${w.name} (${w.id})`));
    
    if (selectedWorkspaceId && workspaces.length > 0) {
      // Check if the selected ID exists in the workspaces array
      const workspaceExists = workspaces.some(w => {
        const matches = String(w.id) === String(selectedWorkspaceId);
        console.log(`DashboardLayout - Comparing workspace ${w.id} (${typeof w.id}) with selected ${selectedWorkspaceId} (${typeof selectedWorkspaceId}): ${matches}`);
        return matches;
      });
      
      // Guard against infinite refreshes
      if (!workspaceExists && !isRefreshing.current && refreshCount.current < 2) {
        console.log(`DashboardLayout - Selected workspace ID ${selectedWorkspaceId} not found in current workspaces, refreshing...`);
        // Prevent concurrent refreshes
        isRefreshing.current = true;
        refreshCount.current += 1;
        
        // If not, refresh workspaces to try to load it
        refreshWorkspaces().then(() => {
          isRefreshing.current = false;
        }).catch(() => {
          isRefreshing.current = false;
        });
      } else if (!workspaceExists && refreshCount.current >= 2) {
        console.log(`DashboardLayout - Stopped refreshing after ${refreshCount.current} attempts. Using current workspace.`);
        refreshCount.current = 0;
      }
    }
  }, [workspaces, selectedWorkspaceId, refreshWorkspaces]);

  // Listen for page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (activeWorkspace?.id) {
        console.log(`DashboardLayout - Saving workspace ID before unload: ${activeWorkspace.id}`);
        localStorage.setItem(LAST_WORKSPACE_KEY, activeWorkspace.id);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeWorkspace]);
  
  // Log when activeWorkspace changes
  useEffect(() => {
    if (activeWorkspace) {
      console.log(`DashboardLayout - Active workspace: ${activeWorkspace.name} (${activeWorkspace.id})`);
    }
  }, [activeWorkspace]);

  // When route changes, ensure workspace ID is still saved
  useEffect(() => {
    if (activeWorkspace?.id) {
      console.log(`DashboardLayout - Route changed, checking workspace ID in localStorage: ${activeWorkspace.id}`);
      
      // Only update if needed (avoid unnecessary writes)
      const storedId = localStorage.getItem(LAST_WORKSPACE_KEY);
      
      // Ensure we compare as strings to avoid type mismatches
      if (storedId && String(storedId) !== String(activeWorkspace.id)) {
        console.log(`DashboardLayout - Fixing localStorage on route change. Expected: ${activeWorkspace.id}, Got: ${storedId}`);
        localStorage.setItem(LAST_WORKSPACE_KEY, activeWorkspace.id);
      }
    }
  }, [location.pathname, activeWorkspace]);

  const handleWorkspaceChange = (workspaceId: string) => {
    console.log(`DashboardLayout - Workspace changed to: ${workspaceId}`);
    
    if (workspaceId === selectedWorkspaceId) {
      console.log('DashboardLayout - Same workspace selected, no change needed');
      // Still make sure localStorage is set correctly
      localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
      return;
    }
    
    // Update local state immediately
    setSelectedWorkspaceId(workspaceId);
    
    // Save to localStorage immediately
    console.log(`DashboardLayout - Directly updating localStorage: ${workspaceId}`);
    localStorage.setItem(LAST_WORKSPACE_KEY, workspaceId);
    
    // Use setActiveWorkspaceById directly
    console.log(`DashboardLayout - Using setActiveWorkspaceById for more reliable switching`);
    
    // Force a sync - set directly so it takes effect immediately
    const workspace = workspaces.find(w => String(w.id) === String(workspaceId));
    if (workspace) {
      console.log(`DashboardLayout - Found workspace, setting active directly: ${workspace.name}`);
      setActiveWorkspace(workspace);
    } else {
      // If not found immediately, use the ID method which will handle refreshing
      setActiveWorkspaceById(workspaceId);
    }
  };

  const handleAddWorkspace = () => {
    // Navigate to workspace settings page
    navigate("/me/setting/workspaces");
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Toolbar 
          selectedWorkspace={selectedWorkspaceId}
          onWorkspaceChange={handleWorkspaceChange}
          onAddWorkspace={handleAddWorkspace}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
