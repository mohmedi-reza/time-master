export interface TimeData {
  group: string;
  hours: number;
  target: number;
  completedTasks: number;
  totalTasks: number;
}

export interface UserTimeData {
  name: string;
  avatar: string;
  hours: number;
  section: string;
  efficiency: number;
  tasks: {
    completed: number;
    total: number;
  };
} 