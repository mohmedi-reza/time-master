import React from "react";
import Icon from "../icon/icon.component";
import { MenuItem, UserData } from "./types";
import { IconName } from "../icon/iconPack";

interface UserProfileMenuProps {
  userData: UserData;
  menuItems: MenuItem[];
  dropdownRef: React.RefObject<HTMLDivElement>;
}

const UserProfileMenu: React.FC<UserProfileMenuProps> = ({
  userData,
  menuItems,
  dropdownRef,
}) => {
  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-56 border border-accent/20 bg-gradient-to-b from-base-200 to-base-100 rounded-box p-3 backdrop-blur-sm z-10 animate-fade-in"
    >
      <p className="text-sm font-light text-base-content/70">
        👋Hey{" "}
        <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {userData.name}
        </span>
      </p>
      <div className="divider my-2"></div>
      <ul className="menu menu-sm w-full space-y-1 p-0">
        {menuItems.map((item, index) => (
          <li key={index}>
            <button
              onClick={item.onClick}
              className="flex items-center gap-2 hover:bg-primary/10 rounded-lg transition-all duration-300"
            >
              <Icon name={item.icon as IconName} className="text-xl text-primary" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfileMenu; 