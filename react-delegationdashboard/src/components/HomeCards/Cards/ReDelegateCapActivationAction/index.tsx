import React, { useState } from 'react';
import ReDelegateCapActivationModal from './ReDelegateCapActivationModal';

const ReDelegateCapActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const [showReDelegationCapActivationModal, setShowReDelegationCapActivationModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowReDelegationCapActivationModal(true)}
        className="btn btn-primary text-white btn-sm mr-n1"
      >
        Change
      </button>
      <ReDelegateCapActivationModal
        show={showReDelegationCapActivationModal}
        title="Check for ReDelegate Rewards Max Cap"
        description="Set the check for ReDelegation Cap in order to block or accept the redelegate rewards."
        handleClose={() => {
          setShowReDelegationCapActivationModal(false);
        }}
        value={automaticFlag}
      />
    </div>
  );
};

export default ReDelegateCapActivationAction;
