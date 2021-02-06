import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import Delegator from './Delegator';
import { Address } from '@elrondnetwork/erdjs/out';
import { Link, Redirect } from 'react-router-dom';
import { contractViews } from 'contracts/ContractViews';
import Header from 'components/Header';

const Dashboard = () => {
  const { address, dapp, delegationContract, loggedIn } = useContext();
  const { getContractConfig } = contractViews;
  const [isAdminFlag, setIsAdminFlag] = useState(false);

  useEffect(() => {
    getContractConfig(dapp, delegationContract)
      .then(respone => {
        if (isAdmin(respone.returnData[0].asHex)) {
          setIsAdminFlag(true);
        }
      })
      .catch(e => console.error('getContractConfig error ', e));
  }, []);

  const isAdmin = (ownerAddress: string) => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(ownerAddress) < 0 ? false : true;
  };
  if (!loggedIn) {
    return <Redirect to="/" />;
  }
  return (
    <div className="dashboard container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto card p-3">
          <div className="card-body">
            <Header />
            {isAdminFlag ? (
              <Link to="/owner" className="btn btn-primary">
                View Owner Panel
              </Link>
            ) : (
              <></>
            )}
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
