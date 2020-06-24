import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { ReactComponent as ElrondLogo } from 'assets/img/elrond-symbol.svg';
import './navbar.scss';

export default function NavbarWrapper() {
  return (
    <Navbar>
      <div className="container-fluid navContainer">
        <NavItem id="basic-nav-dropdown" className="brandDropdown">
          <span className="appSwitcherButton">
            <ElrondLogo className="elrond-logo" />
            <span className="activeApp">Dapp</span>
          </span>
        </NavItem>
      </div>
    </Navbar>
  );
}
