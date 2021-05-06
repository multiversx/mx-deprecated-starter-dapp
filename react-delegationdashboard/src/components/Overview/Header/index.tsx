import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs';
import { useContext, useDispatch } from 'context';
import SetAgencyMetaDataModal from './SetAgencyMetaDataModal';
import { getItem } from 'storage/session';

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const {
    address,
    delegationContract,
    contractOverview,
    ledgerAccount,
    walletConnectAccount,
  } = useContext();

  const isOwner = () => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(contractOverview.ownerAddress) === 0;
  };

  const isOwnerPath = () => {
    let currentURL = window.location.pathname;
    return currentURL.includes('owner') === true;
  };

  const fetchLedger = () => {
    if (getItem('ledgerLogin') && !ledgerAccount) {
      const ledgerLogin = getItem('ledgerLogin');
      dispatch({
        type: 'setLedgerAccount',
        ledgerAccount: {
          index: ledgerLogin.index,
          address: address,
        },
      });
    }
  };

  const fetchWalletConnect = () => {
    if (getItem('walletConnectLogin') && !walletConnectAccount) {
      dispatch({
        type: 'setWalletConnectAccount',
        walletConnectAccount: address,
      });
    }
  };
  useEffect(fetchLedger, /* eslint-disable react-hooks/exhaustive-deps */ []);
  useEffect(fetchWalletConnect, /* eslint-disable react-hooks/exhaustive-deps */ []);

  return (
    <div className="header card-header d-flex align-items-center border-0 justify-content-between px-spacer">
      <div className="py-spacer text-truncate">
        <p className="opacity-6 mb-0">Contract Address</p>
        <span className="text-truncate">{delegationContract}</span>
      </div>
      <div className="d-flex justify-content-center align-items-center justify-content-between">
        {isOwner() && !isOwnerPath() ? (
          <Link to="/owner" className="btn btn-primary btn-sm">
            Admin
          </Link>
        ) : null}
        {pathname !== '/dashboard' ? (
          <Link to="/dashboard" className="btn btn-primary btn-sm">
            Dashboard
          </Link>
        ) : null}
        {isOwner() && isOwnerPath() ? <SetAgencyMetaDataModal /> : null}
      </div>
    </div>
  );
};

export default Header;
