import { useState } from 'react';
import { useContext } from 'context';
import DelegateModal from './DelegateModal';
import { useDelegation } from 'helpers';
import { ledgerErrorCodes } from 'helpers/ledgerErrorCodes';

const DelegateAction = () => {
  const { account, ledgerAccount } = useContext();
  const { delegation } = useDelegation();
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleDelegate = (value: string) => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
      setShowDelegateModal(true);
    }
    delegation
      .sendTransaction(value, 'delegate')
      .then(() => {
        setWaitingForLedger(false);
        setShowDelegateModal(false);
      })
      .catch(e => {
        if (e.statusCode in ledgerErrorCodes) {
          setLedgerDataError((ledgerErrorCodes as any)[e.statusCode].message);
        }
        setWaitingForLedger(false);
        setSubmitPressed(false);
        console.error('handleDelegate ', e);
      });
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
