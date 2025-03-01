import { SidebarItem } from "../interfaces/SidebarItem";

export const sidebarItems: SidebarItem[] = [
  { name: "timerStart", label: "Time Tracker", path: "/me/time-tracker" },
  { name: "brifecaseTick", label: "Projects", path: "/me/projects" },
  { name: "chartSquare", label: "Reports", path: "/me/reports" },
  { name: "emptyWallet", label: "Financial", path: "/me/financial" },
  { name: "profileuser", label: "Groups", path: "/me/groups" },
  { name: "calendar", label: "Calender", path: "/me/calendar" },
  { name: "callSlash", label: "Meeting", path: "/me/meeting" },
  { name: "setting", label: "Setting", path: "/me/setting" },
  { name: "cloudConnection", label: "Connections", path: "/me/connection" },
  { name: "tag", label: "Tags", path: "/me/tags" },
  { name: "task", label: "Tasks", path: "/me/tasks" },
];
