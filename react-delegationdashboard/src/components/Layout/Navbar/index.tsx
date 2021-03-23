import React from 'react';
import { ReactComponent as Logo } from '../../../assets/images/new_e2s.svg';
import { useContext, useDispatch } from '../../../context';

const Navbar = () => {
  const { loggedIn, dapp, address } = useContext();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  return (
    <div className="navbar px-4 py-3 flex-nowrap">
      <div className="container-fluid flex-nowrap">
        <div className="d-flex align-items-center mr-3">
        <Logo className="logo2 logo mr-2 flex-shrink-0" />
          <div className="custom__logo" >
          
              <a className="logo__title" 
              href="https://www.easy2stake.com/">
              Easy 2 stake
              </a>
              <div className="logo__desc">
              Elrond Delegation Manager
              </div>
            </div>
          <span className="h5 text-nowrap mb-0 p-0"></span>
        </div>
        {loggedIn && (
          <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <small className="d-none d-lg-inline outside__green mr-2">Wallet address: </small>
            <small className="text-truncate outside__light">{address}</small>
            <a href="/#" onClick={logOut} className="outside_btn btn btn-primary btn-sm ml-3">
              Close
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
