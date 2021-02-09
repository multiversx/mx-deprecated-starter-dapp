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
      <div className="container-fluid">
        <div className="row w-100 align-items-center">
          <NavItem className="d-flex align-items-center col-12 col-lg-4 p-0">
            <Logo className="logo mr-2" />
            <span className="navbar-brand pl-2">Delegation Manager</span>
          </NavItem>
          <Nav className="text-lg-right align-items-center col-12 col-lg-8 p-0">
            {address && (
              <div className="row w-100 align-items-center">
                <div className="col-9 col-lg-11 text-dark ">
                  <div className="text-truncate">
                    <span className="text-muted mr-2">Wallet address:</span> {address}
                  </div>
                </div>
                <div className="col-3 col-lg-1 text-dark text-right">
                  {loggedIn && (
                    <NavItem>
                      <a href="/" onClick={logOut} className="btn btn-light text-primary">
                        Close
                      </a>
                    </NavItem>
                  )}
                </div>
              </div>
            )}
          </Nav>
        </div>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
