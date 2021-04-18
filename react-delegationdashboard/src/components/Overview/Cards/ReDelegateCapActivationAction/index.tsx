import ConfirmOnLedgerModal from 'components/ConfirmOnLedgerModal';
import OwnerActionModal from 'components/Overview/OwnerActionModal';
import { useContext } from 'context';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import React, { useState } from 'react';

const ReDelegateCapActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const { ledgerAccount } = useContext();
  const [showReDelegationCapActivationModal, setShowReDelegationCapActivationModal] = useState(
    false
  );
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();
  const handleReDelegationCapActivation = () => {
    let redelegateRewardsActivation = Buffer.from(
      automaticFlag === 'true' ? 'false' : 'true'
    ).toString('hex');
    let txArguments = new DelegationTransactionType(
      '0',
      'setReDelegateCapActivation',
      redelegateRewardsActivation
    );

    if (ledgerAccount) {
      setShowReDelegationCapActivationModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
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
        handleContinue={handleReDelegationCapActivation}
      />
      <ConfirmOnLedgerModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </div>
  );
};

export default ReDelegateCapActivationAction;
