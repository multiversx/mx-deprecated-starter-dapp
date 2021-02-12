import React, { useState } from 'react';
import ClaimRewardsModal from './ClaimRewardsModal';

const ClaimRewardsAction = () => {
  const [showClaimRewardsModal, setShowClaimRewardsModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowClaimRewardsModal(true);
        }}
        className="btn btn-primary mt-2"
      >
        Claim Rewards
      </button>
      <ClaimRewardsModal
        show={showClaimRewardsModal}
        title="Claim rewards"
        description="Choose what to do with your rewards"
        handleClose={() => {
          setShowClaimRewardsModal(false);
        }}
      />
    </div>
  );
};

export default ClaimRewardsAction;
