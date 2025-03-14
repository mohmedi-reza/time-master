export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  projects: ClientProject[];
  totalPaid: number;
  totalDue: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientProject {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  progress: number; // 0-100
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
} 