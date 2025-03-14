export interface Project {
  id: string;
  name: string;
  clientId?: string;
  owner: string;
  category: string;
  totalTrackedTime: number;
  billableAmount: number;
  groups: string[];
  users: string[];
  tasks: never[];
  allowedWorkHours: {
    start: string;
    end: string;
  };
} 