import React from 'react';
import { Navbar } from 'react-bootstrap';
import AppSwitcher from './AppSwitcher';
import './navbar.scss';

export default function NavbarWrapper() {
  return (
    <Navbar>
      <div className="container-fluid navContainer">
        <AppSwitcher />
        <div className="ml-auto">
          <p className="network mb-0">Dapp</p>
        </div>
      </div>
    </Navbar>
  );
}
