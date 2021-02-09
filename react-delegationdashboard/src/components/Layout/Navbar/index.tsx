import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { useContext, useDispatch } from '../../../context';

const Navbar = () => {
  const { loggedIn, dapp, address } = useContext();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  return (
    <BsNavbar className="navbar bg-white border-bottom px-4 py-3">
      <div className="container-fluid d-flex flex-wrap align-items-center">
        <NavItem className="d-flex align-items-center">
          <Logo className="logo mr-2" />
          <span className="navbar-brand pl-2">Delegation Manager</span>
        </NavItem>
        <Nav className="ml-lg-auto d-flex frex-wrap align-items-center">
          {address && (
            <div className="mr-4 d-flex flex-wrap">
              <span className="text-muted mr-2">Wallet address:</span>
              <span className="text-dark navbar-address">{address}</span>
            </div>
          )}
          {loggedIn && (
            <NavItem>
              <a href="/" onClick={logOut} className="btn btn-light text-primary">
                Close
              </a>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
