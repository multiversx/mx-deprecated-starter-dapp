import React, {useState, ChangeEvent, Component} from 'react';
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
import StatCard from 'components/StatCard';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

const Landing = () => {
  
  const { loading, error, loggedIn, egldLabel } = useContext();

  let [count2 , setCount2] : any = useState(50);

  const onChange2 = (value : any) => {
    setCount2(value);
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

          <div className="h5 d-flex justify-content-center">{count2}</div>

          <div className='slider'>
            <Slider
              min={10}
              max={2500}
              value={count2}
              //onChangeStart={this.handleChangeStart}
              onChange={onChange2}
              //onChangeComplete={this.handleChangeComplete}
            />
          </div>

          <div className="cards__login d-flex flex-wrap mr-spacer">

            <StatCard
              title="Daily"
              value={count2}
              valueUnit="xEGLD"
              color="lightgreen"
              realMoney="$3"
              
            />
            <StatCard
              title="Weekly"
              value={String(count2*7)}
              valueUnit="xEGLD"
              color="lightgreen"
              realMoney="$3"
              
            />
            <StatCard
              title="Monthly"
              value={String(count2*30)}
              valueUnit="xEGLD"
              color="lightgreen"
              realMoney="$3"
              
            />
            <StatCard
              title="Yearly"
              value={String(count2*365)}
              valueUnit="xEGLD"
              color="lightgreen"
              realMoney="$3"
              
            />

          </div>
          
          

        </div>
      </div>
    </div>
  );
};

export default Landing;