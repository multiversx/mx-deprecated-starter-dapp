import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';

const SetPercentageFeeAction = () => {
  const { delegation } = useDelegation();
  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);

  const handleUpdateFee = (value: string) => {
    delegation
      .sendTransaction('0', 'changeServiceFee', (parseFloat(value) * 100).toString())
      .then();
  };

  return (
    <div>
      <button
        onClick={() => setShowUpdateFeeModal(true)}
        className="btn btn-outline-primary mr-2 mb-2"
      >
        Update fee
      </button>
      <SetPercentageFeeModal
        show={showUpdateFeeModal}
        handleClose={() => {
          setShowUpdateFeeModal(false);
        }}
        handleContinue={handleUpdateFee}
      />
    </div>
  );
};

export default SetPercentageFeeAction;
