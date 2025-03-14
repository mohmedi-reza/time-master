import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartCard from "../common/ChartCard";

interface WeeklyTrendsChartProps {
  primaryColor: string;
  primaryColorLight: string;
}

const WeeklyTrendsChart: React.FC<WeeklyTrendsChartProps> = ({
  primaryColor,
  primaryColorLight,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    colors: [primaryColor, primaryColorLight],
    stroke: {
      curve: "smooth",
      width: 4,
      colors: [primaryColor, primaryColorLight],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px',
          fontWeight: 500
        } 
      },
    },
    yaxis: {
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px'
        } 
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        show: true,
      },
      marker: {
        show: true,
      },
    },
    grid: {
      borderColor: 'rgba(156, 163, 175, 0.1)',
      strokeDashArray: 5,
    },
    markers: {
      size: 6,
      colors: [primaryColor, primaryColorLight],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 8,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.2,
        opacityFrom: 0.8,
        opacityTo: 0.2,
        stops: [0, 90, 100],
        gradientToColors: [primaryColorLight, primaryColorLight]
      }
    },
    legend: {
      labels: {
        colors: primaryColor
      },
      markers: {
        fillColors: [primaryColor, primaryColorLight],
        strokeWidth: 0,
        offsetX: 0,
        offsetY: 0,
        shape: "circle",
      },
    },
  };

  const series = [
    {
      name: "Hours Worked",
      data: [30, 40, 35, 50, 49, 20, 25],
    },
    {
      name: "Tasks Completed",
      data: [20, 25, 30, 35, 30, 15, 20],
    },
  ];

  return (
    <ChartCard title="Weekly Trends" icon="chart2">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="100%"
      />
    </ChartCard>
  );
};

export default WeeklyTrendsChart; 