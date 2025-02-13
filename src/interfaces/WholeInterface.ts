export type UserRole = "Owner" | "Admin" | "Manager" | "Member" | "Guest";

export type UserStatus = "Active" | "Inactive" | "Pending";

export type PaymentType = "Hourly" | "Monthly";

export type TaskPriority = "High" | "Medium" | "Low";

export type TaskStatus = "To-Do" | "In Progress" | "Done";

export type SessionApprovalStatus = "Pending" | "Approved" | "Rejected";

export type Category = "Development" | "Design" | "Marketing" | "Other";

export interface WorkSession {
  id: string;
  userId: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  approvalStatus: SessionApprovalStatus;
  intervals: { start: Date; end?: Date }[];
}

export interface Permission {
  canCreateProject: boolean;
  canManageTasks: boolean;
  canAssignTasks: boolean;
  canChangeTaskStatus: boolean;
  canStartTimer: boolean;
  canApproveSessions: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  paymentType: PaymentType;
  billableRate?: number;
  monthlySalary?: number;
  assignedProjects: string[];
  totalTrackedTime: number;
  pendingApprovalTime: number;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: { userId: string; role: UserRole; permissions: Permission }[];
  assignedProjects: string[];
}

export interface Client {
  id: string;
  name: string;
  companyName?: string;
  address?: string;
  contacts: {
    name: string;
    email: string;
    phone?: string;
    position?: string;
  }[];
  assignedProjects: string[];
}

export interface Project {
  id: string;
  name: string;
  owner: string;
  clientId?: string;
  category: Category;
  groups: string[];
  users: string[];
  tasks: Task[];
  totalTrackedTime: number;
  billableAmount: number;
  allowedWorkHours?: { start: string; end: string };
}

export interface Task {
  id: string;
  name: string;
  projectId: string;
  assignedUser?: string;
  assignedGroup?: string;
  estimatedTime?: number;
  priority: TaskPriority;
  status: TaskStatus;
  workSessions: WorkSession[];
  totalTrackedTime: number;
  deadline?: Date;
}
