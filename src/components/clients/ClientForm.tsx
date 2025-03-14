import React from 'react';
import { Client } from '../../interfaces/client.interface';
import Icon from '../common/icon/icon.component';

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
            <span className="label-text">Client Name*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter client name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email Address*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Phone */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Company */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Company Name</span>
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Enter company name"
            className="input input-bordered w-full"
          />
        </div>

        {/* Address */}
        <div className="form-control w-full md:col-span-2">
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
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
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Saving...
            </>
          ) : (
            <>
              <Icon name="tickCircle" />
              {client ? 'Update Client' : 'Add Client'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default ClientForm; 