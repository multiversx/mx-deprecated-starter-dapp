import BigNumber from 'bignumber.js';
import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import nominate from 'helpers/nominate';
import DelegationCapModal from './DelegationCapModal';

const UpdateDelegationCapAction = () => {
  const { delegation } = useDelegation();
  const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);

  const handleUpdateDelegationCap = (value: string) => {
    const hexCap = nominateValToHex(value);
    delegation.sendTransaction('0', 'modifyTotalDelegationCap', hexCap).then();
  };

  const nominateValToHex = (value: string) => {
    let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

    if (val.length % 2 !== 0) {
      val = '0' + val;
    }
    return val;
  };

  return (
    <div>
      <button
        onClick={() => setShowDelegationCapModal(true)}
        className="btn btn-white btn-sm text-green opacity-5 mr-n1"
      >
        Change
      </button>
      <DelegationCapModal
        show={showDelegationCapModal}
        title="Delegation cap"
        description="Update Delegation Cap"
        handleClose={() => {
          setShowDelegationCapModal(false);
        }}
        handleContinue={handleUpdateDelegationCap}
      />
    </div>
  );
};

export default UpdateDelegationCapAction;
