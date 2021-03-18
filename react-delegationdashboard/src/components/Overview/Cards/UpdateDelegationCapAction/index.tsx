import BigNumber from 'bignumber.js';
import { useDelegation } from 'helpers';
import { useState } from 'react';
import nominate from 'helpers/nominate';
import DelegationCapModal from './DelegationCapModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { TransactionHash } from '@elrondnetwork/erdjs/out';

const UpdateDelegationCapAction = () => {
  const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    setTxHash(txHash);
    setShowDelegationCapModal(false);
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
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
