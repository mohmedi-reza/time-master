import React from "react";
import Icon from "../common/icon/icon.component";
import { Tag } from "../../interfaces/tag.interface";

interface TagBadgeProps {
  tag: Tag;
  onDelete: () => void;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, onDelete }) => {
  return (
    <div className={`badge gap-1 badge-${tag.color} py-2 px-3 hover:shadow-md transition-all duration-200`}>
      <Icon name="tag" className="text-sm" />
      {tag.name}
      <button
        className="btn btn-ghost btn-xs px-0 hover:scale-110 transition-transform"
        onClick={onDelete}
      >
        <Icon name="closeCircle" className="text-sm" />
      </button>
    </div>
  );
};

export default TagBadge; 