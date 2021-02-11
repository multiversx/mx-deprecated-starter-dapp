import { Redirect } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import React from 'react';
import { useContext } from 'context';
import Overview from 'components/Overview';
import Nodes from './Nodes';

const Owner = () => {
  const { address, contractOverview, loggedIn } = useContext();
  const isAdmin = (ownerAddress: string) => {
    let loginAddress = new Address(address).hex();
    return loginAddress === ownerAddress;
  };

  if (!isAdmin(contractOverview.ownerAddress)) {
    <Redirect to="/dashboard" />;
  }

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="owner w-100">
      <div className="card border-0">
        <Overview />
        <div className="card-body pt-0 px-spacer pb-spacer">
          <Nodes />
        </div>
      </div>
    </div>
  );
};

export default Owner;
