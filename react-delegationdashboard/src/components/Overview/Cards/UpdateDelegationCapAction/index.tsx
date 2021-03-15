import BigNumber from 'bignumber.js';
import { useDelegation } from 'helpers';
import { useState } from 'react';
import nominate from 'helpers/nominate';
import DelegationCapModal from './DelegationCapModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';

const UpdateDelegationCapAction = () => {
  const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const { sendTransaction } = useDelegation({
    handleClose: setShowDelegationCapModal,
    setLedgerDataError,
    setWaitingForLedger,
    setSubmitPressed,
  });

  const handleUpdateDelegationCap = (value: string) => {
    let transactionArguments = new DelegationTransactionType(
      '0',
      'modifyTotalDelegationCap',
      nominateValToHex(value)
    );

    sendTransaction(transactionArguments);
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
