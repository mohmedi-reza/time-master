import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems as defaultSidebarItems } from "../../constants/sidebarItems";
import Icon from "./icon/icon.component";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(() => {
    const savedIsExpanded = localStorage.getItem("isSidebarExpanded");
    return savedIsExpanded !== null ? JSON.parse(savedIsExpanded) : false;
  });
  const [sidebarItems, setSidebarItems] = useState(defaultSidebarItems);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedIsExpanded = localStorage.getItem("isSidebarExpanded");
    if (savedIsExpanded !== null) {
      setIsExpanded(JSON.parse(savedIsExpanded));
    }

    const savedItems = localStorage.getItem("sidebarOrder");
    if (savedItems) setSidebarItems(JSON.parse(savedItems));
  }, []);

  useEffect(() => {
    localStorage.setItem("isSidebarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sidebarItems.findIndex((item) => item.name === active.id);
    const newIndex = sidebarItems.findIndex((item) => item.name === over.id);

    const newItems = arrayMove(sidebarItems, oldIndex, newIndex);
    setSidebarItems(newItems);
    localStorage.setItem("sidebarOrder", JSON.stringify(newItems));
  };

  const sensors = useSensors(useSensor(MouseSensor));

  return (
    <div
      className={`relative flex flex-col shadow-sm shadow-gray-700/50 z-50 h-full bg-base-200 p-4 transition-all ease-in-out duration-300 ${
        isExpanded ? "w-64" : "w-fit"
      }`}
    >
      <div
        className={`flex justify-between items-center transition-all ease-in-out duration-300 ${
          !isExpanded ? "flex-col-reverse gap-2" : ""
        }`}
      >
        <div className="flex gap-3 items-center">
          <Icon name={"logo"} className="text-5xl scale-[0.9]" />
          {isExpanded && (
            <div>
              <p className="text-nowrap text-xl font-black">Time Master</p>
              <p className="text-nowrap text-xs text-gray-500">
                PROJECT MANAGEMENT
              </p>
            </div>
          )}
        </div>
        <button
          className={`h-7 w-7 text-base cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-700 rounded-full justify-items-center items-center ${
            isExpanded ? "" : "rotate-180"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Sidebar"
        >
          <Icon
            name={"arrowCircleLeft"}
            className="text-2xl text-base-content"
          />
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={sidebarItems.map((item) => item.name)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-2 mt-7 divide divide-base-100 py-6">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.name}
                item={item}
                isExpanded={isExpanded}
                location={location}
                navigate={navigate}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className="rounded-md mt-auto">
        <button
          className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out ${
            isExpanded
              ? "w-full"
              : "w-12 h-12 justify-center items-center flex rounded-lg"
          }`}
          onClick={() => console.log("logout")}
          tabIndex={0}
        >
          <Icon name={"logout"} className="text-2xl" />
          {isExpanded && <span>{"Logout"}</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
