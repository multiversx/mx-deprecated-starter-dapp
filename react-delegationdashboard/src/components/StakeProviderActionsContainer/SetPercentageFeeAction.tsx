import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import RequestTransactionModal from '../RequestTransactionModal';

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
      <button onClick={() => setShowUpdateFeeModal(true)} className="btn btn-primary mt-3">
        Update fee
      </button>
      <RequestTransactionModal
        show={showUpdateFeeModal}
        title="Change service fee"
        description="Add the percentage fee"
        handleClose={() => {
          setShowUpdateFeeModal(false);
        }}
        handleContinue={handleUpdateFee}
      />
    </div>
  );
};

export default SetPercentageFeeAction;
