import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const PageNotFound = () => {
  const { pathname } = useLocation();
  return (
    <div className="container pt-3 pb-3">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body card-details">
              <div className="empty">
                <FontAwesomeIcon icon={faTimes} className="empty-icon" />
                <span className="h4 empty-heading">Page not found</span>
                <span className="empty-details">{pathname}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
