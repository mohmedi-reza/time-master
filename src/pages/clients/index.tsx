import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Client } from '../../interfaces/client.interface';
import Icon from '../../components/common/icon/icon.component';
import ClientForm from '../../components/clients/ClientForm';
import { useTranslation } from 'react-i18next';

const ClientsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [clients, setClients] = React.useState<Client[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock data
        const mockClients: Client[] = [
          {
            id: '1',
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
              }
            ],
            totalPaid: 10000,
            totalDue: 5000,
            createdAt: new Date('2023-12-01'),
            updatedAt: new Date('2024-03-14')
          },
          {
            id: '2',
            name: 'Tech Solutions Ltd',
            email: 'info@techsolutions.com',
            phone: '+1 (555) 987-6543',
            company: 'Tech Solutions',
            address: '456 Innovation Park, Tech City, TC 12345',
            projects: [
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
            totalPaid: 15000,
            totalDue: 30000,
            createdAt: new Date('2024-01-15'),
            updatedAt: new Date('2024-03-14')
          }
        ];
        setClients(mockClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async (data: Partial<Client>) => {
    try {
      setFormLoading(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newClient: Client = {
        id: String(clients.length + 1),
        ...data,
        projects: [],
        totalPaid: 0,
        totalDue: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as Client;

      setClients(prev => [...prev, newClient]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setFormLoading(false);
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">{t('clients.overview.title')}</h1>
          <p className="text-base-content/60">{t('clients.overview.subtitle')}</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Icon name="add" />
          {t('clients.overview.addClient')}
        </button>
      </div>

      {/* Search */}
      <div className="join h-10 bg-base-100/50 backdrop-blur-sm border border-accent/20 rounded-xl w-full sm:w-96">
        <div className="join-item flex items-center pl-3">
          <Icon name="searchNormal" className="text-primary/60" />
        </div>
        <input
          type="text"
          placeholder={t('clients.overview.searchPlaceholder')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-sm join-item bg-transparent border-0 focus:outline-none w-full h-full"
        />
      </div>

      {/* Client List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-base-content/70">{t('clients.list.noClients.title')}</h3>
          <p className="text-base-content/50">
            {searchTerm ? t('clients.list.noClients.withSearch') : t('clients.list.noClients.withoutSearch')}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <div 
              key={client.id}
              className="card border border-primary/20 bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(`/me/clients/${client.id}`)}
            >
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="card-title text-base-content group-hover:text-primary transition-colors">
                      {client.name}
                    </h2>
                    {client.company && (
                      <p className="text-base-content/70 text-sm">{client.company}</p>
                    )}
                  </div>
                  <div className="badge badge-primary">{t('clients.list.status')}</div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Icon name="sms" className="text-primary" />
                    <span className="text-sm truncate">{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Icon name="call" className="text-primary" />
                      <span className="text-sm">{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-2 text-base-content/70">
                      <Icon name="location" className="text-primary" />
                      <span className="text-sm truncate">{client.address}</span>
                    </div>
                  )}
                </div>

                <div className="divider my-2"></div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-2 bg-base-200 rounded-lg">
                    <span className="text-xs text-base-content/70">{t('clients.details.stats.totalProjects.title')}</span>
                    <span className="text-lg font-semibold text-primary">
                      {client.projects.length}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-base-200 rounded-lg">
                    <span className="text-xs text-base-content/70">{t('clients.details.stats.totalPaid.title')}</span>
                    <span className="text-lg font-semibold text-success">
                      ${client.totalPaid}
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-base-200 rounded-lg">
                    <span className="text-xs text-base-content/70">{t('clients.details.stats.amountDue.title')}</span>
                    <span className="text-lg font-semibold text-error">
                      ${client.totalDue}
                    </span>
                  </div>
                </div>

                {client.projects.length > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-base-content/70">{t('clients.details.projects.title')}</span>
                      <div className={`badge badge-sm ${
                        client.projects[0].status === 'completed' ? 'badge-success' :
                        client.projects[0].status === 'in-progress' ? 'badge-warning' :
                        client.projects[0].status === 'on-hold' ? 'badge-error' :
                        'badge-ghost'
                      }`}>
                        {t(`clients.details.projects.filters.${client.projects[0].status.replace('-', '')}`)}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-base-content">
                      {client.projects[0].name}
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-base-content/70">{t('clients.details.projects.metrics.progress')}</span>
                        <span>{client.projects[0].progress}%</span>
                      </div>
                      <progress 
                        className="progress progress-primary w-full h-1" 
                        value={client.projects[0].progress} 
                        max="100"
                      ></progress>
                    </div>
                  </div>
                )}

                <div className="card-actions justify-end mt-4">
                  <button 
                    className="btn btn-ghost btn-sm group-hover:btn-primary transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/me/clients/${client.id}`);
                    }}
                  >
                    <Icon name="arrowRight" />
                    {t('clients.list.viewDetails')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Client Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <h3 className="font-bold text-lg mb-6">{t('clients.forms.client.title.add')}</h3>
            <ClientForm
              onSubmit={handleAddClient}
              onCancel={() => setIsModalOpen(false)}
              isLoading={formLoading}
            />
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage; 