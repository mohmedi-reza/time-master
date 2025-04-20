import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Workspace, WorkspaceMember } from '../common/toolbar/types';
import { 
  getWorkspaces, 
  createWorkspace, 
  updateWorkspace, 
  deleteWorkspace,
  inviteToWorkspace,
  removeMemberFromWorkspace,
  getWorkspaceMembers
} from '../../services/workspaceService';
import Icon from '../common/icon/icon.component';

interface WorkspaceManagerProps {
  selectedWorkspace?: string;
  onWorkspaceChange: (workspaceId: string) => void;
}

const WorkspaceManager: React.FC<WorkspaceManagerProps> = ({ 
  selectedWorkspace,
  onWorkspaceChange
}) => {
  const { t } = useTranslation();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [members, setMembers] = useState<WorkspaceMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [emails, setEmails] = useState('');
  const [role, setRole] = useState<'admin' | 'member'>('member');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Fetch workspaces
  useEffect(() => {
    const loadWorkspaces = async () => {
      setLoading(true);
      try {
        const data = await getWorkspaces();
        setWorkspaces(data);
        
        if (data.length > 0 && !selectedWorkspace) {
          onWorkspaceChange(data[0].id);
        }
      } catch (err) {
        setError('Failed to load workspaces');
      } finally {
        setLoading(false);
      }
    };
    
    loadWorkspaces();
  }, [selectedWorkspace, onWorkspaceChange]);

  // Fetch workspace members when selected workspace changes
  useEffect(() => {
    if (!selectedWorkspace) return;

    const loadMembers = async () => {
      try {
        const data = await getWorkspaceMembers(selectedWorkspace);
        setMembers(data);
      } catch (err) {
        console.error('Failed to load workspace members', err);
      }
    };

    loadMembers();
    
    // Set current workspace for edit operations
    const workspace = workspaces.find(w => w.id === selectedWorkspace);
    setCurrentWorkspace(workspace || null);
  }, [selectedWorkspace, workspaces]);

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Workspace name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newWorkspace = await createWorkspace(name, description);
      setWorkspaces([...workspaces, newWorkspace]);
      onWorkspaceChange(newWorkspace.id);
      
      // Reset form
      setName('');
      setDescription('');
      
      // Close modal
      const modal = document.getElementById('create-workspace-modal') as HTMLDialogElement;
      if (modal) modal.close();
    } catch (err) {
      setError('Failed to create workspace');
    } finally {
      setLoading(false);
    }
  };

  const handleEditWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !currentWorkspace) {
      setError('Workspace name is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedWorkspace = await updateWorkspace(
        currentWorkspace.id, 
        name, 
        description
      );
      
      // Update workspaces list
      setWorkspaces(workspaces.map(w => 
        w.id === updatedWorkspace.id ? updatedWorkspace : w
      ));
      
      // Reset edit mode
      setIsEditMode(false);
      setName('');
      setDescription('');
      
      // Close modal
      const modal = document.getElementById('create-workspace-modal') as HTMLDialogElement;
      if (modal) modal.close();
    } catch (err) {
      setError('Failed to update workspace');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteWorkspace = async () => {
    if (!currentWorkspace) return;
    
    setLoading(true);
    setError(null);

    try {
      await deleteWorkspace(currentWorkspace.id);
      
      // Remove from workspaces list
      const updatedWorkspaces = workspaces.filter(w => w.id !== currentWorkspace.id);
      setWorkspaces(updatedWorkspaces);
      
      // Select another workspace if available
      if (updatedWorkspaces.length > 0) {
        onWorkspaceChange(updatedWorkspaces[0].id);
      }
      
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError('Failed to delete workspace');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWorkspace || !emails.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const emailList = emails.split(',').map(email => email.trim());
      await inviteToWorkspace(selectedWorkspace, emailList, role);
      
      // Reset form
      setEmails('');
      setIsInviteModalOpen(false);
      
      // Refresh members list
      const updatedMembers = await getWorkspaceMembers(selectedWorkspace);
      setMembers(updatedMembers);
    } catch (err) {
      setError('Failed to invite users');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!selectedWorkspace) return;
    
    setLoading(true);
    
    try {
      await removeMemberFromWorkspace(selectedWorkspace, userId);
      
      // Update members list
      setMembers(members.filter(m => m.id !== userId));
    } catch (err) {
      setError('Failed to remove member');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (workspace: Workspace) => {
    setName(workspace.name);
    setDescription(workspace.description || '');
    setIsEditMode(true);
    setCurrentWorkspace(workspace);
    
    // Open modal
    const modal = document.getElementById('create-workspace-modal') as HTMLDialogElement;
    if (modal) modal.showModal();
  };

  const cancelEdit = () => {
    setName('');
    setDescription('');
    setIsEditMode(false);
    setCurrentWorkspace(null);
  };

  if (loading && workspaces.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {error && (
        <div className="alert alert-error mb-6 shadow-sm">
          <div className="flex items-center">
            <Icon name="activity" className="mr-2" />
            <span>{error}</span>
          </div>
          <button 
            className="btn btn-circle btn-xs btn-ghost"
            onClick={() => setError(null)}
          >
            <Icon name="closeCircle" className="text-lg" />
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex border-b border-base-content/20 mb-6">
        <button 
          className={`pb-2 px-4 ${activeTab === 'all' ? 'border-b-2 border-primary font-medium text-primary' : 'text-base-content/70'}`}
          onClick={() => setActiveTab('all')}
        >
          {t('common.all')}
        </button>
        <button 
          className={`pb-2 px-4 ${activeTab === 'active' ? 'border-b-2 border-primary font-medium text-primary' : 'text-base-content/70'}`}
          onClick={() => setActiveTab('active')}
        >
          {t('common.active')}
        </button>
      </div>

      {/* Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {workspaces.map(workspace => (
          <div 
            key={workspace.id} 
            className={`border border-base-content/20 rounded-xl p-6 ${selectedWorkspace === workspace.id ? 'ring-2 ring-primary/20' : 'hover:border-primary/30'} cursor-pointer transition-all`}
            onClick={() => onWorkspaceChange(workspace.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <Icon name="setting" className="text-primary" />
                </div>
                <h3 className="text-lg font-medium">{workspace.name}</h3>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(workspace);
                  }}
                  className="btn btn-ghost btn-xs"
                  title={t('common.edit')}
                >
                  <Icon name="edit" className="text-base" />
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentWorkspace(workspace);
                    setIsDeleteModalOpen(true);
                  }}
                  className="btn btn-ghost btn-xs text-error"
                  title={t('common.delete')}
                >
                  <Icon name="trash" className="text-base" />
                </button>
              </div>
            </div>

            {workspace.description && (
              <p className="text-base-content/70 text-sm mb-4 line-clamp-2">
                {workspace.description}
              </p>
            )}

            <div className="divider my-2"></div>

            {/* Workspace Details */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs text-base-content/60 mb-1">
                  <Icon name="user" className="inline-block w-3 h-3 mr-1" />
                  {t('workspace.members')}
                </div>
                <div className="flex -space-x-2">
                  {workspace.members?.slice(0, 3).map((member, index) => (
                    <div key={index} className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content w-6 h-6 rounded-full text-xs">
                        <span>{member.name?.charAt(0) || member.email.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                  ))}
                  {(workspace.members?.length || 0) > 3 && (
                    <div className="avatar placeholder">
                      <div className="bg-base-300 text-base-content w-6 h-6 rounded-full text-xs">
                        <span>+{(workspace.members?.length || 0) - 3}</span>
                      </div>
                    </div>
                  )}
                  {!workspace.members?.length && (
                    <span className="text-sm text-base-content/60">-</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-xs text-base-content/60 mb-1">
                  <Icon name="shield" className="inline-block w-3 h-3 mr-1" />
                  {t('workspace.role')}
                </div>
                <span className="badge badge-sm badge-primary">Admin</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Workspace Details */}
      {selectedWorkspace && currentWorkspace && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-primary">{currentWorkspace.name}</h3>
              {currentWorkspace.description && (
                <span className="ml-2 text-sm text-base-content/60">{currentWorkspace.description}</span>
              )}
            </div>
            <button 
              onClick={() => setIsInviteModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              <Icon name="user" className="text-base mr-1" />
              {t('workspace.inviteMembers')}
            </button>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto border border-base-content/20 rounded-xl">
            <table className="table">
              <thead className="bg-base-200/50">
                <tr>
                  <th>{t('workspace.name')}</th>
                  <th>{t('workspace.email')}</th>
                  <th>{t('workspace.role')}</th>
                  <th className="text-right">{t('workspace.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {members.length > 0 ? (
                  members.map(member => (
                    <tr key={member.id} className="hover">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-8">
                              <span>{member.name?.charAt(0) || member.email.charAt(0).toUpperCase()}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-medium">{member.name || '-'}</div>
                          </div>
                        </div>
                      </td>
                      <td>{member.email}</td>
                      <td>
                        <span className={`badge ${member.role === 'admin' ? 'badge-primary' : 'badge-secondary'} badge-sm`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="text-right">
                        <button 
                          onClick={() => handleRemoveMember(member.id)}
                          className="btn btn-ghost btn-xs text-error"
                          disabled={loading}
                          title={t('workspace.removeMember')}
                        >
                          <Icon name="userRemove" className="text-base" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      <div className="flex flex-col items-center">
                        <Icon name="user" className="text-4xl text-base-content/20 mb-2" />
                        <p className="text-base-content/60">{t('workspace.noMembers')}</p>
                        <button 
                          onClick={() => setIsInviteModalOpen(true)}
                          className="btn btn-primary btn-sm mt-4"
                        >
                          {t('workspace.inviteMembers')}
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Workspace Modal */}
      <dialog id="create-workspace-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <Icon name={isEditMode ? "edit" : "addSquare"} className="mr-2 text-primary" />
            {isEditMode ? t('workspace.editWorkspace') : t('workspace.createWorkspace')}
          </h3>
          
          <form onSubmit={isEditMode ? handleEditWorkspace : handleCreateWorkspace}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">{t('workspace.name')}</span>
                <span className="label-text-alt text-error">*</span>
              </label>
              <input 
                type="text" 
                placeholder={t('workspace.namePlaceholder')}
                className="input input-bordered w-full" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-medium">{t('workspace.description')}</span>
              </label>
              <textarea 
                placeholder={t('workspace.descriptionPlaceholder')}
                className="textarea textarea-bordered w-full" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="modal-action">
              {isEditMode && (
                <button 
                  type="button"
                  onClick={cancelEdit}
                  className="btn btn-ghost"
                >
                  {t('common.cancel')}
                </button>
              )}
              <button 
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : isEditMode ? t('common.save') : t('common.create')}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Invite Members Modal */}
      {isInviteModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <button 
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsInviteModalOpen(false)}
            >✕</button>
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <Icon name="userAdd" className="mr-2 text-primary" />
              {t('workspace.inviteMembers')}
            </h3>
            
            <form onSubmit={handleInviteUsers}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">{t('workspace.emails')}</span>
                  <span className="label-text-alt text-error">*</span>
                </label>
                <textarea 
                  placeholder={t('workspace.emailsPlaceholder')}
                  className="textarea textarea-bordered w-full" 
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  required
                  rows={3}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/70">{t('workspace.emailsHelp')}</span>
                </label>
              </div>
              
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text font-medium">{t('workspace.role')}</span>
                </label>
                <div className="flex gap-2">
                  <label className="label cursor-pointer justify-start gap-2 flex-1">
                    <input 
                      type="radio" 
                      name="role" 
                      className="radio radio-primary" 
                      checked={role === 'member'}
                      onChange={() => setRole('member')}
                    />
                    <span className="label-text">{t('workspace.roleMember')}</span>
                  </label>
                  <label className="label cursor-pointer justify-start gap-2 flex-1">
                    <input 
                      type="radio" 
                      name="role" 
                      className="radio radio-primary" 
                      checked={role === 'admin'}
                      onChange={() => setRole('admin')}
                    />
                    <span className="label-text">{t('workspace.roleAdmin')}</span>
                  </label>
                </div>
              </div>
              
              <div className="modal-action">
                <button 
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="btn btn-ghost"
                >
                  {t('common.cancel')}
                </button>
                <button 
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : t('workspace.invite')}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsInviteModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 flex items-center text-error">
              <Icon name="trash" className="mr-2" />
              {t('workspace.confirmDelete')}
            </h3>
            <p>{t('workspace.deleteWarning', { name: currentWorkspace?.name })}</p>
            
            <div className="modal-action">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                className="btn btn-ghost"
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={handleDeleteWorkspace}
                className="btn btn-error"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : t('common.delete')}
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsDeleteModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default WorkspaceManager; 