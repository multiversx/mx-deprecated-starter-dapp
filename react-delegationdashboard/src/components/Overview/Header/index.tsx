import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import { contractViews } from 'contracts/ContractViews';
import { useContext } from '../../../context';

const Header = () => {
  const { pathname } = useLocation();
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
    return loginAddress === ownerAddress;
  };

  return (
    <div className="header card-header bg-primary text-white d-flex align-items-center justify-content-between px-spacer">
      <div className="py-spacer text-truncate">
        <p className="opacity-6 mb-0">Contract Address</p>
        <span className="text-truncate">{address}</span>
      </div>
      {isAdminFlag && pathname !== '/owner' ? (
        <Link to="/owner" className="btn btn-light-primary btn-sm text-primary">
          Admin
        </Link>
      ) : null}
      {pathname !== '/dashboard' ? (
        <Link to="/dashboard" className="btn btn-light-primary btn-sm text-primary">
          Dashboard
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
