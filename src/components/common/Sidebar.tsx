import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  closestCenter,
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedIsExpanded = localStorage.getItem("isSidebarExpanded");
    if (savedIsExpanded !== null) {
      setIsExpanded(JSON.parse(savedIsExpanded));
    }

    const savedItems = localStorage.getItem("sidebarOrder");
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setSidebarItems(parsedItems);
      
      // Navigate to first item's path if we're at root path
      if (location.pathname === '/') {
        navigate(parsedItems[0].path);
      }
    } else {
      // If no saved items, navigate to first default item's path if at root
      if (location.pathname === '/') {
        navigate(defaultSidebarItems[0].path);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isSidebarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = sidebarItems.findIndex((item) => item.name === active.id);
    const newIndex = sidebarItems.findIndex((item) => item.name === over.id);

    const newItems = arrayMove(sidebarItems, oldIndex, newIndex);
    setSidebarItems(newItems);
    localStorage.setItem("sidebarOrder", JSON.stringify(newItems));
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // Minimum distance before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // Delay before touch drag starts
        tolerance: 5, // Touch movement tolerance
      },
    })
  );

  const activeItem = sidebarItems.find((item) => item.name === activeId);

  return (
    <div
      className={`relative flex flex-col z-50 h-full bg-gradient-to-b from-base-100 to-base-200 border-r border-accent/20 p-4 transition-all ease-in-out duration-300 backdrop-blur-sm ${
        isExpanded ? "w-64" : "w-fit"
      }`}
    >
      <div
        className={`flex justify-between items-center transition-all ease-in-out duration-300 ${
          !isExpanded ? "flex-col-reverse gap-2" : ""
        }`}
      >
        <div className="flex gap-3 items-center">
          <Icon name={"logo"} className="text-5xl scale-[0.9] text-primary animate-pulse" />
          {isExpanded && (
            <div>
              <p className="text-nowrap text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Time Master</p>
              <p className="text-nowrap text-xs text-base-content/60 font-medium">
                PROJECT MANAGEMENT
              </p>
            </div>
          )}
        </div>
        <button
          className={`btn btn-circle btn-ghost btn-sm hover:bg-primary/10 transition-all duration-300 ${
            isExpanded ? "" : "rotate-180"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Sidebar"
        >
          <Icon
            name={"arrowCircleLeft"}
            className="text-2xl text-primary"
          />
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={sidebarItems.map((item) => item.name)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="menu menu-vertical gap-2 mt-7 py-6 w-full">
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

        <DragOverlay>
          {activeId && activeItem ? (
            <div className="bg-base-200/90 backdrop-blur-sm shadow-lg rounded-lg p-2 border border-accent/20">
              <div className="flex items-center gap-2">
                <Icon name={activeItem.name} className="text-2xl text-primary" />
                {isExpanded && (
                  <span className="font-medium text-base-content">
                    {activeItem.label}
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <div className="mt-auto">
        <button
          className={`btn btn-ghost hover:bg-primary/10 w-full justify-start gap-2 transition-all duration-300 ${
            !isExpanded && "btn-square"
          }`}
          onClick={() => console.log("logout")}
          tabIndex={0}
        >
          <Icon name={"logout"} className="text-2xl text-primary" />
          {isExpanded && <span className="text-base-content">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
