import React from 'react';
import { Client } from '../../interfaces/client.interface';
import Icon from '../common/icon/icon.component';
import { useTranslation } from 'react-i18next';

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: Partial<Client>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState<Partial<Client>>({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    company: client?.company || '',
    address: client?.address || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.client.fields.name')}*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t('clients.forms.client.fields.name')}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.client.fields.email')}*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('clients.forms.client.fields.email')}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Phone */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.client.fields.phone')}</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('clients.forms.client.fields.phone')}
            className="input input-bordered w-full"
          />
        </div>

        {/* Company */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">{t('clients.forms.client.fields.company')}</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder={t('clients.forms.client.fields.company')}
            className="input input-bordered w-full"
          />
        </div>

        {/* Address */}
        <div className="form-control w-full md:col-span-2">
          <label className="label">
            <span className="label-text">{t('clients.forms.client.fields.address')}</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={t('clients.forms.client.fields.address')}
            className="textarea textarea-bordered w-full h-24"
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
              {client ? t('clients.forms.buttons.update') : t('clients.forms.buttons.add')}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ClientForm; 