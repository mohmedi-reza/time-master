import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, UserData } from "./types";
import UserProfileMenu from "./UserProfileMenu";
import { logoutUser } from "../../../services/mock-services/LoginService";

interface UserProfileProps {
  userData?: UserData;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  isLoading?: boolean;
}

const defaultUserData: UserData = {
  name: "Guest",
  avatar: "https://avatar.iran.liara.run/public",
  isOnline: false,
};

const UserProfile: React.FC<UserProfileProps> = ({
  userData = defaultUserData,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    onLogoutClick?.();
    navigate("");
  };

  const menuItems: MenuItem[] = [
    {
      icon: "user",
      label: "Profile",
      onClick: () => {
        onProfileClick?.();
        setIsDropdownOpen(false);
      },
    },
    {
      icon: "setting",
      label: "Settings",
      onClick: () => {
        onSettingsClick?.();
        setIsDropdownOpen(false);
      },
    },
    {
      icon: "logout",
      label: "Logout",
      onClick: () => {
        handleLogout();
        setIsDropdownOpen(false);
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-10 h-10 rounded-full bg-base-300"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className={`avatar ${userData.isOnline ? 'online' : ''} cursor-pointer transform hover:scale-105 transition-all duration-300`}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-10 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 transition-all duration-300 hover:ring-primary">
          <img
            src={userData.avatar}
            alt={`${userData.name}'s Avatar`}
            className="grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </button>

      {isDropdownOpen && (
        <UserProfileMenu
          userData={userData}
          menuItems={menuItems}
          dropdownRef={dropdownRef}
        />
      )}
    </div>
  );
};

export default UserProfile; 