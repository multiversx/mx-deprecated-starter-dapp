import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';

const SetPercentageFeeAction = () => {
  const { delegation } = useDelegation();
  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);

  const nominateValToHex = (value: string) => {
    if (value.length % 2 !== 0) {
      value = '0' + value;
    }
    return value;
  };

  const handleUpdateFee = (value: string) => {
    let perc = parseFloat(value) * 100;
    if (perc.toString().length)
      delegation
        .sendTransaction(
          '0',
          'changeServiceFee',
          nominateValToHex((parseFloat(value) * 100).toString())
        )
        .then();
  };

  return (
    <div>
      <button
        onClick={() => setShowUpdateFeeModal(true)}
        className="btn btn-white btn-sm text-red opacity-5 mr-n1"
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
