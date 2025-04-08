import React from "react";
import { useTranslation } from "react-i18next";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import ChartCard from "../common/ChartCard";
import { TimeData } from "../../interfaces/report.interface";

interface TeamWorkingHoursChartProps {
  data: TimeData[];
  primaryColor: string;
  primaryColorLight: string;
}

const TeamWorkingHoursChart: React.FC<TeamWorkingHoursChartProps> = ({ 
  data,
  primaryColor,
  primaryColorLight
}) => {
  const { t } = useTranslation();

  const options: ApexOptions = {
    chart: {
      type: "bar",
      background: "transparent",
      toolbar: { show: false },
      stacked: true,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "65%",
        borderRadius: 12,
        borderRadiusApplication: "end",
        distributed: false,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data.map((item) => item.group),
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px',
          fontWeight: 500
        } 
      },
    },
    yaxis: {
      title: {
        text: t('reports.tables.groupStatistics.columns.hours'),
        style: { 
          color: "#9ca3af",
          fontSize: '13px',
          fontWeight: 600
        },
      },
      labels: { 
        style: { 
          colors: "#9ca3af",
          fontSize: '12px'
        } 
      },
    },
    fill: { 
      opacity: 1,
      type: 'solid'
    },
    tooltip: {
      theme: "dark",
      y: { formatter: (val: number) => `${val} ${t('reports.tables.groupStatistics.columns.hours')}` },
    },
    colors: [primaryColor, primaryColorLight],
    grid: {
      borderColor: 'rgba(156, 163, 175, 0.1)',
      strokeDashArray: 5,
    },
  };

  const series = [
    {
      name: t('reports.charts.teamWorkingHours.workingHours'),
      data: data.map((item) => item.hours),
    },
    {
      name: t('reports.charts.teamWorkingHours.targetHours'),
      data: data.map((item) => item.target - item.hours),
    },
  ];

  return (
    <ChartCard title={t('reports.charts.teamWorkingHours.title')} icon="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="100%"
      />
    </ChartCard>
  );
};

export default TeamWorkingHoursChart; 