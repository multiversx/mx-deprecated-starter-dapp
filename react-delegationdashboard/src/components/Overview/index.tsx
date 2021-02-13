import React from 'react';
import Views from './Cards';
import Header from './Header';

const Overview = () => {
  return (
    <div className="d-row border-0 align-items-center justify-content-between px-spacer">
        <Header />
        <Views />
    </div>
  );
};

export default Overview;
