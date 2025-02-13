import React, { useState } from "react";
import Icon from "./icon/icon.component";

const Toolbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 shadow-sm shadow-gray-700/50 p-4 z-40">
      <div className="flex flex-1 gap-4 justify-between">
        <button className="hidden">
          <Icon name={"menu"} className="text-3xl text-white" />
        </button>

        <div className="flex flex-1 items-center w-fit  gap-1">
          <select
            defaultValue="Pick a color"
            className="select select-sm w-fit outline-none focus:border-gray-600 focus-visible:outline-none"
          >
            <option disabled={true}>Workspace</option>
            <option>Personal</option>
            <option>BeStudio</option>
            <option>Hermes</option>
          </select>
          <button className="btn btn-square hover:bg-gray-700 rounded-xl">
            <Icon name={"addSquare"} className="text-2xl" />
          </button>
        </div>

        <div className="relative">
          <button
            className="avatar avatar-online cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-10 rounded-full border">
              <img
                src="https://avatar.iran.liara.run/username?username=rezamohmedi"
                alt="User Avatar"
              />
            </div>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 border border-gray-700/50 bg-base-100 rounded-box shadow-md p-2 z-10">
              <p className="text-sm font-light text-gray-500">
                👋Hey{" "}
                <span className="text-lg font-bold text-gray-400">Sarah </span>
              </p>
              <div className="divider my-1"></div>
              <ul className="">
                <li className="p-2 flex items-center gap-1 hover:bg-gray-700 cursor-pointer rounded-lg">
                  <Icon name={"user"} className="text-xl text-gray-400" />{" "}
                  Profile
                </li>
                <li className="p-2 flex items-center gap-1 hover:bg-gray-700 cursor-pointer rounded-lg">
                  <Icon name={"setting"} className="text-xl text-gray-400" />{" "}
                  Settings
                </li>
                <li className="p-2 flex items-center gap-1 hover:bg-gray-700 cursor-pointer rounded-lg">
                  <Icon name={"logout"} className="text-xl text-gray-400" />
                  Logout
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
