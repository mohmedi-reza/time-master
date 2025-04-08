import React from "react";
import Icon from "../common/icon/icon.component";
import MeetingCard from "./MeetingCard";
import { Meeting } from "../../interfaces/meeting.interface";
import { IconName } from "../common/icon/iconPack";

interface MeetingSectionProps {
  title: string;
  icon: IconName;
  meetings: Meeting[];
  emptyStateMessage: string;
}

const MeetingSection: React.FC<MeetingSectionProps> = ({
  title,
  icon,
  meetings,
  emptyStateMessage,
}) => (
  <div className="card bg-base-100/50 border border-accent/20 backdrop-blur-sm">
    <div className="card-body p-6">
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <Icon name={icon} className="text-primary" />
        {title}
      </h2>
      <div className="grid gap-3">
        {meetings.map(meeting => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
        {meetings.length === 0 && (
          <div className="text-center py-8 bg-base-200/50 rounded-lg">
            <Icon name={icon} className="text-4xl text-base-content/30 mx-auto mb-3" />
            <p className="text-base-content/60 text-sm">{emptyStateMessage}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default MeetingSection; 