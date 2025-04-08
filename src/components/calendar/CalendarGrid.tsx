import React from "react";
import { useTranslation } from "react-i18next";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import Icon from "../common/icon/icon.component";
import CalendarDay from "./CalendarDay";
import { Task } from "../../interfaces/calendar.interface";

interface CalendarGridProps {
  selectedDate: Date;
  tasks: Task[];
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  selectedDate,
  tasks,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const { t } = useTranslation();

  const days = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => 
    t(`calendar.grid.weekDays.${day}`)
  );

  return (
    <div className="card bg-base-100/50 border border-accent/20 backdrop-blur-sm">
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {format(selectedDate, 'MMMM yyyy')}
          </h2>
          <div className="join">
            <button 
              className="join-item btn btn-sm hover:bg-primary/10 transition-colors"
              onClick={onPrevMonth}
            >
              <Icon name="arrowLeft2" className="text-lg text-primary" />
            </button>
            <button 
              className="join-item btn btn-sm btn-primary"
              onClick={onToday}
            >
              {t('calendar.grid.today')}
            </button>
            <button 
              className="join-item btn btn-sm hover:bg-primary/10 transition-colors"
              onClick={onNextMonth}
            >
              <Icon name="arrowRight2" className="text-lg text-primary" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1.5 text-center mb-2">
          {weekDays.map(day => (
            <div key={day} className="font-medium text-base-content/70 py-1 text-xs">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {days.map((day) => (
            <CalendarDay
              key={day.toString()}
              day={day}
              selectedDate={selectedDate}
              tasks={tasks}
              onSelectDate={onSelectDate}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarGrid; 