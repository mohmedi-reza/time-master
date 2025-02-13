import { IconName } from "../components/common/icon/iconPack";
import { Location } from "react-router-dom";

export interface SidebarItem {
  name: IconName;
  label: string;
  path: string;
}

export interface SidebarItemProps {
  item: {
    name: IconName;
    label: string;
    path: string;
  };
  isExpanded: boolean;
  location: Location;
  navigate: (path: string) => void;
}
