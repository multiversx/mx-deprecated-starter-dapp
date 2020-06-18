import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useContext } from 'context';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  const ref = React.useRef(null);
  const { accountAddress } = useContext();

  if (!accountAddress) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container pt-3 pb-3" ref={ref}>
      <div className="row">
        <div className="col-12">
          <TopInfo />
        </div>
      </div>
      <Transactions />
    </div>
  );
};

export default Dashboard;
