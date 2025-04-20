import Cookies from "js-cookie";
import apiClient from "./apiService";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// Using sessionStorage to temporarily save workspace preferences during logout
const saveWorkspacePreferencesBeforeLogout = () => {
  const lastWorkspaceId = localStorage.getItem('last_active_workspace');
  if (lastWorkspaceId) {
    // Save to sessionStorage which persists across page refreshes but not across tabs
    sessionStorage.setItem('temp_last_workspace', lastWorkspaceId);
    console.log("Saved workspace preference to session:", lastWorkspaceId);
  }
};

// Restore workspace preferences after login if localStorage is empty
const restoreWorkspacePreferencesAfterLogin = () => {
  const tempLastWorkspace = sessionStorage.getItem('temp_last_workspace');
  if (tempLastWorkspace && !localStorage.getItem('last_active_workspace')) {
    localStorage.setItem('last_active_workspace', tempLastWorkspace);
    console.log("Restored workspace preference from session:", tempLastWorkspace);
  }
  // Clear temporary storage
  sessionStorage.removeItem('temp_last_workspace');
};

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await apiClient.post<any>('/auth/login', credentials);
    const token = response.data.data.token;
    const userData = response.data.data.user;
    
    // Store the token in cookies and localStorage for redundancy
    Cookies.set("accessToken", token, {
      expires: 7,
      path: "/",
    });
    localStorage.setItem('accessToken', token);
    
    // Store user data in localStorage
    if (userData) {
      localStorage.setItem('user_data', JSON.stringify(userData));
    }
    
    // Restore workspace preferences if available
    restoreWorkspacePreferencesAfterLogin();
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (credentials: RegisterCredentials) => {
  try {
    const response = await apiClient.post<any>('/auth/register', credentials);
    const token = response.data.data.token;
    const userData = response.data.data.user;
    
    // Store the token in cookies and localStorage for redundancy
    Cookies.set("accessToken", token, {
      expires: 7,
      path: "/",
    });
    localStorage.setItem('accessToken', token);
    
    // Store user data in localStorage
    if (userData) {
      localStorage.setItem('user_data', JSON.stringify(userData));
    }
    
    // Restore workspace preferences if available
    restoreWorkspacePreferencesAfterLogin();
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Save workspace preferences before logout
  saveWorkspacePreferencesBeforeLogout();
  
  Cookies.remove("accessToken", { path: "/" });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user_data');
  localStorage.removeItem('last_active_workspace');
  window.location.href = '/auth/login';
};

export const checkAuth = () => {
  const token = Cookies.get("accessToken") || localStorage.getItem('accessToken');
  return !!token;
};
