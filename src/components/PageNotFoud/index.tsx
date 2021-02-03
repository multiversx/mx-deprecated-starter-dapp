import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PageNotFound = () => {
  const { pathname } = useLocation();
  return (
    <div className="d-flex flex-fill align-items-center container">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-5 mx-auto">
          <div className="card shadow-sm rounded p-4 border-0">
            <div className="card-body text-center d-flex flex-column justify-content-center">
              <FontAwesomeIcon icon={faSearch} className="mx-auto text-muted fa-3x mb-2" />
              <span className="h4 empty-heading">Page not found</span>
              <span className="empty-details">{pathname}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;