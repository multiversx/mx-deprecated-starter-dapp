import { useState } from 'react';
import { useContext } from 'context';
import DelegateModal from './DelegateModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import CheckYourLedgerModal from 'components/CheckYourLedgerModal';
import { useDelegationWallet } from 'helpers/useDelegation';

const DelegateAction = () => {
  const { account, ledgerAccount } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleDelegate = (value: string) => {
    const transactionArguments = new DelegationTransactionType(value, 'delegate');
    setTransactionArguments(transactionArguments);
    setShowDelegateModal(false);
    if (ledgerAccount) {
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(transactionArguments);
    }
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
        balance={account.balance.toString()}
        handleClose={() => {
          setShowDelegateModal(false);
        }}
        handleContinue={handleDelegate}
      />
      <CheckYourLedgerModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </div>
  );
};

export default DelegateAction;
