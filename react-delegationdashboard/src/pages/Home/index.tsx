import React, {  } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import PageState from "../../components/PageState";
import {useContext} from "../../context";
import LedgerLogin from "../../components/Login/Ledger";
import WalletLogin from "../../components/Login/Wallet";

const Home = () => {
  const {loading, error, loggedIn} = useContext();

  const ref = React.useRef(null);

  return (
    <div ref={ref} className="d-flex flex-fill align-items-center container">
      {
        error ?
          <PageState
            svgComponent={<FontAwesomeIcon icon={faBan} className="text-secondary fa-3x" />}
            title="Unavailable"
            className="dapp-icon icon-medium"
          /> :
        loggedIn ?
          <Redirect to="/dashboard" /> :
        loading ?
          <PageState svgComponent={<></>} spin /> :

          <div className="row w-100 d-flex flex-column login__container">
            <h1 className="text-center">Welcome to our Delegation Dashboard App</h1>
            <LedgerLogin />
            <WalletLogin />
          </div>
      }
    </div>
  )
};

export default Home;
