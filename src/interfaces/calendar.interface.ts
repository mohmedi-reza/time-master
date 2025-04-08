export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueTime?: string;
}

export interface CalendarState {
  selectedDate: Date;
  tasks: Task[];
}

export interface DayProps {
  day: Date;
  selectedDate: Date;
  tasks: Task[];
  onSelectDate: (date: Date) => void;
} 