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
    <div className="dashboard container py-5">
      <div className="card border-0">
        <NetworkOverview />
        <div className="card-body">
          <Delegator />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
