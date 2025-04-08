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
  data: T;
  message?: string;
};

export type Deployment = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  packageInfo?: Package;
};

export interface Package {
  id: string;
  name: string;
  version: string;
  description?: string;
  isMandatory: boolean;
  rollout: number;
  packageHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDeploymentRequest {
  rollout?: number;
  description?: string;
  appVersion?: string;
  isMandatory?: boolean;
  label?: string;
}