import React from 'react';
import { useContext } from 'context';
import Delegator from './Delegator';
import { Redirect } from 'react-router-dom';
import NetworkOverview from 'components/NetworkOverview';

const Dashboard = () => {
  const { loggedIn } = useContext();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboard container py-4">
      <div className="card card- card-custom bg-gray-100 card-stretch full-width">
        <NetworkOverview />
        <Delegator />
      </div>
    </div>
  );
};

export default Dashboard;
