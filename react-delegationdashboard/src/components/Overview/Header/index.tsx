import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import { useContext } from 'context';
import SetAgencyMetaDataModal from './SetAgencyMetaDataModal';

const Header = () => {
  const { pathname } = useLocation();
  const { address, delegationContract, contractOverview } = useContext();

  const isAdmin = () => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(contractOverview.ownerAddress) === 0;
  };

  return (
    <div className="header card-header d-flex align-items-center border-0 justify-content-between px-spacer">
      <div className="py-spacer text-truncate">
        <p className="opacity-6 mb-0">Contract Address</p>
        <span className="text-truncate">{delegationContract}</span>
      </div>
      <div className="d-flex justify-content-center align-items-center justify-content-between">
        {isAdmin() && pathname !== '/owner' ? (
          <Link to="/owner" className="btn btn-primary btn-sm">
            Admin
          </Link>
        ) : null}
        {pathname !== '/dashboard' ? (
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Dashboard
          </Link>
        ) : null}
        {isAdmin() && pathname == '/owner' ? (
          <SetAgencyMetaDataModal />
        ) : null}
      </div>
    </div>
  );
};

export default Header;
