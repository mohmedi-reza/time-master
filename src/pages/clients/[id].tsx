import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Client, ClientProject } from '../../interfaces/client.interface';
import Icon from '../../components/common/icon/icon.component';
import ProjectForm from '../../components/clients/ProjectForm';
import ClientForm from '../../components/clients/ClientForm';
import { useTranslation } from 'react-i18next';

const ClientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [client, setClient] = React.useState<Client | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [projectSort, setProjectSort] = useState<'date' | 'progress' | 'amount'>('date');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        // TODO: Replace with actual API call
        setLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock client data
        const mockClient: Client = {
          id: id || '1',
          name: 'Acme Corporation',
          email: 'contact@acme.com',
          phone: '+1 (555) 123-4567',
          company: 'Acme Inc.',
          address: '123 Business Ave, Suite 100, Tech City, TC 12345',
          projects: [
            {
              id: '1',
              name: 'Website Redesign',
              description: 'Complete overhaul of company website',
              status: 'in-progress',
              progress: 65,
              totalAmount: 15000,
              paidAmount: 10000,
              remainingAmount: 5000,
              startDate: new Date('2024-01-01'),
              createdAt: new Date('2023-12-15'),
              updatedAt: new Date('2024-03-14')
            },
            {
              id: '2',
              name: 'Mobile App Development',
              description: 'iOS and Android app development',
              status: 'pending',
              progress: 25,
              totalAmount: 45000,
              paidAmount: 15000,
              remainingAmount: 30000,
              startDate: new Date('2024-02-01'),
              createdAt: new Date('2024-01-15'),
              updatedAt: new Date('2024-03-14')
            }
          ],
          totalPaid: 25000,
          totalDue: 35000,
          createdAt: new Date('2023-12-01'),
          updatedAt: new Date('2024-03-14')
        };
        setClient(mockClient);
      } catch (error) {
        console.error('Error fetching client:', error);
        // Handle error state here
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleAddProject = async (data: Partial<ClientProject>) => {
    if (!client) return;

    try {
      setFormLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newProject: ClientProject = {
        id: String(client.projects.length + 1),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as ClientProject;

      const updatedClient = {
        ...client,
        projects: [...client.projects, newProject],
        totalPaid: client.totalPaid + (newProject.paidAmount || 0),
        totalDue: client.totalDue + ((newProject.totalAmount || 0) - (newProject.paidAmount || 0)),
      };

      setClient(updatedClient);
      setIsProjectModalOpen(false);
    } catch (error) {
      console.error('Error adding project:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateClient = async (data: Partial<Client>) => {
    if (!client) return;

    try {
      setFormLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedClient = {
        ...client,
        ...data,
        updatedAt: new Date(),
      };

      setClient(updatedClient);
      setIsEditClientModalOpen(false);
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditProject = async (data: Partial<ClientProject>) => {
    if (!client || !selectedProject) return;

    try {
      setFormLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedProject: ClientProject = {
        ...selectedProject,
        ...data,
        updatedAt: new Date(),
      } as ClientProject;

      const updatedProjects = client.projects.map(p =>
        p.id === selectedProject.id ? updatedProject : p
      );

      // Recalculate client totals
      const totalPaid = updatedProjects.reduce((sum, p) => sum + p.paidAmount, 0);
      const totalDue = updatedProjects.reduce((sum, p) => sum + (p.totalAmount - p.paidAmount), 0);

      const updatedClient = {
        ...client,
        projects: updatedProjects,
        totalPaid,
        totalDue,
      };

      setClient(updatedClient);
      setIsProjectModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredProjects = client?.projects.filter(project => {
    if (projectFilter === 'all') return true;
    return project.status === projectFilter;
  }).sort((a, b) => {
    switch (projectSort) {
      case 'date':
        return b.startDate.getTime() - a.startDate.getTime();
      case 'progress':
        return b.progress - a.progress;
      case 'amount':
        return (b.totalAmount - b.paidAmount) - (a.totalAmount - a.paidAmount);
      default:
        return 0;
    }
  }) || [];

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : client ? (
        <>
          {/* Client Header */}
          <div className="bg-base-100 rounded-box p-6 shadow-sm border border-primary/20">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-start gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-3xl text-white rounded-xl w-16">
                      <span>{client.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-base-content">
                      {client.name}
                      <div className="badge badge-primary ml-3">{t('clients.list.status')}</div>
                    </h1>
                    {client.company && (
                      <p className="text-lg text-base-content/60 mt-1">
                        {client.company}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Icon name="sms" className="text-primary" />
                      <a href={`mailto:${client.email}`} className="hover:text-primary transition-colors">
                        {client.email}
                      </a>
                    </div>
                    {client.phone && (
                      <div className="flex items-center gap-2 text-base-content/70">
                        <Icon name="call" className="text-primary" />
                        <a href={`tel:${client.phone}`} className="hover:text-primary transition-colors">
                          {client.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  {client.address && (
                    <div className="flex items-start gap-2 text-base-content/70">
                      <Icon name="location" className="text-primary mt-1 flex-shrink-0" />
                      <span>{client.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="btn btn-outline"
                  onClick={() => window.location.href = `mailto:${client.email}`}
                >
                  <Icon name="sms" />
                  {t('clients.details.contact')}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditClientModalOpen(true)}
                >
                  <Icon name="edit" />
                  {t('clients.details.editClient')}
                </button>
              </div>
            </div>
          </div>

          {/* Client Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="stat bg-base-100 rounded-box shadow-sm border border-primary/20">
              <div className="stat-figure text-primary">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="folder" className="text-3xl text-primary" />
                </div>
              </div>
              <div className="stat-title">{t('clients.details.stats.totalProjects.title')}</div>
              <div className="stat-value">{client.projects.length}</div>
              <div className="stat-desc">{t('clients.details.stats.totalProjects.subtitle')}</div>
            </div>
            <div className="stat bg-base-100 rounded-box shadow-sm border border-success/20">
              <div className="stat-figure text-success">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
                  <Icon name="moneyRecive" className="text-3xl text-success" />
                </div>
              </div>
              <div className="stat-title">{t('clients.details.stats.totalPaid.title')}</div>
              <div className="stat-value text-success">${client.totalPaid}</div>
              <div className="stat-desc">{t('clients.details.stats.totalPaid.subtitle')}</div>
            </div>
            <div className="stat bg-base-100 rounded-box shadow-sm border border-error/20">
              <div className="stat-figure text-error">
                <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center">
                  <Icon name="moneyRecive" className="text-3xl text-error" />
                </div>
              </div>
              <div className="stat-title">{t('clients.details.stats.amountDue.title')}</div>
              <div className="stat-value text-error">${client.totalDue}</div>
              <div className="stat-desc">{t('clients.details.stats.amountDue.subtitle')}</div>
            </div>
          </div>

          {/* Projects List */}
          <div className="bg-base-100 rounded-box p-6 shadow-sm border border-primary/20 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-base-content">{t('clients.details.projects.title')}</h2>
                <p className="text-base-content/60">{t('clients.details.projects.subtitle')}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="join space-x-2">
                  <select
                    className="select select-sm select-bordered join-item w-[120px]"
                    value={projectFilter}
                    onChange={(e) => setProjectFilter(e.target.value)}
                  >
                    <option value="all">{t('clients.details.projects.filters.allStatus')}</option>
                    <option value="pending">{t('clients.details.projects.filters.pending')}</option>
                    <option value="in-progress">{t('clients.details.projects.filters.inProgress')}</option>
                    <option value="completed">{t('clients.details.projects.filters.completed')}</option>
                    <option value="on-hold">{t('clients.details.projects.filters.onHold')}</option>
                    <option value="cancelled">{t('clients.details.projects.filters.cancelled')}</option>
                  </select>
                  <select
                    className="select select-sm select-bordered join-item w-[120px]"
                    value={projectSort}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setProjectSort(e.target.value as 'date' | 'progress' | 'amount')}
                  >
                    <option value="date">{t('clients.details.projects.sort.date')}</option>
                    <option value="progress">{t('clients.details.projects.sort.progress')}</option>
                    <option value="amount">{t('clients.details.projects.sort.amount')}</option>
                  </select>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setSelectedProject(null);
                    setIsProjectModalOpen(true);
                  }}
                >
                  <Icon name="add" />
                  {t('clients.details.projects.addProject')}
                </button>
              </div>
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              {filteredProjects.map((project) => (
                <div key={project.id} className="card bg-base-200/50 hover:bg-base-200 border border-primary/10 transition-all duration-300">
                  <div className="card-body">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="card-title text-base-content flex items-center gap-2">
                          {project.name}
                          <div className={`badge badge-sm ${project.status === 'completed' ? 'badge-success' :
                              project.status === 'in-progress' ? 'badge-warning' :
                                project.status === 'on-hold' ? 'badge-error' :
                                  'badge-ghost'
                            }`}>
                            {t(`clients.details.projects.filters.${project.status.replace('-', '')}`)}
                          </div>
                        </h3>
                        <p className="text-sm text-base-content/60">
                          {t('clients.forms.project.fields.startDate')}: {new Date(project.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                          <Icon name="more" />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li>
                            <button onClick={() => {
                              setSelectedProject(project);
                              setIsProjectModalOpen(true);
                            }}>
                              <Icon name="edit" />
                              {t('clients.details.projects.actions.editProject')}
                            </button>
                          </li>
                          <li>
                            <button>
                              <Icon name="chart" />
                              {t('clients.details.projects.actions.viewTimeline')}
                            </button>
                          </li>
                          <li>
                            <button>
                              <Icon name="document" />
                              {t('clients.details.projects.actions.generateReport')}
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {project.description && (
                      <p className="text-base-content/70 mt-2">{project.description}</p>
                    )}

                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-base-content/70">{t('clients.details.projects.metrics.progress')}</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-base-300 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${project.progress >= 80 ? 'bg-success' :
                                project.progress >= 40 ? 'bg-warning' :
                                  'bg-primary'
                              }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-3 bg-base-100 rounded-lg">
                          <span className="text-xs text-base-content/70">{t('clients.details.projects.metrics.total')}</span>
                          <span className="text-lg font-semibold text-primary">
                            ${project.totalAmount}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-base-100 rounded-lg">
                          <span className="text-xs text-base-content/70">{t('clients.details.projects.metrics.paid')}</span>
                          <span className="text-lg font-semibold text-success">
                            ${project.paidAmount}
                          </span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-base-100 rounded-lg">
                          <span className="text-xs text-base-content/70">{t('clients.details.projects.metrics.due')}</span>
                          <span className="text-lg font-semibold text-error">
                            ${project.remainingAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-base-200 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Icon name="folder" className="text-3xl text-primary/60" />
                </div>
                <h3 className="text-lg font-semibold text-base-content/70">{t('clients.details.projects.noProjects.title')}</h3>
                <p className="text-base-content/50">
                  {projectFilter !== 'all'
                    ? t('clients.details.projects.noProjects.withFilter')
                    : t('clients.details.projects.noProjects.withoutFilter')}
                </p>
              </div>
            )}
          </div>

          {/* Project Modal */}
          {isProjectModalOpen && (
            <div className="modal modal-open">
              <div className="modal-box w-11/12 max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">
                    {selectedProject ? t('clients.forms.project.title.edit') : t('clients.forms.project.title.add')}
                  </h3>
                  <button
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => {
                      setIsProjectModalOpen(false);
                      setSelectedProject(null);
                    }}
                  >
                    <Icon name="closeSquare" />
                  </button>
                </div>
                <ProjectForm
                  project={selectedProject || undefined}
                  onSubmit={selectedProject ? handleEditProject : handleAddProject}
                  onCancel={() => {
                    setIsProjectModalOpen(false);
                    setSelectedProject(null);
                  }}
                  isLoading={formLoading}
                />
              </div>
              <div
                className="modal-backdrop bg-base-200/80 backdrop-blur-sm"
                onClick={() => {
                  setIsProjectModalOpen(false);
                  setSelectedProject(null);
                }}
              ></div>
            </div>
          )}

          {/* Edit Client Modal */}
          {isEditClientModalOpen && client && (
            <div className="modal modal-open">
              <div className="modal-box w-11/12 max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">{t('clients.forms.client.title.edit')}</h3>
                  <button
                    className="btn btn-sm btn-circle btn-ghost"
                    onClick={() => setIsEditClientModalOpen(false)}
                  >
                    <Icon name="closeSquare" />
                  </button>
                </div>
                <ClientForm
                  client={client}
                  onSubmit={handleUpdateClient}
                  onCancel={() => setIsEditClientModalOpen(false)}
                  isLoading={formLoading}
                />
              </div>
              <div
                className="modal-backdrop bg-base-200/80 backdrop-blur-sm"
                onClick={() => setIsEditClientModalOpen(false)}
              ></div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-base-content/70">{t('clients.list.noClients.title')}</h3>
          <p className="text-base-content/50">{t('clients.list.noClients.withoutSearch')}</p>
        </div>
      )}
    </div>
  );
};

export default ClientDetailPage; 