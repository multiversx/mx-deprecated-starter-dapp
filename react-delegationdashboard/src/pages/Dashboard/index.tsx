import React from 'react';
import { useContext } from 'context';
import Delegation from './Delegation';
import PendingUndelegated from './PendingUndelegated';
import { Redirect } from 'react-router-dom';
import Overview from 'components/Overview';
import State from 'components/State';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const { loggedIn, networkConfig } = useContext();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboard w-100">
      <div className="card border-0">
        <Overview />
        {networkConfig.roundDuration === -1 ? (
          <State icon={faCircleNotch} iconClass="fa-spin text-primary" />
        ) : (
          <div className="card-body pt-0 px-spacer pb-spacer">
            <Delegation />
            <PendingUndelegated />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
