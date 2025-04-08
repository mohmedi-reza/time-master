import React from "react";

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  count: number;
}

const Section: React.FC<SectionProps> = ({ title, description, children, count }) => (
  <div className="space-y-4 animate-fade-in">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          <div className="badge badge-primary badge-sm">{count}</div>
        </div>
        <p className="text-base-content/60 text-sm">{description}</p>
      </div>
      {children}
    </div>
  </div>
);

export default Section; 