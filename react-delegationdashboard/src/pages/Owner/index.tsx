import { Redirect } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import React from 'react';
import { useContext } from 'context';
import Overview from 'components/Overview';
import Nodes from './Nodes';

const Owner = () => {
  const { address, contractOverview, loggedIn } = useContext();
  const isAdmin = () => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(contractOverview.ownerAddress) === 0;
  };

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {isAdmin() ? (
        <div className="owner w-100">
          <div className="card border-0">
            <Overview />
            <div className="card-body pt-0 px-spacer pb-spacer">
              <Nodes />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
};

export default Owner;
