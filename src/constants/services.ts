import { IconName } from "../components/common/icon/iconPack";

export interface ServiceConfig {
  id: string;
  name: string;
  icon: IconName;
  description: string;
}

export const services: ServiceConfig[] = [
  {
    id: 'jira',
    name: 'Jira',
    icon: 'cloudConnection',
    description: 'Track your tasks and manage your projects',
  },
  {
    id: 'confluence',
    name: 'Confluence',
    icon: 'cloudConnection',
    description: 'Access your team documentation and knowledge base',
  },
  {
    id: 'trello',
    name: 'Trello',
    icon: 'cloudConnection',
    description: 'Manage your boards and track project progress',
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'cloudConnection',
    description: 'Stay connected with your team communications',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'cloudConnection',
    description: 'Sync with your code repositories and issues',
  },
  {
    id: 'gitlab',
    name: 'GitLab',
    icon: 'cloudConnection',
    description: 'Manage your GitLab projects and merge requests',
  }
]; 