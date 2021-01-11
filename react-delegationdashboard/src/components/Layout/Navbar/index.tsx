import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { ReactComponent as ElrondLogo } from '../../../assets/img/elrond.svg';
import {useContext, useDispatch} from "../../../context";

const Navbar = () => {
  const {loggedIn} = useContext();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({type: "logout"});
  };

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavItem className="d-flex align-items-center">
          <ElrondLogo className="elrond-logo mr-2" />
          <span className="dapp-name text-muted pl-2">Dapp</span>
        </NavItem>

        <Nav className="ml-auto">
          {loggedIn && (
            <NavItem>
              <a href="/" onClick={() => logOut()}>Close</a>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
