import React from "react";

interface TimelineStage {
  name: string;
  funded: boolean;
  className?: string;
}

const timelineStages: TimelineStage[] = [
  { name: "Web Application Front-End", funded: true, className: "bg-warning" },
  { name: "Backend API", funded: false, className: "bg-amber-50" },
  { name: "Android & iOS", funded: false, className: "bg-amber-50" },
  { name: "Windows", funded: false, className: "bg-amber-50" },
  { name: "Extension", funded: false, className: "bg-amber-50" },
];

const DynamicTimeline: React.FC = () => {
  return (
    <ul className="timeline">
      {timelineStages.map((stage, index) => (
        <li key={index}>
          {/* Connector line before the icon */}
          {index !== 0 && <hr className={timelineStages[index - 1].className} />}

          {/* Timeline content */}
          {index % 2 === 0 ? (
            <div className="timeline-start timeline-box">
              <p className="text-center">{stage.name}</p>
            </div>
          ) : (
            <div className="timeline-end timeline-box">{stage.name}</div>
          )}

          {/* Status icon */}
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-5 w-5 ${stage.funded ? "text-warning" : "text-gray-500"}`}
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Connector line after the icon (except for the last item) */}
          {index < timelineStages.length - 1 && <hr className={stage.className} />}
        </li>
      ))}
    </ul>
  );
};

export default DynamicTimeline;
