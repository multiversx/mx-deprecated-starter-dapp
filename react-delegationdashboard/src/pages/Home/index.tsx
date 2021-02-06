import React from 'react';
import { Redirect } from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import PageState from '../../components/PageState';
import { useContext } from '../../context';
import LedgerLogin from '../../components/Login/Ledger';
import WalletLogin from '../../components/Login/Wallet';

const Home = () => {
  const { loading, error, loggedIn } = useContext();

  const ref = React.useRef(null);

  return (
    <div ref={ref} className="home d-flex flex-fill align-items-center container">
      {error ? (
        <PageState
          svgComponent={<FontAwesomeIcon icon={faBan} className="text-secondary fa-3x" />}
          title="Unavailable"
          className="dapp-icon icon-medium"
        />
      ) : loggedIn ? (
        <Redirect to="/dashboard" />
      ) : loading ? (
        <PageState svgComponent={<></>} spin />
      ) : (
        <div className="m-auto">
          <div className="card my-3 text-center ">
            <div className="card-body px-0">
              <h4 className="p-spacer">Welcome to our Delegation Dashboard App</h4>
              <Tabs
                defaultActiveKey="login"
                className="login-tabs justify-content-center"
                id="wallet-login"
                transition={false}
              >
                <Tab eventKey="login" title="Ledger">
                  <LedgerLogin />
                </Tab>
                <Tab eventKey="wallet" title="Wallet">
                  <WalletLogin />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
