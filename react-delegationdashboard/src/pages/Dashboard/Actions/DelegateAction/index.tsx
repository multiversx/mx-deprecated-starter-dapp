import { useState } from 'react';
import { useContext } from 'context';
import DelegateModal from './DelegateModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import ConfirmTransactionModal from 'components/ConfirmTransactionModal';
import { useDelegationWallet } from 'helpers/useDelegation';

const DelegateAction = () => {
  const { account, ledgerAccount, walletConnectAccount } = useContext();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleDelegate = (value: string) => {
    const txArguments = new DelegationTransactionType(value, 'delegate');
    if (ledgerAccount || walletConnectAccount) {
      setShowDelegateModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
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
      <ConfirmTransactionModal
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
