import React, { useState, ChangeEvent } from 'react';
import { useContext } from 'context';
import Delegation from './Delegation';
import { Link, useLocation } from 'react-router-dom';
import PendingUndelegated from './PendingUndelegated';
import { Redirect } from 'react-router-dom';
import HomeCards from 'components/HomeCards';
import { faBan, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/images/logo2.svg';
import State from 'components/State';
import LedgerLogin from './Login/Ledger';
import WalletLogin from './Login/Wallet';



const Landing = () => {
  
  const { loading, error, loggedIn, egldLabel } = useContext();
  let [count , setCount] = useState(50);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCount(Number(event.currentTarget.value));
  };
  const ref = React.useRef(null);
  

  return (
    
    <div className="dashboard w-100">
      <div className="card border-0">
        <div className="home__container header card-header d-flex border-0 ">

          <HomeCards />
          <div className="login__container card-body pt-0 px-spacer pb-spacer">
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
                      <p className="lead mb-spacer">
                        Delegate Elrond ({egldLabel}) and earn up to 25% APY!
                      </p>
                      <p className="mb-spacer">Please select your login method:</p>
                      <div>
                        <LedgerLogin />
                        <WalletLogin />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="h5 d-flex justify-content-center">{count}</div>
          <div className='slider'>
            <input
              style={{
                background: 'linear-gradient(to right, #10d5c2 0%,#10d5c2 ' + 
                (count/25) + '%,#eaeefb ' +
                (count/25) + '%,#eaeefb 100%)'
              }}
              id="typeinp" 
              type="range" 
              min="10" max="2500" 
              value={count} 
              onChange={onChange}
              step="1"
              />

          </div>
          
          

        </div>
      </div>
    </div>
  );
};

export default Landing;
