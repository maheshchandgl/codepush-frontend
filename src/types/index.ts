export interface Deployment {
  name: string;
  key: string;
  createdTime: number;
  package: Package;
  packageHistory: Package[];
}

export interface Package {
  description: string;
  isDisabled: boolean;
  isMandatory: boolean;
  rollout: number;
  appVersion: string;
  packageHash: string;
  blobUrl: string;
  size: number;
  manifestBlobUrl: string;
  releaseMethod: string;
  uploadTime: number;
  label: string;
}

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