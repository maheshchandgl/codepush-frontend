import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDeployments } from '../services/api/deploymentsApi';

const AppDetails = () => {
  const { appName } = useParams();
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    const loadDeployments = async () => {
      const response = await fetchDeployments(appName);
      setDeployments(response.deployments || []); // Access the 'deployments' array from the API response
    };
    loadDeployments();
  }, [appName]);

  return (
    <div>
      <h1>App Details</h1>
      <h2>{appName}</h2>
      <h3>Environments</h3>
      <ul>
        <li>Staging</li>
        <li>Production</li>
      </ul>
      <h3>Deployments</h3>
      <ul>
        {deployments.map((deployment) => (
          <li key={deployment.name}>
            {deployment.name} - Target Version: {deployment.targetVersion}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppDetails;