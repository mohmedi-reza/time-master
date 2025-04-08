// import {
//   User,
//   Group,
//   Client,
//   Project,
//   Task,
//   WorkSession,
//   Permission,
//   UserRole,
//   UserStatus,
//   PaymentType,
//   TaskPriority,
//   TaskStatus,
//   SessionApprovalStatus,
//   Category,
// } from "../../interfaces/WholeInterface";

// const userRoles: UserRole[] = ["Owner", "Manager"];
// const userStatuses: UserStatus[] = ["Active", "Active"];
// const paymentTypes: PaymentType[] = ["Hourly", "Monthly"];
// const taskPriorities: TaskPriority[] = ["High", "Medium"];
// const taskStatuses: TaskStatus[] = ["In Progress", "To-Do"];
// const sessionApprovalStatuses: SessionApprovalStatus[] = [
//   "Approved",
//   "Pending",
// ];
// const projectCategories: Category[] = ["Design"];

// const ownerPermissions: Permission = {
//   canCreateProject: true,
//   canManageTasks: true,
//   canAssignTasks: true,
//   canChangeTaskStatus: true,
//   canStartTimer: true,
//   canApproveSessions: true,
// };

// const managerPermissions: Permission = {
//   canCreateProject: false,
//   canManageTasks: true,
//   canAssignTasks: true,
//   canChangeTaskStatus: true,
//   canStartTimer: true,
//   canApproveSessions: false,
// };

// export const mockUsers: User[] = [
//   {
//     id: "user_1",
//     name: "Reza Mohmedi",
//     email: "reza.mohmedi@example.com",
//     role: userRoles[0],
//     status: userStatuses[0],
//     paymentType: paymentTypes[0],
//     billableRate: 50,
//     assignedProjects: ["proj_123"],
//     totalTrackedTime: 150,
//     pendingApprovalTime: 0,
//   },
//   {
//     id: "user_2",
//     name: "Ali Ahmadi",
//     email: "ali.ahmadi@example.com",
//     role: userRoles[1],
//     status: userStatuses[1],
//     paymentType: paymentTypes[1],
//     monthlySalary: 4000,
//     assignedProjects: ["proj_123"],
//     totalTrackedTime: 120,
//     pendingApprovalTime: 30,
//   },
// ];

// export const mockGroups: Group[] = [
//   {
//     id: "group_1",
//     name: "Frontend Team",
//     description: "Handles UI/UX design and frontend development",
//     members: [
//       { userId: "user_1", role: userRoles[0], permissions: ownerPermissions },
//       { userId: "user_2", role: userRoles[1], permissions: managerPermissions },
//     ],
//     assignedProjects: ["proj_123"],
//   },
// ];

// export const mockClients: Client[] = [
//   {
//     id: "client_1",
//     name: "Aria Tech",
//     companyName: "Aria Technologies Ltd.",
//     address: "123 Tech Street, Tehran, Iran",
//     contacts: [
//       {
//         name: "Mohammad Hosseini",
//         email: "m.hosseini@ariatech.com",
//         phone: "+98 912 345 6789",
//         position: "CTO",
//       },
//     ],
//     assignedProjects: ["proj_123"],
//   },
// ];

// export const mockWorkSessions: WorkSession[] = [
//   {
//     id: "session_1",
//     userId: "user_1",
//     taskId: "task_1",
//     startTime: new Date("2025-02-13T10:00:00"),
//     endTime: new Date("2025-02-13T11:30:00"),
//     duration: 90,
//     approvalStatus: sessionApprovalStatuses[0],
//     intervals: [
//       {
//         start: new Date("2025-02-13T10:00:00"),
//         end: new Date("2025-02-13T10:45:00"),
//       },
//       {
//         start: new Date("2025-02-13T11:00:00"),
//         end: new Date("2025-02-13T11:30:00"),
//       },
//     ],
//   },
//   {
//     id: "session_2",
//     userId: "user_2",
//     taskId: "task_2",
//     startTime: new Date("2025-02-13T12:00:00"),
//     endTime: new Date("2025-02-13T13:30:00"),
//     duration: 90,
//     approvalStatus: sessionApprovalStatuses[1],
//     intervals: [
//       {
//         start: new Date("2025-02-13T12:00:00"),
//         end: new Date("2025-02-13T12:45:00"),
//       },
//       {
//         start: new Date("2025-02-13T13:00:00"),
//         end: new Date("2025-02-13T13:30:00"),
//       },
//     ],
//   },
// ];

// export const mockTasks: Task[] = [
//   {
//     id: "task_1",
//     name: "Design UI",
//     projectId: "proj_123",
//     assignedUser: "user_1",
//     estimatedTime: 5,
//     priority: taskPriorities[0],
//     status: taskStatuses[0],
//     workSessions: [mockWorkSessions[0]],
//     totalTrackedTime: 90,
//     deadline: new Date("2025-02-20"),
//   },
//   {
//     id: "task_2",
//     name: "Develop Backend",
//     projectId: "proj_123",
//     assignedUser: "user_2",
//     estimatedTime: 8,
//     priority: taskPriorities[1],
//     status: taskStatuses[1],
//     workSessions: [mockWorkSessions[1]],
//     totalTrackedTime: 90,
//     deadline: new Date("2025-02-25"),
//   },
// ];

// export const mockProjects: Project[] = [
//   {
//     id: "proj_123",
//     name: "Website Redesign",
//     owner: "user_1",
//     clientId: "client_1",
//     category: projectCategories[0],
//     groups: ["group_1"],
//     users: ["user_1", "user_2"],
//     tasks: mockTasks,
//     totalTrackedTime: 180,
//     billableAmount: 9000,
//     allowedWorkHours: { start: "08:00", end: "18:00" },
//   },
// ];
