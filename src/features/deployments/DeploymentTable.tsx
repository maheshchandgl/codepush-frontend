import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Deployment } from '../../types';

interface DeploymentTableProps {
  deployments: Deployment[];
}

const DeploymentTable: React.FC<DeploymentTableProps> = ({ deployments }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created At</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {deployments.map((deployment) => (
          <TableRow key={deployment.id}>
            <TableCell>{deployment.name}</TableCell>
            <TableCell>{deployment.status}</TableCell>
            <TableCell>{new Date(deployment.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeploymentTable;