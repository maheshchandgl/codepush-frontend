import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';
import { usePromoteDeployment } from '../hooks/usePromoteDeployment';
import { useRollbackDeployment } from '../hooks/useRollbackDeployment';
import { Package, PromoteDeploymentRequest } from '../types';
import { RELEASE_METHODS, DEPLOYMENT_NAMES } from '../constants';
import en from '../../public/en.json';

interface DeploymentTableProps {
  packages: Package[];
  onRowClick: (pkg: Package) => void;
  appName: string;
  sourceDeploymentName: string;
  productionPackages: Package[]; // Add productionPackages to props
}

export const DeploymentTable = ({ packages, onRowClick, appName, sourceDeploymentName, productionPackages }: DeploymentTableProps) => {
  const { promote, loading: promoteLoading } = usePromoteDeployment(appName, sourceDeploymentName);
  const { rollback, loading: rollbackLoading } = useRollbackDeployment(appName, sourceDeploymentName);

  const sortedPackages = [...packages].sort((a, b) => b.uploadTime - a.uploadTime);

  const isPromoted = (pkg: Package) => {
    return productionPackages.some((prodPkg) => prodPkg.packageHash === pkg.packageHash);
  };

  return (
    <TableContainer component={Paper} sx={{ marginY: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>App Version</TableCell>
            <TableCell>Rollout</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Release Method</TableCell>
            <TableCell>Upload Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPackages.map((pkg, index) => (
            <TableRow
              key={index}
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('button')) {
                  onRowClick(pkg);
                }
              }}
            >
              <TableCell>{pkg.label}</TableCell>
              <TableCell>{pkg.appVersion}</TableCell>
              <TableCell>{pkg.rollout || 'N/A'}</TableCell>
              <TableCell>{pkg.size}</TableCell>
              <TableCell>{pkg.releaseMethod}</TableCell>
              <TableCell>{new Date(pkg.uploadTime).toLocaleString()}</TableCell>
              <TableCell>
                {sourceDeploymentName === DEPLOYMENT_NAMES.PRODUCTION && pkg.releaseMethod !== RELEASE_METHODS.ROLLBACK ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => rollback(pkg.label)}
                    disabled={rollbackLoading}
                  >
                    {en.deploymentTable.rollback}
                  </Button>
                ) : (
                  sourceDeploymentName !== DEPLOYMENT_NAMES.PRODUCTION && (
                    isPromoted(pkg) ? (
                      <Typography variant="body2" color="textSecondary">
                        {en.deploymentTable.alreadyPromoted}
                      </Typography>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => promote(DEPLOYMENT_NAMES.PRODUCTION, {
                          label: pkg.label,
                          description: pkg.description,
                          rollout: pkg.rollout,
                          isMandatory: pkg.isMandatory,
                          appVersion: pkg.appVersion,
                        })}
                        disabled={promoteLoading}
                      >
                        {en.deploymentTable.promote}
                      </Button>
                    )
                  )
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};