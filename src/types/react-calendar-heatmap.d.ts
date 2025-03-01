declare module 'react-calendar-heatmap' {
  import { Component } from 'react';

  interface CalendarHeatmapProps {
    values: Array<{ date: string; count: number }>;
    startDate: Date;
    endDate: Date;
    classForValue?: (value: { date: string; count: number } | null) => string;
    tooltipDataAttrs?: (value: { date: string; count: number } | null) => { [key: string]: string };
    showWeekdayLabels?: boolean;
    horizontal?: boolean;
    gutterSize?: number;
  }

  class CalendarHeatmap extends Component<CalendarHeatmapProps> {}
  export default CalendarHeatmap;
} 