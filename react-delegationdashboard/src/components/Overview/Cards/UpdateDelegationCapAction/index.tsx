import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import nominate from 'helpers/nominate';
import DelegationCapModal from './DelegationCapModal';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useContext } from 'context';
import { useDelegationWallet } from 'helpers/useDelegation';
import ConfirmOnLedgerModal from 'components/ConfirmOnLedgerModal';

const UpdateDelegationCapAction = () => {
  const { ledgerAccount } = useContext();
  const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const nominateValToHex = (value: string) => {
    let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

    if (val.length % 2 !== 0) {
      val = '0' + val;
    }
    return val;
  };

  const handleUpdateDelegationCap = (value: string) => {
    let txArguments = new DelegationTransactionType(
      '0',
      'modifyTotalDelegationCap',
      nominateValToHex(value)
    );
    if (ledgerAccount) {
      setShowDelegationCapModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
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
        title="Delegation cap"
        description="Update Delegation Cap"
        handleClose={() => {
          setShowDelegationCapModal(false);
        }}
        handleContinue={handleUpdateDelegationCap}
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

export default UpdateDelegationCapAction;
