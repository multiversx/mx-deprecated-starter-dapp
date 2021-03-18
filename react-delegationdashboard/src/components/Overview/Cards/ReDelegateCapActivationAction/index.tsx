import { TransactionHash } from '@elrondnetwork/erdjs/out';
import OwnerActionModal from 'components/Overview/OwnerActionModal';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import React, { useState } from 'react';

const ReDelegateCapActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const [showReDelegationCapActivationModal, setShowReDelegationCapActivationModal] = useState(
    false
  );
  const [ledgerError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    setShowReDelegationCapActivationModal(false);
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
    setSubmitPressed,
  });
  const handleReDelegationCapActivation = () => {
    let redelegateRewardsActivation = Buffer.from(
      automaticFlag === 'true' ? 'false' : 'true'
    ).toString('hex');
    let transactionArguments = new DelegationTransactionType(
      '0',
      'setReDelegateCapActivation',
      redelegateRewardsActivation
    );

    sendTransaction(transactionArguments);
  };

  return (
    <div>
      <button
        onClick={() => setShowReDelegationCapActivationModal(true)}
        className="btn btn-primary text-white btn-sm mr-n1"
      >
        Change
      </button>
      <OwnerActionModal
        show={showReDelegationCapActivationModal}
        title="Check for ReDelegate Rewards Max Cap"
        actionTitle={`Turn ${automaticFlag === 'true' ? 'OFF' : 'ON'}`}
        description="Set the check for ReDelegation Cap in order to block or accept the redelegate rewards."
        extraDescription={`Currently is ${automaticFlag === 'true' ? 'ON' : 'OFF'}`}
        handleClose={() => {
          setShowReDelegationCapActivationModal(false);
        }}
        value={automaticFlag}
        ledgerError={ledgerError}
        showTransactionStatus={showTransactionStatus}
        submitPressed={submitPressed}
        txHash={txHash}
        handleContinue={handleReDelegationCapActivation}
      />
    </div>
  );
};

export default ReDelegateCapActivationAction;
