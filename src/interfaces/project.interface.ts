export interface Project {
  id: string;
  name: string;
  owner: string;
  clientId?: string;
  totalTrackedTime: number;
  billableAmount: number;
  groups: string[];
  users: string[];
  allowedWorkHours?: {
    start: string;
    end: string;
  };
} 