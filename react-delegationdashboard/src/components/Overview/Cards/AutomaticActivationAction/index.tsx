import { TransactionHash } from '@elrondnetwork/erdjs/out';
import OwnerActionModal from 'components/Overview/OwnerActionModal';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import React, { useState } from 'react';

const AutomaticActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);
  const [ledgerError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    setShowAutomaticActivationModal(false);
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
    setSubmitPressed,
  });

  const handleAutomaticActivation = () => {
    let activation = Buffer.from(automaticFlag === 'true' ? 'false' : 'true').toString('hex');
    let transactionArguments = new DelegationTransactionType(
      '0',
      'setAutomaticActivation',
      activation
    );
    sendTransaction(transactionArguments);
  };
  return (
    <div>
      <button
        onClick={() => setShowAutomaticActivationModal(true)}
        className="btn btn-primary text-white btn-sm mr-n1"
      >
        Change
      </button>
      <OwnerActionModal
        show={showAutomaticActivationModal}
        title="Automatic Activation"
        actionTitle={`Turn ${automaticFlag === 'true' ? 'OFF' : 'ON'}`}
        description="Set automatic activation"
        extraDescription={`Currently is ${automaticFlag === 'true' ? 'ON' : 'OFF'}`}
        handleClose={() => {
          setShowAutomaticActivationModal(false);
        }}
        value={automaticFlag}
        ledgerError={ledgerError}
        showTransactionStatus={showTransactionStatus}
        submitPressed={submitPressed}
        txHash={txHash}
        handleContinue={handleAutomaticActivation}
      />
    </div>
  );
};

export default AutomaticActivationAction;
