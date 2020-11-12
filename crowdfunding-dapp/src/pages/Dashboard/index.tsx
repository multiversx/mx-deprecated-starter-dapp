import React from 'react';
import {Redirect} from 'react-router-dom';
import { faExchangeAlt, faArrowUp, faArrowDown, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PageState from "../../components/PageState";
import Denominate from "../../components/Denominate";
import {useContext} from "../../context";

const Dashboard = () => {

  const { loggedIn } = useContext();
  if (!loggedIn) {
    return <Redirect to="/" />
  }

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
                      <span>erd1....</span>
                    </div>
                    <div className="mb-4">
                      <span className="opacity-6 mr-1">Contract address:</span>
                      <span>erd1qqqqq</span>
                    </div>
                    <div>
                      <h3 className="py-2">
                        <Denominate value="10000" />
                      </h3>
                    </div>
                  </div>
                  <div className="d-flex mt-4 justify-content-center">
                    <div className="action-btn">
                      <button className="btn" onClick={() => false}>
                        <FontAwesomeIcon icon={faArrowUp} className="text-primary" />
                      </button>
                      <a
                        href="/"
                        onClick={() => false}
                        className="text-white text-decoration-none"
                      >
                        First action
                      </a>
                    </div>

                    <div className="action-btn">
                      <button className="btn" onClick={() => false}>
                        <FontAwesomeIcon icon={faArrowDown} className="text-primary" />
                      </button>
                      <a
                        href="/"
                        onClick={() => false}
                        className="text-white text-decoration-none"
                      >
                        Second action
                      </a>
                    </div>

                    <div className="action-btn">
                      <button className="btn" onClick={() => false}>
                        <FontAwesomeIcon icon={faCaretDown} className="text-primary" />
                      </button>
                      <a
                        href="/"
                        onClick={() => false}
                        className="text-white text-decoration-none"
                      >
                        Third action
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
