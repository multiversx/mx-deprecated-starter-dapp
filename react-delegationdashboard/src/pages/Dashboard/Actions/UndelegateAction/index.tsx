import React, { useState } from 'react';
import { useContext } from 'context';
import { nominateValToHex } from 'helpers/nominate';
import UndelegateModal from './UndelegateModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import ConfirmOnLedgerModal from 'components/ConfirmOnLedgerModal';

interface UndelegateModalType {
  balance: string;
}

const UndelegateAction = ({ balance }: UndelegateModalType) => {
  const { egldLabel, ledgerAccount } = useContext();
  const [showModal, setShowModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleUndelegate = (value: string) => {
    let txArguments = new DelegationTransactionType('0', 'unDelegate', nominateValToHex(value));
    if (ledgerAccount) {
      setShowModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
  };
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-primary ml-3 mb-3">
        Undelegate
      </button>
      <UndelegateModal
        show={showModal}
        balance={balance}
        title="Undelegate now"
        description={`Select the amount of ${egldLabel} you want to undelegate.`}
        handleClose={() => {
          setShowModal(false);
        }}
        handleContinue={handleUndelegate}
      />
      <ConfirmOnLedgerModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </div>
  );
};

export default UndelegateAction;
