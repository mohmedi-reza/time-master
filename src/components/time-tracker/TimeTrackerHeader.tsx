import React from "react";
import Icon from "../common/icon/icon.component";

const TimeTrackerHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Time Tracker
        </h1>
        <p className="text-base-content/60">Track and manage your working hours efficiently</p>
      </div>
      <button className="btn btn-primary gap-2 hover:scale-105 transition-all duration-300 rounded-xl">
        <Icon name="play" className="text-lg" />
        Start Timer
      </button>
    </div>
  );
};

export default TimeTrackerHeader; 