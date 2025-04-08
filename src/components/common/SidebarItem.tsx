import { useSortable } from "@dnd-kit/sortable";
import { SidebarItemProps } from "../../interfaces/SidebarItem";
import Icon from "./icon/icon.component";
import { CSS } from "@dnd-kit/utilities";
import { useTranslation } from "react-i18next";

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isExpanded,
  location,
  navigate,
}) => {
  const { t } = useTranslation();
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isActive = location.pathname === item.path;

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`flex items-center group transition-all duration-300 ${
        isDragging ? "z-50" : ""
      }`}
    >
      <button
        className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 ${
          isExpanded
            ? "w-full"
            : "w-12 h-12 justify-center items-center flex rounded-lg"
        } ${
          isActive
            ? "bg-primary/10 text-primary shadow-sm"
            : "hover:bg-base-200/80 text-base-content/70 hover:text-primary"
        } ${isDragging ? "opacity-100 !bg-base-200/90 backdrop-blur-sm shadow-lg" : ""}`}
        onClick={() => navigate(item.path)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            navigate(item.path);
          }
        }}
        tabIndex={0}
        aria-label={t(item.label)}
      >
        <Icon 
          name={item.name} 
          className={`text-2xl transition-all duration-300 ${
            isActive ? 'scale-110' : 'scale-100'
          } ${isDragging ? 'animate-pulse' : ''}`} 
        />
        {isExpanded && (
          <span className={`text-inherit font-medium transition-all duration-300 ${
            isDragging ? 'opacity-75' : ''
          }`}>
            {t(item.label)}
          </span>
        )}

        {/* Drag Handle (Visible on Hover) */}
        {isExpanded && (
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            className={`cursor-grab active:cursor-grabbing flex items-center ms-auto px-2 text-inherit/50 hover:text-inherit transition-all duration-300 ${
              isDragging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            } hover:scale-110`}
          >
            <Icon 
              name={"commandSquare"} 
              className={`text-xl transition-transform duration-300 ${
                isDragging ? 'rotate-12' : ''
              }`} 
            />
          </div>
        )}
      </button>
    </li>
  );
};

export default SidebarItem;
