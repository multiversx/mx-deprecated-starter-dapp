import * as React from 'react';
import { useContext } from 'context';

const TopInfo = () => {
  const { accountAddress, balance } = useContext();
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="item row">
          <div className="key col-md-3">Your address</div>
          <div className="value col-md-9">{accountAddress}</div>
        </div>
        <div className="item row">
          <div className="key col-md-3">Available ERD balance</div>
          <div className="value col-md-9">{balance}</div>
        </div>
      </div>
    </div>
  );
};

export default TopInfo;
