import WorkLogForm from "./WorkLogForm";

const WorkLogList = () => {
  return (
    <div className="card bg-base-100/50 border border-accent/20 shadow-lg backdrop-blur-sm">
      <div className="card-body p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="card-title text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Time Entries
          </h2>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm">Today</button>
            <button className="btn btn-ghost btn-sm">This Week</button>
            <button className="btn btn-ghost btn-sm">This Month</button>
          </div>
        </div>
        <WorkLogForm />
      </div>
    </div>
  );
};

export default WorkLogList;
