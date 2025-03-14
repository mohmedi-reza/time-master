export interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  attendees: string[];
  meetingLink: string;
}

export interface MeetingState {
  isGoogleConnected: boolean;
  meetings: Meeting[];
  loading: boolean;
} 