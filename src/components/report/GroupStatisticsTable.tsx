import React from "react";
import Icon from "../common/icon/icon.component";
import { TimeData } from "../../interfaces/report.interface";

interface GroupStatisticsTableProps {
  data: TimeData[];
}

const GroupStatisticsTable: React.FC<GroupStatisticsTableProps> = ({ data }) => (
  <div className="card bg-base-100/50 border border-accent/20 hover:  transition-all duration-300 backdrop-blur-sm">
    <div className="card-body p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Icon name="people" className="text-primary text-base" />
            Group Statistics
          </h2>
          <p className="text-xs text-base-content/60">Performance metrics by team</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr className="border-b border-accent/20">
              <th className="text-xs font-medium">Group Name</th>
              <th className="text-xs font-medium">Hours / Target</th>
              <th className="text-xs font-medium">Tasks Progress</th>
              <th className="text-xs font-medium">Completion Rate</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((group, index) => (
              <tr key={index} className="hover:bg-base-200/50 transition-colors border-b border-accent/10">
                <td className="font-medium">{group.group}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{group.hours}/{group.target} hrs</span>
                    <progress
                      className="progress progress-primary w-20 h-2"
                      value={group.hours}
                      max={group.target}
                    />
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{group.completedTasks}/{group.totalTasks} tasks</span>
                    <progress
                      className="progress progress-success w-20 h-2"
                      value={group.completedTasks}
                      max={group.totalTasks}
                    />
                  </div>
                </td>
                <td>
                  <div className="badge badge-primary badge-sm font-medium">
                    {((group.completedTasks / group.totalTasks) * 100).toFixed(1)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default GroupStatisticsTable; 