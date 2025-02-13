import React from "react";
import WorkLogList from "../../components/time-tracker/WorkLogList";

const TimeTrackerPage: React.FC = () => {
  return (
    <div>
      <p className="text-3xl font-black">Time Tracker</p>
      <p className="text-gray-400">Manage and track your working hours.</p>

      <WorkLogList />
    </div>
  );
};

export default TimeTrackerPage;
