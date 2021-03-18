import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import { useContext } from 'context';
import { nominateValToHex } from 'helpers/nominate';
import UndelegateModal from './UndelegateModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { TransactionHash } from '@elrondnetwork/erdjs/out';

interface UndelegateModalType {
  balance: string;
}

const UndelegateAction = ({ balance }: UndelegateModalType) => {
  const { egldLabel } = useContext();
  const [showModal, setShowModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    console.log('tx ', 'undelegate');
    setTxHash(txHash);
    setShowModal(false);
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
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
