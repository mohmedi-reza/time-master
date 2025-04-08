import React, { useState, useEffect } from "react";
import Icon from "../common/icon/icon.component";
import MultiSelect from "../common/MultiSelect";
import { useTranslation } from "react-i18next";

const projects = ["Admin Panel", "Client Side", "Hangout Location"];

const WorkLogForm: React.FC = () => {
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("00:00:00");
  const [isDurationEditable, setIsDurationEditable] = useState<boolean>(false);

  // Calculate duration when startTime or endTime changes
  useEffect(() => {
    if (startTime && endTime) {
      calculateDuration(startTime, endTime);
    }
  }, [startTime, endTime]);

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(`1970-01-01T${start}:00`);
    const endDate = new Date(`1970-01-01T${end}:00`);

    const diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const formattedDuration = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setDuration(formattedDuration);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Validate the format (HH:MM:SS)
    if (/^\d{1,2}:\d{2}:\d{2}$/.test(value)) {
      setDuration(value);

      // If startTime is not set, use the current time as startTime
      if (!startTime) {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(
          2,
          "0"
        )}:${String(now.getMinutes()).padStart(2, "0")}`;
        setStartTime(currentTime);
      }

      // Calculate endTime based on the new duration
      if (startTime) {
        const startDate = new Date(`1970-01-01T${startTime}:00`);
        const [hours, minutes, seconds] = value.split(":").map(Number);
        const endDate = new Date(
          startDate.getTime() +
            hours * 3600 * 1000 +
            minutes * 60 * 1000 +
            seconds * 1000
        );
        const endTimeFormatted = `${String(endDate.getHours()).padStart(
          2,
          "0"
        )}:${String(endDate.getMinutes()).padStart(2, "0")}`;
        setEndTime(endTimeFormatted);
      }
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartTime(value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEndTime(value);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center bg-base-200/50 p-4 rounded-xl backdrop-blur-sm">
      <div className="join bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl flex-1 min-w-[200px]">
        <div className="join-item flex items-center pl-3">
          <Icon name="edit" className="text-base-content/60" />
        </div>
        <input
          type="text"
          className="input join-item bg-transparent border-0 focus:outline-none w-full"
          placeholder={t('timeTracker.workLog.form.whatWorkedOn')}
        />
      </div>

      <div className="flex gap-2 w-full lg:w-auto">
        <select className="select bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl w-full lg:w-auto">
          {projects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button className="btn btn-square btn-ghost hover:bg-primary/10 transition-colors">
          <Icon name="addSquare" className="text-2xl text-primary" />
        </button>
      </div>

      <div className="w-full lg:w-auto">
        <MultiSelect />
      </div>

      <button className="btn btn-circle btn-ghost hover:bg-primary/10 transition-colors">
        <Icon name="dollarCircle" className="text-2xl text-primary" />
      </button>

      <div className="grid grid-cols-2 gap-2 w-full lg:w-auto">
        <div className="join bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl">
          <div className="join-item flex items-center pl-3">
            <Icon name="timer" className="text-base-content/60" />
          </div>
          <input
            type="time"
            className="input join-item bg-transparent border-0 focus:outline-none w-full lg:w-32"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="join bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl">
          <div className="join-item flex items-center pl-3">
            <Icon name="timer" className="text-base-content/60" />
          </div>
          <input
            type="time"
            className="input join-item bg-transparent border-0 focus:outline-none w-full lg:w-32"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      </div>

      <div className="join bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl">
        <div className="join-item flex items-center pl-3">
          <Icon name="calendar" className="text-base-content/60" />
        </div>
        <input 
          type="date" 
          className="input join-item bg-transparent border-0 focus:outline-none w-full lg:w-auto" 
        />
      </div>

      <div className={`join bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl w-full lg:w-auto ${isDurationEditable ? 'border-primary' : ''}`}>
        <div className="join-item flex items-center pl-3">
          <Icon name="timer" className="text-base-content/60" />
        </div>
        {isDurationEditable ? (
          <input
            type="text"
            className="input join-item bg-transparent border-0 focus:outline-none w-full lg:w-32"
            value={duration}
            onChange={handleDurationChange}
            onBlur={() => setIsDurationEditable(false)}
            placeholder="HH:MM:SS"
          />
        ) : (
          <button 
            onClick={() => setIsDurationEditable(true)}
            className="btn btn-ghost join-item w-full lg:w-32"
          >
            {duration}
          </button>
        )}
      </div>

      <button className="btn btn-primary hover:scale-105 transition-all duration-300 rounded-xl gap-2 w-full lg:w-auto">
        <Icon name="addCircle" className="text-lg" />
        {t('timeTracker.workLog.form.addEntry')}
      </button>
    </div>
  );
};

export default WorkLogForm;
