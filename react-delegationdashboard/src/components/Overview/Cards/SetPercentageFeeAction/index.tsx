import { useDelegation } from 'helpers';
import nominate from 'helpers/nominate';
import React, { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';
import BigNumber from 'bignumber.js';

const SetPercentageFeeAction = () => {
  const { delegation } = useDelegation();
  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);

  const nominateValToHex = (value: string) => {
    let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

    if (val.length % 2 !== 0) {
      val = '0' + val;
    }
    return val;
  };
  const handleUpdateFee = (value: string) => {
    let perc = parseFloat(value) * 100;
    if (perc.toString().length)
      delegation
        .sendTransaction('0', 'changeServiceFee', nominateValToHex(value).toString())
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
