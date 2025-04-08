export declare const promoteDeployment: (
  appName: string,
  sourceDeploymentName: string,
  targetDeploymentName: string,
  payload: object
) => Promise<void>;

export declare const rollbackDeployment: (
  appName: string,
  sourceDeploymentName: string,
  label: string
) => Promise<void>;