import React, { useState, useEffect } from "react";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import Icon from "../../components/common/icon/icon.component";

interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  meetingLink: string;
}

const MeetingPage: React.FC = () => {
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockMeetings: Meeting[] = [
      {
        id: "1",
        title: "Weekly Team Sync",
        startTime: "2024-03-20T10:00:00Z",
        endTime: "2024-03-20T11:00:00Z",
        attendees: [
          "https://avatar.iran.liara.run/username?username=user1",
          "https://avatar.iran.liara.run/username?username=user2",
          "https://avatar.iran.liara.run/username?username=user3",
        ],
        meetingLink: "https://meet.google.com/abc-defg-hij",
      },
      {
        id: "2",
        title: "Project Review",
        startTime: "2024-03-22T14:00:00Z",
        endTime: "2024-03-22T15:30:00Z",
        attendees: [
          "https://avatar.iran.liara.run/username?username=user4",
          "https://avatar.iran.liara.run/username?username=user5",
        ],
        meetingLink: "https://meet.google.com/xyz-uvwx-yz",
      },
    ];

    setMeetings(mockMeetings);
    setLoading(false);
  }, []);

  const handleGoogleConnect = () => {
    // TODO: Implement Google Calendar OAuth
    setIsGoogleConnected(true);
  };

  const getPastMeetings = () => {
    return meetings.filter(meeting => isBefore(parseISO(meeting.startTime), new Date()));
  };

  const getUpcomingMeetings = () => {
    return meetings.filter(meeting => isAfter(parseISO(meeting.startTime), new Date()));
  };

  const MeetingCard: React.FC<{ meeting: Meeting }> = ({ meeting }) => (
    <div className="card bg-base-100/50 border border-accent/20   hover:   transition-all duration-300 backdrop-blur-sm">
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
            Join
          </a>
        </div>
        <div className="mt-4">
          <p className="text-xs font-medium text-base-content/70 mb-2 flex items-center gap-1.5">
            <Icon name="profileuser" className="text-sm" />
            Attendees:
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-base-100 to-base-200 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Meetings</h1>
          <p className="text-base-content/60 text-lg">Manage your meetings and calendar events</p>
        </div>
        {!isGoogleConnected ? (
          <button
            onClick={handleGoogleConnect}
            className="btn btn-primary gap-2 hover:scale-105 transition-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="w-5 h-5">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Connect Calendar
          </button>
        ) : (
          <div className="badge badge-success gap-2 p-3 text-success-content">
            <Icon name="tickCircle" className="text-sm" />
            Connected to Google Calendar
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card bg-base-100/50 border border-accent/20    backdrop-blur-sm">
          <div className="card-body p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Icon name="calendar" className="text-primary" />
              Upcoming Meetings
            </h2>
            <div className="grid gap-3">
              {getUpcomingMeetings().map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
              {getUpcomingMeetings().length === 0 && (
                <div className="text-center py-8 bg-base-200/50 rounded-lg">
                  <Icon name="calendar" className="text-4xl text-base-content/30 mx-auto mb-3" />
                  <p className="text-base-content/60 text-sm">No upcoming meetings scheduled</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-100/50 border border-accent/20    backdrop-blur-sm">
          <div className="card-body p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Icon name="timer" className="text-primary" />
              Past Meetings
            </h2>
            <div className="grid gap-3">
              {getPastMeetings().map(meeting => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
              {getPastMeetings().length === 0 && (
                <div className="text-center py-8 bg-base-200/50 rounded-lg">
                  <Icon name="timer" className="text-4xl text-base-content/30 mx-auto mb-3" />
                  <p className="text-base-content/60 text-sm">No past meetings this week</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPage;
