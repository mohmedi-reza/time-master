import React, { useEffect, useState } from "react";
import "./icon.component.css";
import { IconName, iconPack } from "./iconPack";

interface IconProps {
  name: IconName | null;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, className, onClick }) => {
  const [svgIcon, setSvgIcon] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      setSvgIcon(iconPack[name]);
    } else {
      setSvgIcon(null);
    }
  }, [name]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <span
      className={`app-icon ${className || ""}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      dangerouslySetInnerHTML={{ __html: svgIcon || "" }}
      aria-label={name || "icon"}
    />
  );
};

export default Icon;
