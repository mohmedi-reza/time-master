import { useSortable } from "@dnd-kit/sortable";
import { SidebarItemProps } from "../../interfaces/SidebarItem";
import Icon from "./icon/icon.component";
import { CSS } from "@dnd-kit/utilities";

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isExpanded,
  location,
  navigate,
}) => {
  const { listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ id: item.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isActive = location.pathname === item.path;

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center group  transition-all duration-300"
    >
      <button
        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ${
          isExpanded
            ? "w-full"
            : "w-12 h-12 justify-center items-center flex rounded-lg"
        } ${isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"}`}
        onClick={() => navigate(item.path)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(item.path);
          }
        }}
        tabIndex={0}
        aria-label={`Navigate to ${item.label}`}
      >
        <Icon name={item.name} className="text-2xl" />
        {isExpanded && <span>{item.label}</span>}

        {/* Drag Handle (Visible on Hover) */}
        {isExpanded && (
          <span
            ref={setActivatorNodeRef}
            {...listeners}
            className="cursor-grab flex items-center ms-auto px-2 text-gray-500 hover:text-white transition opacity-0 group-hover:opacity-100"
          >
            <Icon name={"commandSquare"} className="text-xl" />
          </span>
        )}
      </button>
    </li>
  );
};

export default SidebarItem;
