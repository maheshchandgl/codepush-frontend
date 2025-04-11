// Consolidated types from various files

// From file1.ts
export type Type1 = {
  id: number;
  name: string;
};

// From file2.ts
export type Type2 = {
  title: string;
  description: string;
};

// From file3.ts
export type Type3 = {
  isActive: boolean;
  createdAt: Date;
};

export type App = {
  id: string;
  name: string;
  os: string;
  platform: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  deployments: T; // Update to reflect the correct structure of the API response
  message?: string;
};

export interface Deployment {
  id: string; // Unique identifier for the deployment
  name: string; // Name of the deployment
  appId: string; // Associated app ID
  createdTime: number; // Timestamp of when the deployment was created
  key: string; // Deployment key
  package?: Package; // Optional package
  packageHistory: Package[]; // Add packageHistory
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

export interface UpdateDeploymentRequest {
  rollout?: number;
  description?: string;
  appVersion?: string;
  isMandatory?: boolean;
  label?: string;
}