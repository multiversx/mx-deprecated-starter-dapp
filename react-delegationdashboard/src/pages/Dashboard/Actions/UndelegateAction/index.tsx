import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import { useContext } from 'context';
import { nominateValToHex } from 'helpers/nominate';
import UndelegateModal from './UndelegateModal';
import { ledgerErrorCodes } from 'helpers/ledgerErrorCodes';

interface UndelegateModalType {
  balance: string;
}

const UndelegateAction = ({ balance }: UndelegateModalType) => {
  const { egldLabel, ledgerAccount } = useContext();
  const { delegation } = useDelegation();
  const [showModal, setShowModal] = useState(false);
  const [ledgerDataError, setLedgerDataError] = useState('');
  const [waitingForLedger, setWaitingForLedger] = useState(false);
  const [submitPressed, setSubmitPressed] = useState(false);

  const handleUndelegate = (value: string) => {
    if (ledgerAccount) {
      setWaitingForLedger(true);
      setSubmitPressed(true);
      setShowModal(true);
    }
    delegation
      .sendTransaction('0', 'unDelegate', nominateValToHex(value))
      .then(() => {
        setWaitingForLedger(false);
        setShowModal(false);
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
      <button onClick={() => setShowModal(true)} className="btn btn-primary ml-3 mb-3">
        Undelegate
      </button>
      <UndelegateModal
        show={showModal}
        balance={balance}
        waitingForLedger={waitingForLedger}
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
