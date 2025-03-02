import Icon from "../../../components/common/icon/icon.component";
import GroupCard from "../../../components/group/GroupCard";
import UserCard from "../../../components/group/UserCard";
import ProjectCard from "../../../components/projects/ProjectCard";
import { groups } from "../../../constants/mocks/mockGroupData";
import { mockProjects } from "../../../constants/mocks/mockProjectData";
import { mockTasks } from "../../../constants/mocks/mockTaskData";
import { users } from "../../../constants/mocks/mockUsersData";
import TaskList from "../../projects/TaskList";
import EyeFollower from "./EyeFollower";

const sections = [
  {
    id: 1,
    leftContent: (
      <div>
        <span className=" text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none text-warning">
          <span className="font-black">
            {" "}
            <div className="status status-error animate-ping translate-x-15 -translate-y-7 z-50"></div>
            T<span className="opacity-25">i</span>me Master
          </span>
        </span>
        <p className="py-6 text-2xl">
          Time Master is a powerful project management tool designed to help you
          track time, manage tasks, and collaborate with your team efficiently.
        </p>
        <div className="flex gap-2 mt-4">
          <div className="avatar">
            <div className="w-14 rounded-full">
              <img src="reza-mohmedi.jpg" />
            </div>
          </div>
          <div>
            <p className="font-semibold">Reza Mohmedi</p>
            <p className="text-gray-500">Developer & Sponsor</p>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <button className="btn btn-primary">
            <Icon name="github" className="text-3xl" />
            Login with GitHub
          </button>
          <button className="btn btn-primary btn-outline">
            <Icon name="coffee" className="text-3xl" />
            Donate a coffee
          </button>
        </div>
      </div>
    ),
    rightContent: (
      <div className="flex flex-col gap-2  -translate-32 z-50 scale-[0.8]  absolute">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <UserCard
              key={users[0].name}
              avatar={users[0].avatar}
              hours={users[0].hours}
              name={users[0].name}
              position={users[0].position}
              projects={users[0].projects}
            />
          </div>
          <div>
            <ProjectCard
              key={mockProjects[0].id}
              name={mockProjects[0].name}
              clientId={mockProjects[0].clientId || ""}
              owner={mockProjects[0].owner}
              totalTrackedTime={mockProjects[0].totalTrackedTime}
              billableAmount={mockProjects[0].billableAmount}
              groups={mockProjects[0].groups}
              users={mockProjects[0].users}
              allowedWorkHours={mockProjects[0].allowedWorkHours}
            />
          </div>
        </div>
        <TaskList key="task-list" tasks={mockTasks} />
      </div>
    ),
  },
  {
    id: 2,
    leftContent: (
      <div>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none">
          Manage Your Team <br />{" "}
          <span className="text-primary">
            <span className="font-black">Effectively</span>
          </span>
        </h2>
        <p className="text-base-content/70 font-title py-4 font-light md:text-2xl">
          With Time Master, you can easily manage your team members, assign
          tasks, and track their progress. Ensure everyone is on the same page
          and working towards the same goals.
        </p>
      </div>
    ),
    rightContent: (
      <div className="w-fit">
        <UserCard
          key={users[0].name}
          avatar={users[0].avatar}
          hours={users[0].hours}
          name={users[0].name}
          position={users[0].position}
          projects={users[0].projects}
        />
      </div>
    ),
  },
  {
    id: 3,
    leftContent: (
      <div>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none">
          Collaborate with <br />{" "}
          <span className="text-error">
            <span className="font-black">Groups</span>
          </span>
        </h2>
        <p className="text-base-content/70 font-title py-4 font-light md:text-2xl">
          Create and manage groups to streamline collaboration. Assign projects
          to groups and track their progress collectively.
        </p>
      </div>
    ),
    rightContent: (
      <div className="w-fit">
        <GroupCard
          key={groups[0].name}
          hours={groups[0].hours}
          members={groups[0].members}
          name={groups[0].name}
          projects={groups[0].projects}
        />
      </div>
    ),
  },
  {
    id: 4,
    leftContent: (
      <div>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none">
          Track Your <br />{" "}
          <span className="text-success">
            <span className="font-black">Tasks</span>
          </span>
        </h2>
        <p className="text-base-content/70 font-title py-4 font-light md:text-2xl">
          Keep track of all your tasks in one place. Prioritize, assign, and
          monitor the progress of each task to ensure timely completion.
        </p>
      </div>
    ),
    rightContent: <TaskList key="task-list" tasks={mockTasks} />,
  },
  {
    id: 5,
    leftContent: (
      <div>
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none">
          My Vision <br />
          <span className="text-warning">
            <span className="font-black">Building a Complete Platform</span>
          </span>
        </h2>
        <p className="text-base-content/70 font-title py-4 font-light md:text-2xl">
          My goal is to create a comprehensive platform for remote business
          owners, freelancers, and even individuals who want to manage their
          personal tasks efficiently. With Time Master, managing and advancing
          remote work and businesses will be easier than ever.
        </p>
        <p className="text-base-content/70 font-title py-2 font-light md:text-2xl">
          This is an exciting journey, and I would love to have your support
          along the way. Your feedback and encouragement will help me stay
          motivated and make this platform truly valuable for everyone.
        </p>
      </div>
    ),
    rightContent: (
      <div className="min-h-[200px]">
        <EyeFollower />
      </div>
    ),
  },
];

export default sections;
