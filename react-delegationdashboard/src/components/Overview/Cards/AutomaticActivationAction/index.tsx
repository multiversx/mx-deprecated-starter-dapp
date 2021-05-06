import ConfirmTransactionModal from 'components/ConfirmTransactionModal';
import OwnerActionModal from 'components/Overview/OwnerActionModal';
import { useContext } from 'context';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import React, { useState } from 'react';

const AutomaticActivationAction = ({ automaticFlag }: { automaticFlag: string }) => {
  const { ledgerAccount, walletConnectAccount } = useContext();
  const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleAutomaticActivation = () => {
    let activation = Buffer.from(automaticFlag === 'true' ? 'false' : 'true').toString('hex');
    let txArguments = new DelegationTransactionType('0', 'setAutomaticActivation', activation);
    if (ledgerAccount || walletConnectAccount) {
      setShowAutomaticActivationModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
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
        handleContinue={handleAutomaticActivation}
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

export default AutomaticActivationAction;
