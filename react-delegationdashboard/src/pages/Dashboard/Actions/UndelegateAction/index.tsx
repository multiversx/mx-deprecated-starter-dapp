import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import { useContext } from 'context';
import { nominateValToHex } from 'helpers/nominate';
import UndelegateModal from './UndelegateModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';

interface UndelegateModalType {
  balance: string;
}

const UndelegateAction = ({ balance }: UndelegateModalType) => {
  const { egldLabel } = useContext();
  const [showModal, setShowModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const { sendTransaction } = useDelegation({
    handleClose: setShowModal,
    setLedgerDataError,
    setWaitingForLedger,
    setSubmitPressed,
  });

  const handleUndelegate = (value: string) => {
    let transactionArguments = new DelegationTransactionType(
      '0',
      'unDelegate',
      nominateValToHex(value)
    );
    sendTransaction(transactionArguments);
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-primary ml-3 mb-3">
        Undelegate
      </button>
      <UndelegateModal
        show={showModal}
        balance={balance}
        waitingForLedger={waitingForLedger}
        submitPressed={submitPressed}
        ledgerError={ledgerDataError}
        title="Undelegate now"
        description={`Select the amount of ${egldLabel} you want to undelegate.`}
        handleClose={() => {
          setShowModal(false);
        }}
        handleContinue={handleUndelegate}
      />
    </div>
  );
};

export default UndelegateAction;
