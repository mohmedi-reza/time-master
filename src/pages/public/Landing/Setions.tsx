import { useTranslation } from "react-i18next";
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
import i18n from "i18next";

const Sections = () => {
  const { t } = useTranslation();
  const isRTL = i18n.language === "fa";

  // Define sections data
  const sectionsData = [
    {
      id: 1,
      leftContent: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none text-primary">
            <span className="font-black">
              {" "}
              <div className="status status-error animate-ping translate-x-15 -translate-y-7 z-50"></div>
              T<span className="opacity-25">i</span>me Master
            </span>
          </span>
          <p className="py-6 text-lg md:text-xl">{t('timeMasterDescription')}</p>

          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="avatar">
              <div className="w-14 rounded-full">
                <img src="reza-mohmedi.jpg" alt="Reza Mohmedi" />
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="font-semibold">Reza Mohmedi TEST</span>
              <span className="text-gray-500">{t('developer')}</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <button className="btn btn-primary btn-sm sm:btn-md">
              <Icon name="github" className="text-3xl" />
              {t('loginWithGithub')}
            </button>
            <button className="btn btn-primary btn-outline btn-sm sm:btn-md">
              <Icon name="coffee" className="text-3xl" />
              {t('donateACoffee')}
            </button>
          </div>
        </div>
      ),
      rightContent: (
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
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
          <div className="w-full max-w-lg">
            <TaskList key="task-list" tasks={mockTasks} />
          </div>
        </div>
      ),
    },
    {
      id: 2,
      leftContent: (
        <div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-none">
            {t('manageTeam')} <br />{" "}
            <span className="text-primary">
              <span className="font-black">{t('effectively')}</span>
            </span>
          </h2>
          <p className="text-base-content/70 font-title py-4 font-light text-lg md:text-xl">
            {t('manageTeamDescription')}
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
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-none">
            {t('collaborateWith')} <br />{" "}
            <span className="text-error">
              <span className="font-black">{t('groups')}</span>
            </span>
          </h2>
          <p className="text-base-content/70 font-title py-4 font-light text-lg md:text-xl">
            {t('collaborateDescription')}
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
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-none">
            {t('trackYour')} <br />{" "}
            <span className="text-success">
              <span className="font-black">{t('tasks')}</span>
            </span>
          </h2>
          <p className="text-base-content/70 font-title py-4 font-light text-lg md:text-xl">
            {t('trackTasksDescription')}
          </p>
        </div>
      ),
      rightContent: <TaskList key="task-list" tasks={mockTasks} />,
    },
    {
      id: 5,
      leftContent: (
        <div>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light leading-none">
            {t('myVision')} <br />
            <span className="text-warning">
              <span className="font-black">{t('buildingPlatform')}</span>
            </span>
          </h2>
          <p className="text-base-content/70 font-title py-4 font-light text-lg md:text-xl">
            {t('visionDescription')}
          </p>
          <p className="text-base-content/70 font-title py-2 font-light text-lg md:text-xl">
            {t('visionSupport')}
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

  // If RTL, reverse the order of sections (except the first and last)
  const orderedSections = isRTL 
    ? [
        sectionsData[0],
        ...sectionsData.slice(1, -1).reverse(),
        sectionsData[sectionsData.length - 1]
      ]
    : sectionsData;

  // Return sectionsData for use in parent component
  return orderedSections;
};

export default Sections;
