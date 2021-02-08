import React, { useEffect, useState } from 'react';
import { Address } from '@elrondnetwork/erdjs/out';
import { contractViews } from 'contracts/ContractViews';
import { Link } from 'react-router-dom';
import Denominate from '../../Denominate';
import { useContext, useDispatch } from '../../../context';

const Header = () => {
  const { address, dapp, delegationContract } = useContext();
  const [balance, setBalance] = useState('');
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

  useEffect(() => {
    dapp.proxy.getAccount(new Address(address)).then(value => setBalance(value.balance.toString()));
  }, []);

  return (
    <div className="card-header border-0 bg-primary py-5 text-white d-flex flex-wrap">
      <div>
        <div className="mb-4">
          <span className="opacity-6 mr-1">Contract Address</span>
          <p className="text-white font-weight-normal">{address}</p>
        </div>
        <div className="mb-4">
          <span className="opacity-6 mr-1">Contract Stake</span>
          <h4 className="text-white font-weight-normal">
            <Denominate value={balance} />
          </h4>
        </div>
      </div>
      <div className="ml-lg-auto">
        {isAdminFlag ? (
          <Link to="/owner" className="btn btn-light-primary text-primary">
            Admin
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
