import React from 'react';
import { useContext } from 'context';
import Delegation from './Delegation';
import { Link, useLocation } from 'react-router-dom';
import PendingUndelegated from './PendingUndelegated';
import { Redirect } from 'react-router-dom';
import HomeCards from 'components/HomeCards';

const Landing = () => {

  return (
    <div className="dashboard w-100">
      <div className="card border-0">
        <div className="home__container header card-header d-flex border-0 ">

          <HomeCards />
          <div className="login__container card-body pt-0 px-spacer pb-spacer">
            <Link to="/login" className="login__btn btn btn-primary btn-lg">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Landing;
