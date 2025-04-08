import React from "react";
import { useTranslation } from "react-i18next";
import { format, isToday, isSameMonth } from "date-fns";
import { DayProps } from "../../interfaces/calendar.interface";

const CalendarDay: React.FC<DayProps> = ({ day, selectedDate, tasks, onSelectDate }) => {
  const { t } = useTranslation();
  const isSelected = format(day, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  const hasEvents = tasks.length > 0;

  return (
    <div
      className={`
        relative group h-9
        flex flex-col items-center justify-center rounded-lg cursor-pointer
        hover:bg-primary/10 transition-all duration-200
        border border-accent/10 hover:border-primary/30
        ${isToday(day) ? 'bg-primary/20 text-primary font-medium' : ''}
        ${isSelected ? 'bg-primary text-primary-content scale-105 hover:bg-primary hover:text-primary-content' : ''}
        ${!isSameMonth(day, selectedDate) ? 'text-base-content/30' : ''}
      `}
      onClick={() => onSelectDate(day)}
    >
      <span className={`text-sm ${isSelected ? 'font-bold' : ''}`}>
        {format(day, 'd')}
      </span>
      {hasEvents && !isSelected && isSameMonth(day, selectedDate) && (
        <div className="absolute bottom-1 flex gap-0.5">
          <div className="w-0.5 h-0.5 rounded-full bg-primary/60"></div>
        </div>
      )}
      {hasEvents && isSelected && (
        <div className="text-[10px] mt-0.5 font-medium">
          {tasks.length} {t('calendar.task.tasks')}
        </div>
      )}
    </div>
  );
};

export default CalendarDay; 