import Icon from "../../../components/common/icon/icon.component";
import ProjectCard from "../../../components/projects/ProjectCard";
import { mockProjects } from "../../../constants/mocks/mockProjectData";
import { mockTasks } from "../../../constants/mocks/mockTaskData";
import TaskList from "../../projects/TaskList";

const LandingPageBg: React.FC = () => {
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-y-auto">
      <div className="flex w-full h-fit justify-center items-center py-2 fixed bg-base-100 z-50">
        <div className="flex justify-between items-center max-w-7xl w-full">
          <div className="flex items-center gap-1">
            <Icon name={"logo"} className="text-warning text-5xl" />
            <div>
              <h1 className="text-2xl font-bold">Time Master</h1>
              <span className="text-gray-500 font-light">
                PROJECT MANAGEMENTS
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-soft btn-warning rounded-lg">
              Book Demo
            </button>
            <button className="btn btn-soft rounded-lg">Sign In</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-60 max-w-7xl w-full mx-auto">
        <div className="">
          <h1 className="text-5xl font-bold">Time Master</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex gap-2">
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img src="reza-mohmedi.jpg" />
              </div>
            </div>
            <div>
              <p className="font-semibold">Reza Mohmedi</p>
              <p className="text-gray-500">Sponsor</p>
            </div>
          </div>

          <div className="mt-3 flex gap-3">
            <button className="btn btn-soft  text-white">
              
              Login with GitHub
            </button>
              <Icon name="heart" />

            <button className="btn btn-soft  text-white">
              <Icon name="heart" />
              Donate a coffee
            </button>
          </div>
        </div>
        <div className=" mockup mockup-window bg-base-200/90  xl:bg-base-200 mx-auto origin-top overflow-visible pb-4 backdrop-blur will-change-auto [--rtl-reverse:1] [transform:rotateX(20deg)rotateZ(-20deg)skewY(8deg)scale(1)] rtl:[--rtl-reverse:-1] rtl:[transform:rotateX(20deg)rotateZ(20deg)skewY(-8deg)scale(1)] max-[1279px]:[transform:translate3d(0,0,0)]! xl:-end-20 xl:-me-10 xl:h-[32rem] xl:w-[50rem] xl:rounded-e-none xl:pe-4 xl:shadow-[-0.05rem_0.1rem_0rem_#00000014] xl:backdrop-blur-0">
          <div className="">
            <div className="flex flex-col col-start-1 row-start-1 mx-6  items-end gap-6 xl:mx-0 xl:items-start xl:gap-0">
              <div className=" flex gap-6 xl:w-60 xl:flex-col xl:gap-0">
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

              <div className=" gap-6 xl:w-full xl:flex-col xl:gap-0">
                <TaskList tasks={mockTasks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageBg;
