import React from 'react';
import { ClientProject } from '../../interfaces/client.interface';
import Icon from '../common/icon/icon.component';
import { useTranslation } from 'react-i18next';

interface ProjectFormProps {
  project?: ClientProject;
  onSubmit: (data: Partial<ClientProject>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

interface ProjectFormData {
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  progress: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  startDate: string;
  endDate: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<ProjectFormData>({
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'pending',
    progress: project?.progress || 0,
    totalAmount: project?.totalAmount || 0,
    paidAmount: project?.paidAmount || 0,
    remainingAmount: project?.remainingAmount || 0,
    startDate: project?.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '',
    endDate: project?.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData: Partial<ClientProject> = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
      progress: Number(formData.progress),
      totalAmount: Number(formData.totalAmount),
      paidAmount: Number(formData.paidAmount),
      remainingAmount: Number(formData.totalAmount) - Number(formData.paidAmount),
    };
    onSubmit(submissionData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      // Auto-calculate remaining amount when total or paid amount changes
      if (name === 'totalAmount' || name === 'paidAmount') {
        const total = Number(name === 'totalAmount' ? value : prev.totalAmount) || 0;
        const paid = Number(name === 'paidAmount' ? value : prev.paidAmount) || 0;
        newData.remainingAmount = total - paid;
      }
      
      return newData;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.name')}*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('clients.forms.project.fields.name')}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Status */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.status')}*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="pending">{t('clients.details.projects.filters.pending')}</option>
            <option value="in-progress">{t('clients.details.projects.filters.inProgress')}</option>
            <option value="completed">{t('clients.details.projects.filters.completed')}</option>
            <option value="on-hold">{t('clients.details.projects.filters.onHold')}</option>
            <option value="cancelled">{t('clients.details.projects.filters.cancelled')}</option>
          </select>
        </div>

        {/* Description */}
        <div className="form-control w-full md:col-span-2">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.description')}</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('clients.forms.project.fields.description')}
            className="textarea textarea-bordered w-full h-24"
          />
        </div>

        {/* Progress */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.progress')}*</span>
          </label>
          <input
            type="number"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            min="0"
            max="100"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Total Amount */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.totalAmount')}*</span>
          </label>
          <input
            type="number"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Paid Amount */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.paidAmount')}*</span>
          </label>
          <input
            type="number"
            name="paidAmount"
            value={formData.paidAmount}
            onChange={handleChange}
            min="0"
            max={formData.totalAmount}
            step="0.01"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Remaining Amount (Read-only) */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.remainingAmount')}</span>
          </label>
          <input
            type="number"
            value={formData.remainingAmount}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        {/* Start Date */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.startDate')}*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* End Date */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.project.fields.endDate')}</span>
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input input-bordered w-full"
            min={formData.startDate}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-ghost"
          disabled={isLoading}
        >
          {t('clients.forms.buttons.cancel')}
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              {t('clients.forms.buttons.saving')}
            </>
          ) : (
            <>
              <Icon name="tickCircle" />
              {project ? t('clients.forms.buttons.update') : t('clients.forms.buttons.add')}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ProjectForm; 