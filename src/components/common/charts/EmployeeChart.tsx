import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  addDays,
  subDays,
  subMonths,
  subYears,
} from "date-fns";

const generateHeatmapData = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1); // یک سال اخیر

  const data: { date: Date; count: number }[] = [];

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    data.push({
      date: new Date(d),
      count: Math.floor(Math.random() * 5), // مقدار تصادفی بین 0 تا 5
    });
  }

  return data;
};

const ActivityHeatmap: React.FC = () => {
  const [heatmapData] = useState(generateHeatmapData());
  const [filterType, setFilterType] = useState<"week" | "month" | "year">(
    "week"
  ); // حالت فیلتر
  const [selectedDate, setSelectedDate] = useState(new Date()); // تاریخ انتخاب شده

  // فیلتر کردن داده‌ها بر اساس نوع فیلتر
  const filteredData = heatmapData.filter((item) => {
    const itemDate = new Date(item.date);
    switch (filterType) {
      case "week":
        return (
          itemDate >= startOfWeek(selectedDate) &&
          itemDate <= endOfWeek(selectedDate)
        );
      case "month":
        return (
          itemDate >= startOfMonth(selectedDate) &&
          itemDate <= endOfMonth(selectedDate)
        );
      case "year":
        return (
          itemDate >= startOfYear(selectedDate) &&
          itemDate <= endOfYear(selectedDate)
        );
      default:
        return true;
    }
  });

  // تغییر فیلتر به هفته، ماه یا سال
  const handleFilterChange = (type: "week" | "month" | "year") => {
    setFilterType(type);
  };

  // تغییر تاریخ به قبل
  const handlePrevious = () => {
    switch (filterType) {
      case "week":
        setSelectedDate(subDays(selectedDate, 7));
        break;
      case "month":
        setSelectedDate(subMonths(selectedDate, 1));
        break;
      case "year":
        setSelectedDate(subYears(selectedDate, 1));
        break;
      default:
        break;
    }
  };

  // تغییر تاریخ به بعد
  const handleNext = () => {
    switch (filterType) {
      case "week":
        setSelectedDate(addDays(selectedDate, 7));
        break;
      case "month":
        setSelectedDate(addDays(selectedDate, 30)); // تقریبی
        break;
      case "year":
        setSelectedDate(addDays(selectedDate, 365)); // تقریبی
        break;
      default:
        break;
    }
  };
  const getHeatmapWidth = () => {
    switch (filterType) {
      case "week":
        return 7 * 20; // 7 روز، هر روز 20 پیکسل
      case "month":
        return 30 * 20; // 30 روز، هر روز 20 پیکسل
      case "year":
        return 365 * 2; // 365 روز، هر روز 2 پیکسل
      default:
        return 1000; // عرض پیش‌فرض
    }
  };
  return (
    <div className="p-4 rounded-lg border border-gray-700 text-white w-full max-w-4xl">
      <h2 className="text-lg font-bold text-center mb-4">Contribution Graph</h2>

      {/* کنترل‌های فیلتر و تاریخ */}
      <div className="flex justify-center items-center gap-4 mb-4">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Previous
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange("week")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "week" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-gray-600`}
          >
            Week
          </button>
          <button
            onClick={() => handleFilterChange("month")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "month" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-gray-600`}
          >
            Month
          </button>
          <button
            onClick={() => handleFilterChange("year")}
            className={`px-4 py-2 rounded-lg ${
              filterType === "year" ? "bg-blue-500" : "bg-gray-700"
            } hover:bg-gray-600`}
          >
            Year
          </button>
        </div>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Next
        </button>
      </div>

      {/* Heatmap */}
      <div className="flex justify-center overflow-x-auto">
        <div style={{ width: getHeatmapWidth() }}>
          <CalendarHeatmap
            startDate={
              filterType === "week"
                ? startOfWeek(selectedDate)
                : filterType === "month"
                ? startOfMonth(selectedDate)
                : startOfYear(selectedDate)
            }
            endDate={
              filterType === "week"
                ? endOfWeek(selectedDate)
                : filterType === "month"
                ? endOfMonth(selectedDate)
                : endOfYear(selectedDate)
            }
            values={filteredData}
            classForValue={(value) => {
              if (!value || !value.date) return "color-empty";
              return `color-scale-${value.count}`;
            }}
            tooltipDataAttrs={(value) => ({
              "data-tip": value
                ? `${format(new Date(value.date), "yyyy-MM-dd")}: ${
                    value.count
                  } contributions`
                : "No contributions",
              "aria-label": value
                ? `${format(new Date(value.date), "yyyy-MM-dd")}: ${
                    value.count
                  } contributions`
                : "No contributions",
            })}
            showWeekdayLabels
            horizontal
            gutterSize={2}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-2 mt-4 text-sm">
        <span>Less</span>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`w-3 h-3 color-scale-${i}`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
