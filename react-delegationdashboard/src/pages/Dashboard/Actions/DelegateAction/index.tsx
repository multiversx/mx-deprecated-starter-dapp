import { useState } from 'react';
import { useContext } from 'context';
import DelegateModal from './DelegateModal';
import { useDelegation } from 'helpers';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';

const DelegateAction = () => {
  const { account } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);
  const { sendTransaction } = useDelegation({
    handleClose: setShowDelegateModal,
    setLedgerDataError,
    setWaitingForLedger,
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
        waitingForLedger={waitingForLedger}
        submitPressed={submitPressed}
        ledgerError={ledgerDataError}
        balance={account.balance.toString()}
        handleClose={() => {
          setShowDelegateModal(false);
        }}
        handleContinue={handleDelegate}
      />
    </div>
  );
};

export default DelegateAction;
