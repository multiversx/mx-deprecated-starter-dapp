import React, { useEffect, useState } from 'react';
import Denominate from '../../Denominate';
import { useContext } from '../../../context';
import { Address } from '@elrondnetwork/erdjs/out';

const Header = () => {
  const { address, dapp } = useContext();
  const [balance, setBalance] = useState('');

  useEffect(() => {
    dapp.proxy.getAccount(new Address(address)).then(value => setBalance(value.balance.toString()));
  }, []);

  return (
    <div className="card-header border-0 bg-primary py-5">
      <div className="text-white row">
        <div className="col-12">
          <div className="mb-1">
            <span className="opacity-6 mr-1">Your address:</span>
            <h4 className="text-white">{address}</h4>
          </div>
          <div className="mb-1">
            <span className="opacity-6 mr-1">Total stake:</span>
            <h3 className="text-white">
              <Denominate value={balance} />
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
