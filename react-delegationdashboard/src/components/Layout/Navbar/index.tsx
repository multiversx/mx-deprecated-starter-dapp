import React from 'react';
import { ReactComponent as Logo } from '../../../assets/images/logo_png_easy.svg';
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
          <span className="h5 text-nowrap mb-0 p-0"></span>
        </div>
        {loggedIn && (
          <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <small className="d-none d-lg-inline outside__grey mr-2">Wallet address: </small>
            <small className="text-truncate outside__dark">{address}</small>
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
