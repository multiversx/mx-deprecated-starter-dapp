import * as React from 'react';
import { useContext } from 'context';
import { Denominate } from 'sharedComponents';

const TopInfo = () => {
  const {
    accountAddress,
    balance,
    config: { contractAddress },
  } = useContext();
  return (
    <div className="text-white">
      <div className="mb-1">
        <span className="opacity-6 mr-1">Your address:</span>
        <span>{accountAddress}</span>
      </div>
      <div className="mb-4">
        <span className="opacity-6 mr-1">Contract address:</span>
        <span>{contractAddress}</span>
      </div>
      <div>
        <h3 className="py-2">
          <Denominate value={balance} />
        </h3>
      </div>
    </div>
  );
};

export default TopInfo;
