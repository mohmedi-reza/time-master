import React from "react";
import { useTranslation } from "react-i18next";
import { format, parseISO } from "date-fns";
import Icon from "../common/icon/icon.component";
import { Meeting } from "../../interfaces/meeting.interface";

interface MeetingCardProps {
  meeting: Meeting;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting }) => {
  const { t } = useTranslation();
  
  return (
    <div className="card bg-base-100/50 border border-accent/20 hover:  transition-all duration-300 backdrop-blur-sm">
      <div className="card-body p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Icon name="video" className="text-primary text-base" />
              {meeting.title}
            </h3>
            <p className="text-sm text-base-content/60 flex items-center gap-1.5">
              <Icon name="calendar" className="text-sm" />
              {format(parseISO(meeting.startTime), "MMM dd, yyyy")}
              <Icon name="timer" className="text-sm ml-1" />
              {format(parseISO(meeting.startTime), "h:mm a")} - 
              {format(parseISO(meeting.endTime), "h:mm a")}
            </p>
          </div>
          <a
            href={meeting.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm gap-2 hover:scale-105 transition-transform"
          >
            <Icon name="login" className="text-sm" />
            {t('meetings.card.join')}
          </a>
        </div>
        <div className="mt-4">
          <p className="text-xs font-medium text-base-content/70 mb-2 flex items-center gap-1.5">
            <Icon name="profileuser" className="text-sm" />
            {t('meetings.card.attendees')}:
          </p>
          <div className="avatar-group -space-x-3 rtl:space-x-reverse">
            {meeting.attendees.map((attendee, index) => (
              <div key={index} className="avatar ring-2 ring-base-100 transition-transform hover:scale-110">
                <div className="w-8">
                  <img src={attendee} alt={`Attendee ${index + 1}`} className="rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard; 