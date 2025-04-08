import React from "react";
import WorkLogList from "../../components/time-tracker/WorkLogList";
import TimeTrackerHeader from "../../components/time-tracker/TimeTrackerHeader";
import StatsGrid from "../../components/time-tracker/StatsGrid";

const TimeTrackerPage: React.FC = () => {
  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div className="animate-fade-in space-y-2">
        <TimeTrackerHeader />
        <StatsGrid />
      </div>

      <div className="animate-fade-in">
        <WorkLogList />
      </div>
    </div>
  );
};

export default TimeTrackerPage;
