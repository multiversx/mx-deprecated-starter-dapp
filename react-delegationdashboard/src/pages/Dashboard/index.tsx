import React, { useEffect, useState } from 'react';
import Denominate from '../../components/Denominate';
import { useContext } from '../../context';
import StakeProviderArea from '../../components/StakeProviderArea';
import DelegatorArea from '../../components/DelegatorArea';
import { Address } from '@elrondnetwork/erdjs/out';
import { Redirect } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Dashboard = () => {
  const { address, dapp, delegationContract, loggedIn } = useContext();
  const [balance, setBalance] = useState('');

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  useEffect(function () {
    dapp.proxy.getAccount(new Address(address))
      .then((value) => setBalance(value.balance.toString()));
  }, 
  []);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto">
          <div className="card shadow-sm rounded border-0">
            <div className="card-body p-1">
              <div className="card rounded border-0 bg-primary">
                <div className="card-body text-center p-4">
                  <div className="text-white">
                    <div className="mb-1">
                      <span className="opacity-6 mr-1">Your address:</span>
                      <span>{address}</span>
                    </div>
                    <div className="mb-4">
                      <span className="opacity-6 mr-1">Contract address:</span>
                      <span>{delegationContract}</span>
                    </div>
                    <div>
                      <h3 className="text-white">
                        <Denominate value={balance} />
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <StakeProviderArea />
              <DelegatorArea />
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;