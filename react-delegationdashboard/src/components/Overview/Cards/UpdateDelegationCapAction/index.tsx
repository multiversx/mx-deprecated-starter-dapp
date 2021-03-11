import BigNumber from 'bignumber.js';
import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import nominate from 'helpers/nominate';
import DelegationCapModal from './DelegationCapModal';
import { ledgerErrorCodes } from 'helpers/ledgerErrorCodes';
import { useContext } from 'context';

const UpdateDelegationCapAction = () => {
  const { delegation } = useDelegation();
  const { ledgerAccount } = useContext();
  const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleUpdateDelegationCap = (value: string) => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
      setShowDelegationCapModal(true);
    }
    const hexCap = nominateValToHex(value);
    delegation
      .sendTransaction('0', 'modifyTotalDelegationCap', hexCap)
      .then(() => {
        setWaitingForLedger(false);
        setShowDelegationCapModal(false);
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
        className="btn btn-primary btn-sm text-white mr-n1"
      >
        Change
      </button>
      <DelegationCapModal
        show={showDelegationCapModal}
        waitingForLedger={waitingForLedger}
        submitPressed={submitPressed}
        ledgerError={ledgerDataError}
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
