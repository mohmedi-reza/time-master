export interface Workspace {
  id: string;
  name: string;
  isDisabled?: boolean;
}

export interface UserData {
  name: string;
  avatar: string;
  isOnline?: boolean;
}

export interface MenuItem {
  icon: string;
  label: string;
  onClick: () => void;
} 