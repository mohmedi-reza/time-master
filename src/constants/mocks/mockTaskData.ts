export interface AssignedUser {
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  category: "On Hold" | "In Progress" | "Completed";
  status: "Pending" | "In Progress" | "Done";
  priority: "Minor" | "Normal" | "Critical" | "High";
  dueDate: string;
  createdBy: string;
  assignedUsers: AssignedUser[];
}

export const mockTasks: Task[] = [
  {
    id: "task_1",
    title: "Evaluate the addition and deletion of user IDs.",
    category: "On Hold",
    status: "Pending",
    priority: "Minor",
    dueDate: "2024-03-15",
    createdBy: "Michael Scott",
    assignedUsers: [
      {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    ],
  },
  {
    id: "task_2",
    title: "Identify the implementation team.",
    category: "On Hold",
    status: "In Progress",
    priority: "Normal",
    dueDate: "2024-03-18",
    createdBy: "Jim Halpert",
    assignedUsers: [
      {
        name: "Alice Brown",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        name: "Charlie Green",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ],
  },
  {
    id: "task_3",
    title: "Batch schedule download/process.",
    category: "On Hold",
    status: "Pending",
    priority: "Critical",
    dueDate: "2024-03-20",
    createdBy: "Pam Beesly",
    assignedUsers: [
      {
        name: "David White",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      },
      {
        name: "Emma Black",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      },
    ],
  },
  {
    id: "task_4",
    title: "Monitor system performance and adjust hardware.",
    category: "On Hold",
    status: "Pending",
    priority: "Minor",
    dueDate: "2024-03-25",
    createdBy: "Dwight Schrute",
    assignedUsers: [
      {
        name: "Sophia Blue",
        avatar: "https://randomuser.me/api/portraits/women/8.jpg",
      },
    ],
  },
  {
    id: "task_5",
    title: "Improve API response time.",
    category: "In Progress",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-03-22",
    createdBy: "Stanley Hudson",
    assignedUsers: [
      {
        name: "Kevin Malone",
        avatar: "https://randomuser.me/api/portraits/men/9.jpg",
      },
      {
        name: "Angela Martin",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      },
    ],
  },
  {
    id: "task_6",
    title: "Conduct security audit.",
    category: "Completed",
    status: "Done",
    priority: "Critical",
    dueDate: "2024-02-28",
    createdBy: "Oscar Martinez",
    assignedUsers: [
      {
        name: "Andy Bernard",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      },
    ],
  },
];
