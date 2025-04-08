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
} from '@mui/material';
import { promoteDeployment } from '../services/api/deploymentsApi';
import { Package, PromoteDeploymentRequest } from '../types';

interface DeploymentTableProps {
  packages: Package[];
  onRowClick: (pkg: Package) => void;
  appName: string;
  sourceDeploymentName: string;
}

export const DeploymentTable = ({ packages, onRowClick, appName, sourceDeploymentName }: DeploymentTableProps) => {
  const handlePromote = async (destDeploymentName: string, packageInfo: PromoteDeploymentRequest) => {
    try {
      const response = await promoteDeployment(appName, sourceDeploymentName, destDeploymentName, packageInfo);
      console.log('Package promoted successfully:', response);
    } catch (error) {
      console.error('Error promoting package:', error);
    }
  };

  const sortedPackages = [...packages].sort((a, b) => b.uploadTime - a.uploadTime);

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
                {sourceDeploymentName !== 'Production' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handlePromote('Production', {
                      label: pkg.label,
                      description: pkg.description,
                      rollout: pkg.rollout,
                      isMandatory: pkg.isMandatory,
                      appVersion: pkg.appVersion,
                    })}
                  >
                    Promote
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};