import { SidebarItem } from "../interfaces/SidebarItem";

export const sidebarItems: SidebarItem[] = [
  { name: "timerStart", label: "Time Tracker", path: "/dashboard/time-tracker" },
  { name: "brifecaseTick", label: "Projects", path: "/dashboard/projects" },
  { name: "chartSquare", label: "Reports", path: "/dashboard/reports" },
  { name: "emptyWallet", label: "Financial", path: "/dashboard/financial" },
  { name: "profileuser", label: "Groups", path: "/dashboard/groups" },
  { name: "calendar", label: "Calender", path: "/dashboard/calendar" },
  { name: "callSlash", label: "Meeting", path: "/dashboard/meeting" },
  { name: "setting", label: "Setting", path: "/dashboard/setting" },
  { name: "cloudConnection", label: "Connections", path: "/dashboard/connection" },
  { name: "tag", label: "Tags", path: "/dashboard/tags" },
  { name: "task", label: "Tasks", path: "/dashboard/tasks" },
];
