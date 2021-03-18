import { useState } from 'react';
import { useContext } from 'context';
import DelegateModal from './DelegateModal';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import LedgerTransactionStatus from 'components/LedgerTransactionStatus';
import { TransactionHash } from '@elrondnetwork/erdjs/out';

const DelegateAction = () => {
  const { account } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [submitPressed, setSubmitPressed] = useState(false);
  const [showTransactionStatus, setShowTransactionStatus] = useState(false);
  const [txHash, setTxHash] = useState(new TransactionHash(''));
  const displayTransactionModal = (txHash: TransactionHash) => {
    console.log('tx ', 'delegate');
    setTxHash(txHash);
    setShowDelegateModal(false);
    setShowTransactionStatus(true);
  };
  const { sendTransaction } = useDelegation({
    handleClose: displayTransactionModal,
    setLedgerDataError,
    setSubmitPressed,
  });

  const handleDelegate = (value: string) => {
    const transactionArguments = new DelegationTransactionType(value, 'delegate');
    sendTransaction(transactionArguments);
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowDelegateModal(true);
        }}
        className="btn btn-primary mb-3"
      >
        Delegate
      </button>
      <DelegateModal
        show={showDelegateModal}
        submitPressed={submitPressed}
        ledgerError={ledgerDataError}
        balance={account.balance.toString()}
        handleClose={() => {
          setShowDelegateModal(false);
        }}
        handleContinue={handleDelegate}
      />
      <LedgerTransactionStatus
        id="delegate"
        show={showTransactionStatus}
        txHash={txHash}
        handleClose={() => {
          setShowTransactionStatus(false);
        }}
      />
    </div>
  );
};

export default DelegateAction;
