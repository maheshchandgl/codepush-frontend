export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface UpdateDeploymentRequest {
  rollout?: number;
  description?: string;
  appVersion?: string;
  isMandatory?: boolean;
  label?: string;
}

export interface PromoteDeploymentRequest {
  label?: string;
  description?: string;
  rollout?: number;
  isMandatory?: boolean;
  appVersion?: string;
}

export interface AccessKey {
  id: string;
  name: string;
  createdTime: number;
  expiresAt?: number;
}

export interface AcquisitionDetailsProps {
  appName: string;
}

export interface AppsManagementProps {
  onAppClick: (appName: string) => void;
}

export interface AppInsightsProps {
  appName: string;
}

export interface AppBarProps {
  title: string;
  showBackButton?: boolean;
}