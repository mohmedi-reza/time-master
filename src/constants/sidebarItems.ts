import { SidebarItem } from "../interfaces/SidebarItem";

export const sidebarItems: SidebarItem[] = [
  { name: "timerStart", label: "sidebar.items.timeTracker", path: "/me/time-tracker" },
  { name: "brifecaseTick", label: "sidebar.items.projects", path: "/me/projects" },
  { name: "userOctagon", label: "sidebar.items.clients", path: "/me/clients" },
  { name: "chartSquare", label: "sidebar.items.reports", path: "/me/reports" },
  { name: "emptyWallet", label: "sidebar.items.financial", path: "/me/financial" },
  { name: "profileuser", label: "sidebar.items.groups", path: "/me/groups" },
  { name: "calendar", label: "sidebar.items.calendar", path: "/me/calendar" },
  { name: "callSlash", label: "sidebar.items.meeting", path: "/me/meeting" },
  { name: "setting", label: "sidebar.items.setting", path: "/me/setting" },
  { name: "cloudConnection", label: "sidebar.items.connections", path: "/me/connection" },
  { name: "tag", label: "sidebar.items.tags", path: "/me/tags" },
  { name: "task", label: "sidebar.items.tasks", path: "/me/tasks" },
];
