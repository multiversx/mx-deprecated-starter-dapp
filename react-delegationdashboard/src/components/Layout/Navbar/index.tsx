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
    <>
      <div className="container navbar py-3 flex-nowrap">
        <div className="container-fluid flex-nowrap">
          <div className="d-flex align-items-center mr-3">
            <Logo className=" mr-2" />
            <span className="h5 text-nowrap mb-0 p-0">STAKE DAO</span>
          </div>
          {loggedIn && (
            <a href="/#" onClick={logOut} className="btn btn-primary ml-3">
              Logout
            </a>
          )}
        </div>
      </div>
      <div className="container flex-end flex-nowrap">
        <div className="container-fluid flex-nowrap">
          {loggedIn && (
            <div className="d-flex flex-column" style={{ minWidth: 0 }}>

              <span className='d-flex flex-end'>
                <small className="d-none d-lg-inline text-muted mr-2">Wallet address: </small> <small className="text-truncate">{address}</small>
              </span>
              <span className='d-flex flex-end'>
                <small className="d-none d-lg-inline text-muted mr-2">Balance: </small>
                <small className="text-truncate mr-2">
                  <Denominate value={account.balance.toString()} />
                </small>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;


{/*  */ }