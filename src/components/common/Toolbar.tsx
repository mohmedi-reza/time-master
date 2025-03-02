import React, { useState, useEffect, useRef } from "react";
import Icon from "./icon/icon.component";
import { logoutUser } from "../../services/mock-services/LoginService";
import { useNavigate } from "react-router-dom";

const Toolbar: React.FC = () => {
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
    navigate("");
  };

  return (
    <div className="navbar bg-gradient-to-r from-base-100 to-base-200 border-b border-accent/20   p-4 backdrop-blur-sm z-40">
      <div className="flex flex-1 gap-4 justify-between">
        <button className="hidden">
          <Icon name={"menu"} className="text-3xl text-primary" />
        </button>

        <div className="flex flex-1 items-center w-fit gap-2">
          <select
            defaultValue="Pick a color"
            className="select select-sm select-bordered w-fit focus:outline-none focus:border-primary bg-base-100/50 backdrop-blur-sm transition-all duration-300"
          >
            <option disabled={true}>Workspace</option>
            <option>Personal</option>
            <option>BeStudio</option>
            <option>Hermes</option>
          </select>
          <button className="btn btn-square btn-ghost rounded-xl hover:bg-primary/10 transition-all duration-300">
            <Icon name={"addSquare"} className="text-2xl text-primary" />
          </button>
        </div>

        <div className="relative">
          <button
            className="avatar online cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-10 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 transition-all duration-300 hover:ring-primary">
              <img
                src="https://avatar.iran.liara.run/username?username=rezamohmedi"
                alt="User Avatar"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </button>

          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-3 w-56 border border-accent/20 bg-gradient-to-b from-base-200 to-base-100 rounded-box p-3   backdrop-blur-sm z-10 animate-fade-in">
              <p className="text-sm font-light text-base-content/70">
                👋Hey{" "}
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sarah</span>
              </p>
              <div className="divider my-2"></div>
              <ul className="menu menu-sm w-full space-y-1 p-0">
                <li>
                  <button className="flex items-center gap-2 hover:bg-primary/10 rounded-lg transition-all duration-300">
                    <Icon name={"user"} className="text-xl text-primary" /> Profile
                  </button>
                </li>
                <li>
                  <button className="flex items-center gap-2 hover:bg-primary/10 rounded-lg transition-all duration-300">
                    <Icon name={"setting"} className="text-xl text-primary" /> Settings
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex items-center gap-2 hover:bg-primary/10 rounded-lg transition-all duration-300">
                    <Icon name={"logout"} className="text-xl text-primary" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
