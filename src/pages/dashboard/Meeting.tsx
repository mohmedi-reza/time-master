import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { isAfter, isBefore, parseISO } from "date-fns";
import MeetingSection from "../../components/meetings/MeetingSection";
import GoogleConnectButton from "../../components/meetings/GoogleConnectButton";
import { Meeting } from "../../interfaces/meeting.interface";

const MeetingPage: React.FC = () => {
  const { t } = useTranslation();
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
          <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('meetings.overview.title')}
          </h1>
          <p className="text-base-content/60 text-lg">{t('meetings.overview.subtitle')}</p>
        </div>
        <GoogleConnectButton
          isConnected={isGoogleConnected}
          onConnect={handleGoogleConnect}
        />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <MeetingSection
          title={t('meetings.sections.upcoming.title')}
          icon="calendar"
          meetings={getUpcomingMeetings()}
          emptyStateMessage={t('meetings.sections.upcoming.empty')}
        />

        <MeetingSection
          title={t('meetings.sections.past.title')}
          icon="timer"
          meetings={getPastMeetings()}
          emptyStateMessage={t('meetings.sections.past.empty')}
        />
      </div>
    </div>
  );
};

export default MeetingPage;
