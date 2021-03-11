import Denominate from 'components/Denominate';
import React from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { useContext, useDispatch } from 'context';

const Navbar = () => {
  const { loggedIn, dapp, address, account } = useContext();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  return (
    <div className="navbar px-4 py-3 flex-nowrap">
      <div className="container-fluid flex-nowrap">
        <div className="d-flex align-items-center mr-3">
          <Logo className="logo mr-2 flex-shrink-0" />
          <span className="h5 text-nowrap mb-0 p-0">Delegation Manager</span>
        </div>
        {loggedIn && (
          <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <small className="d-none d-lg-inline text-muted mr-2">Balance: </small>
            <small className="text-truncate mr-2">
              <Denominate value={account.balance.toString()} />
            </small>
            <small className="d-none d-lg-inline text-muted mr-2">Wallet address: </small>
            <small className="text-truncate">{address}</small>
            <a href="/#" onClick={logOut} className="btn btn-primary btn-sm ml-3">
              Close
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
