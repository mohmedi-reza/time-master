import React, { useState, useEffect } from "react";
import Icon from "../common/icon/icon.component";
import MultiSelect from "../common/MultiSelect";

const projects = ["Admin Panel", "Client Side", "Hangout Location"];

const WorkLogForm: React.FC = () => {
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
    <div className="flex p-4 bg-gray-800 rounded-md gap-2 shadow">
      <input
        type="text"
        className="input input-bordered w-full max-w-xl"
        placeholder="What have you worked on?"
      />

      <div className="flex gap-1">
        <select className="select select-bordered w-fit focus-visible:outline-0 focus:outline-0 focus:border-gray-600">
          {projects.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button className="btn btn-soft btn-square hover:text-accent hover:bg-gray-700 rounded-xl">
          <Icon name={"addSquare"} className="text-2xl" />
        </button>
      </div>

      <div className="ms-auto">
        <MultiSelect />
      </div>

      <button className="btn btn-circle bg-gray-700 border-0 hover:text-accent hover:bg-accent/5">
        <Icon name={"dollarCircle"} className="text-2xl" />
      </button>

      <div className="grid grid-cols-2 gap-2">
        <input
          type="time"
          className="input w-fit input-bordered focus-visible:outline-0 focus:outline-0 focus:border-gray-600"
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <input
          type="time"
          className="input w-fit input-bordered outline-0 focus-visible:outline-0 focus:outline-0 focus:border-gray-600"
          value={endTime}
          onChange={handleEndTimeChange}
        />
      </div>

      <input type="date" className="input w-fit input-bordered" />

      <div
        className={`bg-gray-700 flex items-center px-2 rounded-lg w-fit ${
          isDurationEditable ? "border border-accent" : ""
        } focus-within:border-gray-600`}
      >
        {isDurationEditable ? (
          <input
            type="text"
            className="bg-transparent w-fit outline-none focus-visible:outline-0 focus:outline-0 border-0"
            value={duration}
            onChange={handleDurationChange}
            onBlur={() => setIsDurationEditable(false)}
            placeholder="HH:MM:SS"
          />
        ) : (
          <button onClick={() => setIsDurationEditable(true)}>
            {duration}
          </button>
        )}
      </div>

      <button className="btn btn-accent rounded-lg ms-6">ADD</button>
    </div>
  );
};

export default WorkLogForm;
