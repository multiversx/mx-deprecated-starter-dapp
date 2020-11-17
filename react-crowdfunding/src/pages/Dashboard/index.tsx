import React from 'react';
import {Redirect} from 'react-router-dom';
import { faExchangeAlt, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageState from "../../components/PageState";
import Denominate from "../../components/Denominate";
import {useContext} from "../../context";
import {addresses, Crowdfund} from '../../contracts';

const Dashboard = () => {

  const { loggedIn, address, dapp } = useContext();
  if (!loggedIn) {
    return <Redirect to="/" />
  }

  const handleSendFunds = () => {
    const crowdfundContract = new Crowdfund(addresses["crowdfunding_testnet"], dapp.proxy, dapp.provider);
    crowdfundContract.sendFunds().then();
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto">
          <div className="card shadow-sm rounded border-0">
            <div className="card-body p-1">
              <div className="card rounded border-0 bg-primary">
                <div className="card-body text-center p-4">
                  <div className="text-white">
                    <div className="mb-1">
                      <span className="opacity-6 mr-1">Your address:</span>
                      <span>{address}</span>
                    </div>
                    <div className="mb-4">
                      <span className="opacity-6 mr-1">Contract address:</span>
                      <span>{addresses["crowdfunding_testnet"]}</span>
                    </div>
                    <div>
                      <h3 className="py-2">
                        <Denominate value="10000" />
                      </h3>
                    </div>
                  </div>
                  <div className="d-flex mt-4 justify-content-center">
                    <div className="action-btn">
                      <button className="btn" onClick={() => handleSendFunds()}>
                        <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
                      </button>
                      <a
                        href="#"
                        onClick={() => handleSendFunds()}
                        className="text-white text-decoration-none"
                      >
                        Send Funds
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-5">
                <PageState
                  svgComponent={<FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />}
                  title="No info to show"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default Dashboard;
