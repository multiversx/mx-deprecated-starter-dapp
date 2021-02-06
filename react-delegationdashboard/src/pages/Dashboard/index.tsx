import React from 'react';
import { useContext } from 'context';
import Delegator from './Delegator';
import { Redirect } from 'react-router-dom';
import Header from 'components/Header';

const Dashboard = () => {
  const { delegationContract, loggedIn } = useContext();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboard container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto card p-3">
          <div className="card-body">
            <Header />
            <Delegator />
            <div className="card">
              <div className="card-body">
                <span className="mr-1">Contract address:</span>
                <span>{delegationContract}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
