import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { useContext } from 'context';
import { ReactComponent as ElrondLogo } from 'assets/img/elrond-symbol.svg';

const Navbar = () => {
  const { accountAddress } = useContext();

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavItem className="d-flex align-items-center">
          <ElrondLogo className="elrond-logo mr-2" />
          <span className="logo-text pr-2">Elrond</span>
          <span className="text-muted ml-2">Dapp</span>
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
