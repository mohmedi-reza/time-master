import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import WorkspaceManager from '../../components/settings/WorkspaceManager';
import Icon from '../../components/common/icon/icon.component';
import { getWorkspaces } from '../../services/workspaceService';
import { Workspace } from '../../components/common/toolbar/types';

const WorkspaceSettings: React.FC = () => {
  const { t } = useTranslation();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(undefined);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await getWorkspaces();
        setWorkspaces(data);
        if (data.length > 0 && !selectedWorkspace) {
          setSelectedWorkspace(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, [selectedWorkspace]);

  return (
    <div className="p-6 pb-12 min-h-screen bg-base-100">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">
          {t('settings.workspaceSettings')}
        </h1>
        <p className="text-base-content/60 mt-1">
          {t('workspace.management')}
        </p>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
          <div className="bg-base-100 p-6 rounded-xl border border-base-content/20 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                <Icon name="setting" className="text-primary" />
              </div>
              <h3 className="text-sm font-medium text-base-content/70">{t('workspace.myWorkspaces')}</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{workspaces.length}</span>
              <span className="ml-1 text-xs text-success flex items-center">
                <Icon name="activity" className="w-3 h-3 mr-1" />
                {workspaces.length} {t('workspace.activeWorkspaces')}
              </span>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-xl border border-base-content/20 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center mr-3">
                <Icon name="user" className="text-secondary" />
              </div>
              <h3 className="text-sm font-medium text-base-content/70">{t('workspace.totalMembers')}</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">
                {workspaces.reduce((acc, workspace) => acc + (workspace.members?.length || 0), 0)}
              </span>
              <span className="ml-1 text-xs text-base-content/60">
                {t('workspace.acrossAllWorkspaces')}
              </span>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-xl border border-base-content/20 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
                <Icon name="clock" className="text-accent" />
              </div>
              <h3 className="text-sm font-medium text-base-content/70">{t('workspace.latestActivity')}</h3>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold truncate max-w-[160px]">
                {workspaces[0]?.name || '-'}
              </span>
              <span className="ml-1 text-xs text-base-content/60">
                {t('workspace.recentlyModified')}
              </span>
            </div>
          </div>

          <div className="bg-base-100 p-6 rounded-xl border border-base-content/20 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center mr-3">
                <Icon name="shield" className="text-info" />
              </div>
              <h3 className="text-sm font-medium text-base-content/70">{t('workspace.yourRole')}</h3>
            </div>
            <div className="flex items-baseline">
              <span className="badge badge-primary badge-sm py-2">Admin</span>
              <span className="ml-1 text-xs text-base-content/60">
                {t('workspace.manageAllWorkspaces')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Create Workspace Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Icon name="setting" className="text-primary mr-2" />
          <h2 className="text-xl font-semibold">{t('workspace.myWorkspaces')}</h2>
        </div>
        <button 
          onClick={() => {
            const modal = document.getElementById('create-workspace-modal') as HTMLDialogElement;
            if (modal) modal.showModal();
          }}
          className="btn btn-primary btn-sm gap-2"
        >
          <Icon name="addSquare" className="text-base" />
          {t('workspace.createNew')}
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-base-100 rounded-xl border border-base-content/20">
        <WorkspaceManager 
          selectedWorkspace={selectedWorkspace} 
          onWorkspaceChange={(id) => setSelectedWorkspace(id)} 
        />
      </div>
    </div>
  );
};

export default WorkspaceSettings; 