import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { useContext } from 'context';
import { ReactComponent as ElrondLogo } from 'assets/img/elrond-symbol.svg';
import './navbar.scss';

const Navbar = () => {
  const { accountAddress } = useContext();

  return (
    <BsNavbar>
      <div className="container-fluid navContainer">
        <NavItem id="basic-nav-dropdown" className="brandDropdown">
          <span className="appSwitcherButton">
            <ElrondLogo className="elrond-logo" />
            <span className="activeApp">Dapp</span>
          </span>
        </NavItem>
        <Nav className="ml-auto">
          {accountAddress && (
            <NavItem>
              <a href="/">Close</a>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
