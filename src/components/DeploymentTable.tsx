import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const DeploymentTable = ({ packages, onRowClick }) => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {packages.map((pkg, index) => (
            <TableRow key={index} onClick={() => onRowClick(pkg)}>
              <TableCell>{pkg.label}</TableCell>
              <TableCell>{pkg.appVersion}</TableCell>
              <TableCell>{pkg.rollout || 'N/A'}</TableCell>
              <TableCell>{pkg.size}</TableCell>
              <TableCell>{pkg.releaseMethod}</TableCell>
              <TableCell>{new Date(pkg.uploadTime).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeploymentTable;