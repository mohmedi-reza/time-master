export interface ConnectionState {
  [key: string]: {
    isConnected: boolean;
    lastSync?: string;
  };
} 