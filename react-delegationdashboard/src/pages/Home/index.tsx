import React from 'react';
import { Redirect } from 'react-router-dom';
import { faBan, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import State from 'components/State';
import { useContext } from 'context';
import LedgerLogin from './Login/Ledger';
import WalletLogin from './Login/Wallet';

const Home = () => {
  const { loading, error, loggedIn } = useContext();

  const ref = React.useRef(null);

  return (
    <div ref={ref} className="home d-flex flex-fill align-items-center">
      {error ? (
        <State
          icon={faBan}
          iconClass="text-primary"
          title="Something went wrong"
          description="If the problem persists please contact support."
        />
      ) : loggedIn ? (
        <Redirect to="/dashboard" />
      ) : loading ? (
        <State icon={faCircleNotch} iconClass="fa-spin text-primary" />
      ) : (
        <div className="m-auto login-container">
          <div className="card my-spacer text-center">
            <div className="card-body p-spacer mx-lg-spacer">
              <Logo className="logo mb-spacer" />
              <h4 className="mb-spacer">Delegation Manager</h4>
              <p className="lead mb-spacer">
                Etiam tincidunt turpis vitae sapien iaculis accumsan.
              </p>
              <p className="mb-spacer">
                Etiam tincidunt turpis vitae sapien iaculis accumsan. Nunc placerat lorem non ipsum
                interdum, vel condimentum justo tristique. Praesent ut dapibus velit, eu vehicula
                orci.
              </p>
              <div>
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
