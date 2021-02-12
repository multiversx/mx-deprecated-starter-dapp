import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';

const SetPercentageFeeAction = () => {
  const { delegation } = useDelegation();
  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);

  const handleUpdateFee = (value: string) => {
    let perc = parseFloat(value) * 100;
    if (perc.toString().length)
      delegation
        .sendTransaction('0', 'changeServiceFee', (parseFloat(value) * 100).toString())
        .then();
  };

  return (
    <div>
      <button
        onClick={() => setShowUpdateFeeModal(true)}
        className="btn btn-outline-red btn-sm mr-n1"
      >
        Change
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
