import { IconName } from "../components/common/icon/iconPack";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'completed' | 'in-progress' | 'pending';
  dueDate: string;
  assignee: string;
}

export interface TaskStat {
  title: string;
  value: string;
  icon: IconName;
}

export interface TaskFilters {
  status?: string;
  priority?: string;
  assignee?: string;
} 