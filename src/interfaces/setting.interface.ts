import { IconName } from "../components/common/icon/iconPack";

export interface SettingSection {
  title: string;
  icon: IconName;
  items: string[];
}

export interface AboutInfo {
  version: string;
  links: {
    icon: IconName;
    label: string;
  }[];
} 