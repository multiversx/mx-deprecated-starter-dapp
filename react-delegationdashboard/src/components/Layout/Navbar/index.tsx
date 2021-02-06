import React, { useEffect, useState } from 'react';
import { Address } from '@elrondnetwork/erdjs/out';
import { contractViews } from 'contracts/ContractViews';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { useContext, useDispatch } from '../../../context';

const Navbar = () => {
  const { loggedIn, dapp, address, delegationContract } = useContext();
  const dispatch = useDispatch();
  const location = useLocation();
  const { getContractConfig } = contractViews;
  const [isAdminFlag, setIsAdminFlag] = useState(false);

  useEffect(() => {
    getContractConfig(dapp, delegationContract)
      .then(respone => {
        if (isAdmin(respone.returnData[0].asHex)) {
          setIsAdminFlag(true);
        }
      })
      .catch(e => console.error('getContractConfig error ', e));
  }, []);

  const isAdmin = (ownerAddress: string) => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(ownerAddress) < 0 ? false : true;
  };

  const logOut = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  return (
    <BsNavbar className="navbar bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavItem className="d-flex align-items-center">
          <Logo className="logo mr-2" />
          <span className="dapp-name pl-2">Delegation Manager</span>
        </NavItem>

        <Nav className="ml-auto">
          {isAdminFlag && location.pathname !== '/owner' ? (
            <Link to="/owner" className="mr-3">
              Admin
            </Link>
          ) : (
            <></>
          )}
          {location.pathname !== '/dashboard' ? (
            <Link to="/dashboard" className="mr-3">
              Dashboard
            </Link>
          ) : (
            <></>
          )}
          {loggedIn && (
            <NavItem>
              <a href="/" onClick={logOut}>
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
