import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import { useContext } from '../../../context';

const Header = () => {
  const { pathname } = useLocation();
  const { address, delegationContract, contractOverview } = useContext();

  const isAdmin = (ownerAddress: string) => {
    let loginAddress = new Address(address).hex();
    return loginAddress === ownerAddress;
  };

  return (
    <div className="header card-header bg-primary text-white d-flex align-items-center justify-content-between px-spacer">
      <div className="py-spacer text-truncate">
        <p className="opacity-6 mb-0">Contract Address</p>
        <span className="text-truncate">{delegationContract}</span>
      </div>
      {isAdmin(contractOverview.ownerAddress) && pathname !== '/owner' ? (
        <Link to="/owner" className="btn btn-primary btn-sm">
          Admin
        </Link>
      ) : null}
      {pathname !== '/dashboard' ? (
        <Link to="/dashboard" className="btn btn-primary btn-sm">
          Dashboard
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
