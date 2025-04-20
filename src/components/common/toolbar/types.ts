export interface Workspace {
  id: string;
  name: string;
  description?: string;
  isDisabled?: boolean;
  members?: WorkspaceMember[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WorkspaceMember {
  id: string;
  name?: string;
  email: string;
  role: 'admin' | 'member';
  status?: 'active' | 'invited' | 'inactive';
}

export interface UserData {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  role?: string;
  status?: 'online' | 'offline' | 'away';
}

export interface MenuItem {
  icon: string;
  label: string;
  onClick: () => void;
} 