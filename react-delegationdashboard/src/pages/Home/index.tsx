import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import PageState from 'components/PageState';
import { useContext } from 'context';
import LedgerLogin from './Login/Ledger';
import WalletLogin from './Login/Wallet';

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
        <div className="m-auto login-container">
          <div className="card my-3 text-center">
            <div className="card-body mx-3 mx-lg-5">
              <Logo className="logo my-4" />
              <h4 className="mb-4">Delegation Manager</h4>
              <p className="mb-5">
                Etiam tincidunt turpis vitae sapien iaculis accumsan. Nunc placerat lorem non ipsum
                interdum, vel condimentum justo tristique. Praesent ut dapibus velit, eu vehicula
                orci.
              </p>
              <div className="mb-4">
                <LedgerLogin />
                <WalletLogin />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
