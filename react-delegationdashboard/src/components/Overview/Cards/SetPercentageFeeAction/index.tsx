import { useContext } from 'context';
import { useDelegation } from 'helpers';
import { ledgerErrorCodes } from 'helpers/ledgerErrorCodes';
import React, { useState } from 'react';
import SetPercentageFeeModal from './SetPercentageFeeModal';

const SetPercentageFeeAction = () => {
  const { delegation } = useDelegation();
  const { ledgerAccount } = useContext();
  const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const nominateVal = (value: string) => {
    let perc = (parseFloat(value) * 100).toString(16);
    if (perc.length % 2 !== 0) {
      perc = '0' + perc;
    }
    return perc;
  };
  const handleUpdateFee = (value: string) => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
      setShowUpdateFeeModal(true);
    }
    delegation
      .sendTransaction('0', 'changeServiceFee', nominateVal(value))
      .then(() => {
        setWaitingForLedger(false);
        setShowUpdateFeeModal(false);
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        setWaitingForLedger(false);
        setSubmitPressed(false);
        console.error('handleDelegate ', e);
      });
  };

  return (
    <div>
      <button
        onClick={() => setShowUpdateFeeModal(true)}
        className="btn btn-primary text-white btn-sm mr-n1"
      >
        Change
      </button>
      <SetPercentageFeeModal
        show={showUpdateFeeModal}
        waitingForLedger={waitingForLedger}
        submitPressed={submitPressed}
        ledgerError={ledgerDataError}
        handleClose={() => {
          setShowUpdateFeeModal(false);
        }}
        handleContinue={handleUpdateFee}
      />
    </div>
  );
};

export default SetPercentageFeeAction;
