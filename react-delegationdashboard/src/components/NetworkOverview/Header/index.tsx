import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import { contractViews } from 'contracts/ContractViews';
import { useContext } from '../../../context';

const Header = () => {
  const location = useLocation();
  const { address, dapp, delegationContract } = useContext();
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
  return (
    <div className="card-header border-0 bg-primary py-5 text-white d-flex flex-wrap">
      <div>
        <div className="mb-3 mb-lg-5">
          <span className="opacity-6 mr-1">Contract Address</span>
          <p className="text-white font-weight-normal">{address}</p>
        </div>
      </div>
      <div className="ml-lg-auto">
        {isAdminFlag && location.pathname !== '/owner' ? (
          <Link to="/owner" className="btn btn-light-primary text-primary">
            Admin
          </Link>
        ) : null}
        {location.pathname !== '/dashboard' ? (
          <Link to="/dashboard" className="btn btn-light-primary text-primary">
            Dashboard
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
